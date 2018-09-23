import _ from 'lodash';
import Promise from 'pinkie-promise';
import testFragment from 'nebula-test-fragment';
import { Selector, t } from 'testcafe';
import typeOf from 'typeof--';

import Input from '../input';

import GroupInputItem from './item';

const {
  bem: { BemBase },
  Fragment,
  Options
} = testFragment;

/**
 * Base class for group input fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Fragment.makeFragmentClass(Input, {
  stateParts: [
    ['columns', { isBoolean: false }],
    ['disabled', { antonym: 'enabled' }],
    ['invalid', { antonym: 'valid' }],
    ['widget', { isBoolean: false }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.group-input';

/**
 * Fragment that represents group input.
 */
class GroupInput extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {GroupInput|Object} [spec] When it's already instance of `GroupInput` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   * @param {Object} [opts.ItemFragmentOpts] Default `opts` for group input item fragment's constructor
   * @param {Object} [opts.ItemFragmentSpec] Default `spec` for group input item fragment's constructor
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  /**
   * BEM base for fragment's 'item' element.
   *
   * @returns {BemBase}
   */
  get itemElementBemBase() {
    if (!this._itemElementBemBase) {
      this._itemElementBemBase = this.cloneBemBase().setElt('item');
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
      this._itemElementSelector = this.selector.find(`.${this.itemElementBemBase}`);
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
      this._ItemFragment = this.getSomethingFragment('Item', GroupInput);
    }

    return this._ItemFragment;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, [
      'items'
    ]);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, [
        'disabled',
        'invalid',
        'widget'
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
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Invalid (read-only, antonym: Valid)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getInvalidPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectIsInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsValid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInput#expectIsNotValid
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
        `${this.displayName}.setItemsPartOfState(): 'value' argument must be an array ` +
        `but it is ${typeOf(value)} (${value})`
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
        `${this.displayName}.expectItemsPartOfStateIs(): 'value' argument must be an array ` +
        `but it is ${typeOf(value)} (${value})`
      );
    }

    const itemsCount = await this.itemElementSelector.count;
    const itemExpectStateIsPromises = [];

    await t
      .expect(itemsCount.length)
      .eql(value.length, `Number of items in ${this.displayName} not equal that in 'value'`);

    if (itemsCount) {
      for (let i = 0; i < itemsCount; i++) {
        const item = this.getItem({ idx: i });
        itemExpectStateIsPromises.push(item.expectStateIs(value[i], options));
      }
    }

    await Promise.all(itemExpectStateIsPromises);
  }

  // ---------------------------------------------------------------------------
  // State :: Widget (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInput#getWidgetPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInput#expectWidgetPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that group input fragment has group input item fragment specified
   * by `spec` and `opts`. Optionally, asserts that specified item found in
   * group input in position specified by `idx`.
   * 
   * @param {*} [spec] See `spec` parameter of item fragment's class constructor
   * @param {*} [opts] See `opts` parameter of item fragment's class constructor
   * @param {Options|Object} [options]
   * @param {Number} [options.idx] A position (integer gte 0) at which item must be found in group input to pass assertion
   * @returns {Promise<Object>} Item.
   */
  async expectHasItem(spec, opts, options) {
    return this.expectHasSomething('Item', spec, opts, options);
  }

  /**
   * Asserts that group input fragment has group input item fragments specified
   * in `specAndOptsList`. Optionally, asserts that group input has only
   * specified items, and, also optionally, asserts that items found in group
   * input in same order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList Each element is a tuple of item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.only=false] Group input must have only specified items to pass assertion
   * @param {Boolean} [options.sameOrder=false] Items must be found in group input in same order as in `specAndOptsList` to pass assertion. Work only in conjunction with `options.only` parameter
   * @returns {Promise<Array<Object>>} Items.
   */
  async expectHasItems(specAndOptsList, options) {
    return this.expectHasSomethings('Item', specAndOptsList, options);
  }

  /**
   * Asserts that group input item fragment specified by `spec` found in group
   * input fragment at index specified by `idx`.
   *
   * @param {*} spec See `spec` parameter of item fragment's class constructor
   * @param {*} opts See `opts` parameter of item fragment's class constructor
   * @param {Number} idx Item must be found in group input at this position to pass assertion
   * @returns {Promise<void>}
   */
  async expectItemIndexIs(spec, opts, idx) {
    await this.getItem(spec, opts).expectIndexInParentIs(this.selector, idx);
  }

  /**
   * Asserts that group input fragment contains all and only all group input
   * item fragments passed in `specAndOptsList` list and they appears in same
   * order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList Each element is a tuple of item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @returns {Promise<void>}
   */
  async expectItemsAre(specAndOptsList) {
    await this.expectHasItems(specAndOptsList, { only: true, sameOrder: true });
  }

  /**
   * Asserts that count of group input item fragments in group input fragment
   * equal value specified in `count`.
   *
   * @param {Number|Array} count Group input fragment must have that number of item fragments to pass assertion. When you need more flexibility than just equality pass an `Array` with TestCafe assertion name (default to 'eql') as first element and expected value for assertion as second, for example, `['gte', 3]`
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be negated
   * @return {Promise<void>}
   */
  async expectItemsCountIs(count, options) {
    await GroupInput.expectSomethingsCountIs(this.itemElementSelector, count, options);
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns group input item fragment that matches `spec` and `opts`.
   *
   * @param {*} [spec] See `spec` parameter of item fragment's class constructor
   * @param {*} [opts] See `opts` parameter of item fragment's class constructor
   * @returns {Fragment}
   */
  getItem(spec, opts) {
    return this.getSomething(
      this.ItemFragment,
      _.assign({}, this._opts.ItemFragmentSpec, { parent: this.selector }, spec),
      _.assign({}, this._opts.ItemFragmentOpts, opts)
    );
  }
}

Object.defineProperties(GroupInput, {
  bemBase: {
    value: 'nw-groupInput'
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: GroupInputItem
  }
});

export default GroupInput;
