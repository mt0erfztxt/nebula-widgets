import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import Input from '../input';

const {
  Fragment,
  Options,
  utils
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Fragment.makeFragmentClass(Input, {
  stateParts: [
    ['busy'],
    ['multiLine'],
    ['size', { isBoolean: false }],
    ['textAlign', { isBoolean: false }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.text-input.item';

/**
 * Fragment that represents text input item.
 */
class TextInput extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {TextInput|Object} [spec] When it's already instance of `TextInput` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   */
  constructor(spec, opts) {
    const {
      initializedOpts,
      initializedSpec,
      isInstance
    } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

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

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, []);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, [
        'busy',
        'multiLine',
        'size',
        'textAlign'
      ]);
    }
  }

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
    return this.inputEltSelector.value;
  }

  /**
   * Sets 'Value' part of fragment's state.
   *
   * @param {*} value New value for 'Value' part of fragment's state. `undefined` means no change and `null` and empty string sets value of text input to an empty string
   * @param {Options|Object} [options] Options, can contain any options for TestCafe `typeText` action, plus custom options
   * @param {Boolean} [options.paste=true] See TestCafe `typeText` action for details
   * @param {Boolean} [options.replace=true] See TestCafe `typeText` action for details
   * @param {String} [options.identity=''] Would be used to replace all instances of `options.identityTpl` to specified value
   * @param {String} [options.identityTpl='@@'] Would be used as template string that would be replaced in `value` by `options.identity`
   * @return {Promise<String>} Current value of 'Value' part of fragment's state after set state operation is done.
   */
  async setValuePartOfState(value, options) {

    // `undefined` is noop.
    if (_.isUndefined(value)) {
      return this.getValuePartOfState(options);
    }

    // `null` or empty string means clear input.
    if (_.isNull(value) || utils.isEmptyString(value)) {
      await t
        .selectText(this.inputEltSelector)
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

    identity = _.isNil(identity) ? '' : identity + '';
    identityTpl = _.isNil(identityTpl) || utils.isEmptyString(identityTpl) ? '@@' : identityTpl + '';

    if (identityTpl) {
      value = _.replace(value + '', identityTpl, identity);
    }

    await t.typeText(this.inputEltSelector, value, opts);

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

    if (_.isRegExp(value)) {
      assertionName = 'match';
      val = value;
    }
    else {
      assertionName = 'eql';
      val = '' + value;
    }

    assertionName = utils.buildTestCafeAssertionName(assertionName, options);
    await t.expect(this.inputEltSelector.value)[assertionName](val);
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
    value: fragmentDisplayName
  }
});

export default TextInput;
