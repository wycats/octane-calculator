import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class Calculator extends Component {
  @tracked current = 0;

  @action
  append(e) {
    this.current = this.current * 10 + parseInt(e.target.value);
  }

  @action
  zero() {
    if (this.current === 0) {
      return;
    } else {
      this.current = this.current * 10;
    }
  }

  @action
  backspace() {
    this.current = Math.floor(this.current / 10)
  }
}
