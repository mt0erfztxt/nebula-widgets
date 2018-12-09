import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

import Input from '../../fragments/input';

const {
  Options,
  utils
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Input.makeFragmentClass(Input, {
  stateParts: [
    ['busy'],
    ['multiLine'],
    ['textAlignment', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents text input.
 */
class TextInput extends BaseClass {

  /**
   * BEM base for fragment's 'input' element.
   *
   * @returns {BemBase}
   */
  get inputElementBemBase() {
    if (!this._inputElementBemBase) {
      this._inputElementBemBase = this
        .cloneBemBase()
        .setElt('input');
    }

    return this._inputElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'input' element.
   *
   * @returns {Selector}
   */
  get inputElementSelector() {
    if (!this._inputElementSelector) {
      this._inputElementSelector = this
        .selector
        .find(`.${this.inputElementBemBase}`);
    }

    return this._inputElementSelector;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(options) {
    const { onlyWritable } = new Options(options, {
      defaults: {
        onlyWritable: false
      }
    });

    const writableParts = super.getStateParts({ onlyWritable });

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat([
        'busy',
        'multiLine',
        'textAlignment'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Busy (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name TextInput#getBusyPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name TextInput#expectIsBusy
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TextInput#expectIsNotBusy
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: TextAlignment (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name TextInput#getTextAlignmentPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name TextInput#expectTextAlignmentPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state.
   *
   * @param {Options|Object} [options] Options
   * @return {Promise<string>} 'Value' part of state.
   */
  async getValuePartOfState(options) {
    return this.inputElementSelector.value;
  }

  /**
   * Sets 'Value' part of fragment's state.
   *
   * @param {*} value New value for 'Value' part of fragment's state. `undefined` means no change and `null` and empty string sets value of text input to an empty string
   * @param {Options|Object} [options] Options, can contain any options for TestCafe `typeText` action
   * @param {Boolean} [options.paste=true] See TestCafe `typeText` action for details
   * @param {Boolean} [options.replace=true] See TestCafe `typeText` action for details
   * @param {String} [options.identity=''] Would be used to replace all instances of `options.identityTpl` to specified value
   * @param {String} [options.identityTpl='@@'] Would be used as template string that would be replaced in `value` by `options.identity`
   * @return {Promise<String>} Current value of 'Value' part of fragment's state after set state operation is done.
   */
  async setValuePartOfState(value, options) {

    // `undefined` is noop.
    if (value === void 0) {
      return this.getValuePartOfState(options);
    }

    // `null` or empty string means clear input.
    if (value === null || utils.isEmptyString(value)) {
      await t
        .selectText(this.inputElementSelector)
        .pressKey('delete');
      return '';
    }

    const opts = new Options(options, {
      defaults: {
        paste: true,
        replace: true
      }
    });

    let { identity, identityTpl } = opts;

    identity = (identity == null) ? '' : identity + '';
    identityTpl = (identityTpl == null) ||
      utils.isEmptyString(identityTpl) ? '@@' : identityTpl + '';

    if (identityTpl) {
      value = value.toString().replace(identityTpl, identity);
    }

    await t.typeText(this.inputElementSelector, value, opts);

    return value;
  }

  /**
   * Asserts on 'Value' part of fragment's state.
   *
   * @param {String|RegExp} value 'Value' part of fragment's state must be equal or match that value to pass assertion. When `value` is not a string or regular expression it would be stringified
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot] When truthy 'Value' part of fragment's state must not be equal or not match that value to pass assertion
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    // We can't use assertion by 'value' attribute here because `TextareaInput`
    // inherits from that fragment class and <TEXTAREA/> doesn't have 'value'
    // attribute - assertion always fail for `TextareaInput`.
    // await this.expectSelectorConformsRequirements(this.selector, {
    //   attributes: [
    //     ['value', value, isNot]
    //   ]
    // });

    let assertionName;
    let val;

    if (utils.isRegExp(value)) {
      assertionName = 'match';
      val = value;
    }
    else {
      assertionName = 'eql';
      val = '' + value;
    }

    assertionName = utils.buildTestCafeAssertionName(assertionName, options);
    await t.expect(this.inputElementSelector.value)[assertionName](val);
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that fragment has value.
   * 
   * @returns {Promise<void>}
   */
  async expectHasValue() {
    await this.expectIsNotEmpty();
  }

  /**
   * Asserts that fragment has no value.
   * 
   * @returns {Promise<void>}
   */
  async expectHasNoValue() {
    await this.expectIsEmpty();
  }

  /**
   * Asserts thst fragment is empty - its value is an empty string.
   * 
   * @returns {Promise<void>}
   */
  async expectIsEmpty() {
    await this.expectValuePartOfStateIs('');
  }

  /**
   * Asserts thst fragment is not empty - its value is a non-empty string.
   * 
   * @returns {Promise<void>}
   */
  async expectIsNotEmpty() {
    await this.expectValuePartOfStateIs('', { isNot: true });
  }

  /**
   * Asserts that fragment's value is equal specified one.
   * 
   * @param {*} value Same as in {@link TextInput#expectValuePartOfStateIs}
   * @returns {Promise<void>}
   */
  async expectValueIs(value) {
    await this.expectValuePartOfStateIs(value);
  }

  /**
   * Asserts that fragment's value is not equal specified one.
   * 
   * @param {*} value Same as in {@link TextInput#expectValuePartOfStateIs} plus 'isNot' option set to true
   * @returns {Promise<void>}
   */
  async expectValueIsNot(value) {
    await this.expectValuePartOfStateIs(value, { isNot: true });
  }

}

Object.defineProperties(TextInput, {
  bemBase: {
    value: 'nw-textInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-input.item'
  }
});

export default TextInput;
