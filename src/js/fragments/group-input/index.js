import _ from 'lodash';
import Promise from 'pinkie-promise';
import testFragment from 'nebula-test-fragment';
import { Selector, t } from 'testcafe';
import typeOf from 'typeof--';

import Input from '../input';

const {
  bem: { BemBase },
  Options,
  utils
} = testFragment;

/**
 * Base class for group input fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Input.makeFragmentClass(Input, {
  stateParts: [
    ['columns', { isBoolean: false }],
    ['equidistant'],
    ['inline'],
    ['noRowGap'],
    ['softColumns'],
    ['stackedOnMobile']
  ]
});

// TODO Add Error Fragment to allow expectations on error presence and etc.
/**
 * Fragment that represents group input.
 */
class GroupInput extends BaseClass {

  /**
   * BEM base for fragment's 'item' element.
   *
   * @returns {BemBase}
   */
  get itemElementBemBase() {
    if (!this._itemElementBemBase) {
      this._itemElementBemBase = this
        .cloneBemBase()
        .setElt('item');
    }

    return this._itemElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'item' element.
   *
   * @returns {Selector}
   */
  get itemElementSelector() {
    if (!this._itemElementSelector) {
      this._itemElementSelector = this
        .selector
        .find(`.${this.itemElementBemBase}`);
    }

    return this._itemElementSelector;
  }

  /**
   * Class of item fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When item fragment class is not valid.
   */
  get ItemFragment() {
    if (!this._ItemFragment) {
      this._ItemFragment = this.getSomethingFragment('item', GroupInput);
    }

    return this._ItemFragment;
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

    // 'Items' part of state is writable because it used to set state of items.
    // For some input fragments, e.g. text group input, items would be
    // automatically added/removed when needed.
    const writableParts = _.concat(super.getStateParts({ onlyWritable }), [
      'items'
    ]);

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return _.concat(writableParts, [
        'columns',
        'equidistant',
        'inline',
        'noRowGap',
        'softColumns',
        'stackedOnMobile'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Columns (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getColumnsPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectColumnsPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Equidistant (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getEquidistantPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsEquidistant
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotEquidistant
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Inline (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getInlinePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsInline
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotInline
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Items
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Items' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<Array>}
   */
  async getItemsPartOfState(options) {
    const itemsCount = await this.itemElementSelector.count;
    const itemStatePromises = [];

    if (itemsCount) {
      for (let i = 0; i < itemsCount; i++) {
        itemStatePromises.push(this.getItem({ idx: i }).getState(options));
      }
    }

    return Promise.all(itemStatePromises);
  }

  /**
   * Sets 'Items' part of state to new `value`.
   *
   * @param {Array} [value] New value for 'Items' part of fragment's state. Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options] Options
   * @returns {Promise<Array>} Fragment's 'Items' part of state.
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async setItemsPartOfState(value, options) {
    if (_.isUndefined(value)) {
      return this.getItemsPartOfState(options);
    }

    if (!_.isArray(value)) {
      throw new TypeError(
        `${this.displayName}.setItemsPartOfState(): 'value' argument must ` +
        `be an array but it is ${typeOf(value)} (${value})`
      );
    }

    const itemsCount = await this.itemElementSelector.count;
    const state = [];

    // Don't set state in parallel! TODO: Mention (if can remember :D) why not.
    if (itemsCount) {
      for (let i = 0; i < itemsCount; i++) {
        const item = this.getItem({ idx: i });
        const itemState = await item.setState(value[i], options);
        state.push(itemState);
      }
    }

    return state;
  }

  /**
   * Asserts that 'Items' part of fragment's state is equal to `value` which
   * is an `Array` of group input items states.
   *
   * @param {Array} value Group input items states
   * @param {Options|Object} [options] Options
   * @returns {Promise<void>}
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async expectItemsPartOfStateIs(value, options) {
    if (!_.isArray(value)) {
      throw new TypeError(
        `${this.displayName}.expectItemsPartOfStateIs(): 'value' argument ` +
        `must be an array but it is ${typeOf(value)} (${value})`
      );
    }

    const itemsPartOfState = await this.getItemsPartOfState(options);
    await t.expect(itemsPartOfState).eql(value); // TODO Add diff to error message.
  }

  // ---------------------------------------------------------------------------
  // State :: NoRowGap (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getNoRowGapPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsNoRowGap
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotNoRowGap
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: SoftColumns (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getSoftColumnsPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsSoftColumns
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotSoftColumns
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: StackedOnMobile (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getStackedOnMobilePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsStackedOnMobile
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotStackedOnMobile
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<Array>}
   */
  async getValuePartOfState(options) {
    const itemsCount = await this.itemElementSelector.count;
    const statePromises = [];

    for (let i = 0; i < itemsCount; i++) {
      statePromises.push(
        this.getItem({ idx: i }).getValuePartOfState(options)
      );
    }

    return Promise.all(statePromises);
  }

  // TODO Must be tested using text group input, because it is read-only in
  //      checkable group input.
  /**
   * Sets 'Value' part of state to new `value`.
   *
   * @param {Array} [value] New value for 'Value' part of fragment's state. Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options] Options
   * @returns {Promise<Array>} Fragment's 'Value' part of state.
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async setValuePartOfState(value, options) {
    if (_.isUndefined(value)) {
      return this.getValuePartOfState(options);
    }

    if (!_.isArray(value)) {
      throw new TypeError(
        `${this.displayName}#setValuePartOfState(): 'value' argument must ` +
        `be an array but it is ${typeOf(value)} (${value})`
      );
    }

    const itemsCount = await this.itemElementSelector.count;

    for (let i = 0; i < itemsCount; i++) {
      const item = this.getItem({ idx: i });
      await item.setValuePartOfState(value[i], options);
    }

    return this.getValuePartOfState(options);
  }

  /**
   * Asserts that 'Value' part of fragment's state is equal to `value` which is
   * an `Array` of group input items value states.
   *
   * @param {Array} value Group input items value states
   * @param {Options|Object} [options] Options
   * @returns {Promise<void>}
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async expectValuePartOfStateIs(value, options) {
    const { isNot, sameOrder } = new Options(options, {
      defaults: {
        isNot: false,
        sameOrder: true
      }
    });

    const val = await this.getValuePartOfState(options);

    if (sameOrder) {
      const assertionName = utils.buildTestCafeAssertionName('eql', { isNot });
      await t.expect(val)[assertionName](value);
    }
    else {
      const matched = _.every(value, (v) => _.includes(val, v));
      const assertionName = utils.buildTestCafeAssertionName('ok', { isNot });

      await t.expect(matched)[assertionName](
        `${this.displayName}.expectValuePartOfStateIs(): Expected ` +
        `'${JSON.stringify(val)}' to ` + (isNot ? 'not ' : '') + 'have same ' +
        `set of elements as '${JSON.stringify(value)}' but it ` +
        (isNot ? 'has' : `hasn't`)
      );
    }
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that group input fragment has item fragment. Optionally, asserts
   * that specified item found in group input in position specified by `idx`.
   * 
   * @param {*} [itemLocator] See `locator` parameter of item fragment's class constructor
   * @param {*} [itemOptions] See `options` parameter of item fragment's class constructor
   * @param {Options|Object} [options]
   * @param {Number} [options.idx] A position (integer gte 0) at which item must be found in group input to pass assertion
   * @returns {Promise<Object>} Item fragment.
   */
  async expectHasItem(itemLocator, itemOptions, options) {
    return this.expectHasSomething('Item', itemLocator, itemOptions, options);
  }

  /**
   * Asserts that group input fragment has item fragments specified in
   * `itemLocatorAndOptions`. Optionally, asserts that group input has only
   * specified items, and, also optionally, asserts that items found in group
   * input in same order as in `itemLocatorAndOptions`.
   *
   * @param {Array} itemLocatorAndOptions Each element is a tuple of item fragment's `locator` and `optiions`. See corresponding parameters of item fragment's class constructor
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.only=false] Group input must have only specified items to pass assertion
   * @param {Boolean} [options.sameOrder=false] Items must be found in group input in same order as in `itemLocatorAndOptions E` to pass assertion. Work only in conjunction with 'only' option
   * @returns {Promise<Array<Object>>} Item fragments.
   */
  async expectHasItems(itemLocatorAndOptions, options) {
    return this.expectHasSomethings('Item', itemLocatorAndOptions, options);
  }

  /**
   * Asserts that item fragment found in group input fragment at index
   * specified by `idx`.
   *
   * @param {*} locator See `locator` parameter of item fragment's class constructor
   * @param {Options|Object} options See `options` parameter of item fragment's class constructor
   * @param {Number} idx Item must be found in group input at this position to pass assertion
   * @returns {Promise<void>}
   */
  async expectItemIndexIs(locator, options, idx) {
    await this
      .getItem(locator, options)
      .expectIndexInParentIs(this.selector, idx);
  }

  /**
   * Asserts that group input fragment contains all and only all item fragments
   * passed in `locatorAndOptionsList` list and they appears in same order as
   * in `locatorAndOptionsList`.
   *
   * @param {Array} locatorAndOptionsList Each element is a tuple of item fragment's `locator` and `options`. See corresponding parameters of item fragment's class constructor
   * @returns {Promise<void>}
   */
  async expectItemsAre(locatorAndOptionsList) {
    await this.expectHasItems(locatorAndOptionsList, {
      only: true,
      sameOrder: true
    });
  }

  /**
   * Asserts that count of item fragments in group input fragment equal value
   * specified in `count`.
   *
   * @param {Number|Array} count Group input fragment must have that number of item fragments to pass assertion. When you need more flexibility than just equality pass an `Array` with TestCafe assertion name (default to 'eql') as first element and expected value for assertion as second, for example, `['gte', 3]`
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be negated
   * @return {Promise<void>}
   */
  async expectItemsCountIs(count, options) {
    await GroupInput.expectSomethingsCountIs(
      this.itemElementSelector,
      count,
      options
    );
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns group input item fragment.
   *
   * @param {*} [locator] See `locator` parameter of item fragment's class constructor
   * @param {*} [options] See `options` parameter of item fragment's class constructor
   * @returns {Fragment}
   */
  getItem(locator, options) {
    return this.getSomething('item', locator, options);
  }

  /**
   * Retuns number of items in group.
   * 
   * @returns {Promise<Number>}
   */
  async getItemsCount() {
    return ((await this.itemElementSelector.count) - 1);
  }

  /**
   * Clicks on item and returns it.
   * 
   * @param {*} [locator] See `locator` parameter of item fragment's class constructor
   * @param {*} [options] See `options` parameter of item fragment's class constructor
   * @returns {Promise<Fragment>}
   */
  async clickItem(locator, options) {
    const item = this.getItem(locator, options);
    await item.expectIsExist();
    await item.click();
    return item;
  }
}

Object.defineProperties(GroupInput, {
  bemBase: {
    value: 'nw-groupInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.group-input'
  },
  ItemFragment: {
    value: null
  }
});

export default GroupInput;
