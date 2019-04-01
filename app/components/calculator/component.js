import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class Calculator extends Component {
  @tracked current = new CalculatorNumber(0, 0);

  get rendered() {
    return this.current.rendered();
  }

  @action
  append(e) {
    this.current = this.current.appendToWhole(parseInt(e.target.value));
  }

  @action
  zero() {
    this.current = this.current.appendZero();
  }

  @action
  backspace() {
    this.current = this.current.deleteFromWhole();
  }
}

class CalculatorNumber {
  constructor(whole, decimal) {
    this.whole = whole;
    this.decimal = decimal;
  }

  rendered() {
    if (this.decimal === 0) {
      return `${this.whole}`;
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
}
