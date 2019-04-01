import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module('Integration | Component | calculator', function (hooks) {
  setupRenderingTest(hooks);
  test('should start with 0', async function (assert) {
    await render(hbs`<Calculator />`);

    assert.equal(this.element.querySelector('#txtScreen').value, "0");
  });
  test('should show number 1234567890', async function (assert) {
    await render(hbs`<Calculator />`);
    for (let num = 1; num <= 9; num++) {
      await click('input[value = "' + num + '"]');
    }
    await click('input[value = "0"]');
    assert.equal(this.element.querySelector('#txtScreen').value, "1234567890");
  });
});