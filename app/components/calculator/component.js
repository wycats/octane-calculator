import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class Calculator extends Component {
  @tracked current = new CalculatorNumber(0, 0);
  @tracked operation = new WholeOperation();

  get rendered() {
    return this.current.rendered(this.operation instanceof DecimalOperation ? "force-decimal" : false);
  }

  @action
  append(e) {
    [this.current, this.operation] = this.operation.append(this.current, parseInt(e.target.value));
  }

  @action
  zero() {
    [this.current, this.operation] = this.operation.zero(this.current);
  }

  @action
  backspace() {
    [this.current, this.operation] = this.operation.backspace(this.current);
  }

  @action
  point() {
    this.operation = new DecimalOperation();
  }
}

class CalculatorNumber {
  constructor(whole, decimal) {
    this.whole = whole;
    this.decimal = decimal;
  }

  rendered(force) {
    if (this.decimal === 0) {
      if (force === 'force-decimal') {
        return `${this.whole}.`;
      } else {
        return `${this.whole}`;
      }
    } else {
      return `${this.whole}.${this.decimal}`;
    }
  }

  appendToWhole(number) {
    return new CalculatorNumber(this.whole * 10 + number, this.decimal);
  }

  appendZero() {
    return new CalculatorNumber(this.whole * 10, this.decimal);
  }

  deleteFromWhole() {
    return new CalculatorNumber(Math.floor(this.whole / 10), this.decimal);
  }

  appendToDecimal(number) {
    return new CalculatorNumber(this.whole, this.decimal * 10 + number);
  }

  deleteFromDecimal() {
    return new CalculatorNumber(this.whole, Math.floor(this.decimal / 10));
  }
}

class WholeOperation {
  @action
  append(current, value) {
    return [current.appendToWhole(value), this];
  }

  @action
  zero(current) {
    return [current.appendZero(), this];
  }

  @action
  backspace(current) {
    return [current.deleteFromWhole(), this];
  }
}

class DecimalOperation {
  @action
  append(current, value) {
    return [current.appendToDecimal(value), this];
  }

  @action
  zero(current) {
    return [current, this];
  }

  @action
  backspace(current) {
    if (current.decimal === 0) {
      return [current, new WholeOperation()];
    } else {
      return [current.deleteFromDecimal(), this];
    }
  }
}
