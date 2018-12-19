import escapeStringRegexp from 'escape-string-regexp';
import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

import Input from '../../fragments/input';

import Action from './action';

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

  /**
   * Class of action fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When action fragment class is not valid.
   */
  get ActionFragment() {
    if (!this._ActionFragment) {
      this._ActionFragment = this.getSomethingFragment('Action', TextInput);
    }

    return this._ActionFragment;
  }

  /**
   * BEM base for action fragment.
   * 
   * NOTE: We use action fragment's class directly here because we not planing
   *       derive fragments from text input, otherwise we can wrap each action
   *       in container (e.g., nw-textInput__action) and use it for selections.
   *
   * @returns {BemBase}
   */
  get actionFragmentBemBase() {
    if (!this._actionFragmentBemBase) {
      this._actionFragmentBemBase = new BemBase(TextInput.ActionFragment);
    }

    return this._actionFragmentBemBase;
  }

  /**
   * TestCafe selector for action fragment.
   *
   * @returns {Selector}
   */
  get actionFragmentSelector() {
    if (!this._actionFragmentSelector) {
      this._actionFragmentSelector = this
        .selector
        .find(`.${this.actionFragmentBemBase}`);
    }

    return this._actionFragmentSelector;
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
        // 'actions' can be added later (if needed)
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
    identityTpl = ((identityTpl == null) || utils.isEmptyString(identityTpl)) ?
      '@@' : identityTpl + '';

    if (identityTpl) {
      value = value
        .toString()
        .replace(
          new RegExp(`${escapeStringRegexp(identityTpl)}`, 'g'),
          identity
        );
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
   * Asserts that text input fragment has action fragment. Optionally, asserts
   * that specified action found in text input in position specified by `idx`.
   * 
   * @param {*} [actionLocator] See `locator` parameter of action fragment's class constructor
   * @param {*} [actionOptions] See `options` parameter of action fragment's class constructor
   * @param {Options|Object} [options]
   * @param {Number} [options.idx] A position (integer gte 0) at which action must be found in text input to pass assertion
   * @returns {Promise<Action>} Action fragment.
   */
  async expectHasAction(actionLocator, actionOptions, options) {
    return this.expectHasSomething('Action', actionLocator, actionOptions, options);
  }

  /**
   * Asserts that text input fragment has action fragments specified in
   * `actionLocatorAndOptions`. Optionally, asserts that text input has only
   * specified actions, and, also optionally, asserts that actions found in text
   * input in same order as in `actionLocatorAndOptions`.
   *
   * @param {Array} actionLocatorAndOptions Each element is a tuple of action fragment's `locator` and `optiions`. See corresponding parameters of action fragment's class constructor
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.only=false] Text input must have only specified actions to pass assertion
   * @param {Boolean} [options.sameOrder=false] Actions must be found in text input in same order as in `actionLocatorAndOptions` to pass assertion. Work only in conjunction with 'only' option
   * @returns {Promise<Array<Action>>} Action fragments.
   */
  async expectHasActions(actionLocatorAndOptions, options) {
    return this.expectHasSomethings('Action', actionLocatorAndOptions, options);
  }

  /**
   * Asserts that action fragment found in text input fragment at index
   * specified by `idx`.
   *
   * @param {*} locator See `locator` parameter of action fragment's class constructor
   * @param {*} options See `options` parameter of action fragment's class constructor
   * @param {Number} idx Action must be found in text input at this position to pass assertion
   * @returns {Promise<void>}
   */
  async expectActionIndexIs(locator, options, idx) {
    await this
      .getAction(locator, options)
      .expectIndexInParentIs(this.selector, idx);
  }

  /**
   * Asserts that text input fragment contains all and only all action fragments
   * passed in `locatorAndOptionsList` list and they appears in same order as
   * in `locatorAndOptionsList`.
   *
   * @param {Array} locatorAndOptionsList Each element is a tuple of action fragment's `locator` and `options`. See corresponding parameters of action fragment's class constructor
   * @returns {Promise<void>}
   */
  async expectActionsAre(locatorAndOptionsList) {
    await this.expectHasActions(locatorAndOptionsList, {
      only: true,
      sameOrder: true
    });
  }

  /**
   * Asserts that count of action fragments in text input fragment equal value
   * specified in `count`.
   *
   * @param {Number|Array} count Text input fragment must have that number of action fragments to pass assertion. When you need more flexibility than just equality pass an `Array` with TestCafe assertion name (default to 'eql') as first element and expected value for assertion as second, for example, `['gte', 3]`
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be negated
   * @return {Promise<void>}
   */
  async expectActionsCountIs(count, options) {
    await TextInput.expectSomethingsCountIs(
      this.actionFragmentSelector,
      count,
      options
    );
  }

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

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns text input action fragment.
   *
   * @param {*} [locator] See `locator` parameter of action fragment's class constructor
   * @param {*} [options] See `options` parameter of action fragment's class constructor
   * @returns {Action}
   */
  getAction(locator, options) {
    return this.getSomething('Action', locator, options);
  }

  /**
   * Clicks on action and returns it.
   * 
   * @param {*} [locator] See `locator` parameter of action fragment's class constructor
   * @param {*} [options] See `options` parameter of action fragment's class constructor
   * @returns {Promise<Action>}
   */
  async clickAction(locator, options) {
    const action = this.getAction(locator, options);
    await action.expectIsExist();
    await action.click();
    return action;
  }
}

Object.defineProperties(TextInput, {
  ActionFragment: {
    value: Action
  },
  bemBase: {
    value: 'nw-textInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-input'
  }
});

export default TextInput;
