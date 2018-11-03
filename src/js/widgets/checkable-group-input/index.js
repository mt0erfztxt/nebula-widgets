import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import GroupInput from '../group-input';

import CheckableGroupInputCheckedItem from './checked-item';
import CheckableGroupInputItem from './item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkable-group-input';

/**
 * Fragment that represents checkable group input.
 */
class CheckableGroupInput extends GroupInput {

  /**
   * Creates fragment.
   *
   * @param {CheckableGroupInput|Object} [spec] When it's already instance of `CheckableGroupInput` it would be returned as-is otherwise it's same as `GroupInput` constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   * @param {Object} [opts.CheckedItemFragmentSpec] Default `opts` for checked item fragment's constructor
   * @param {Object} [opts.CheckedItemFragmentOpts] Default `spec` for checked item fragment's constructor
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
   * BEM base for fragment's 'item--checked' element.
   *
   * @returns {BemBase}
   */
  get checkedItemElementBemBase() {
    if (!this._checkedItemElementBemBase) {
      this._checkedItemElementBemBase = this.cloneBemBase().setElt('item').setMod('checked');
    }

    return this._checkedItemElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'item--checked' element.
   *
   * @returns {Selector}
   */
  get checkedItemElementSelector() {
    if (!this._checkedItemElementSelector) {
      this._checkedItemElementSelector = this.selector.find(`.${this.checkedItemElementBemBase}`);
    }

    return this._checkedItemElementSelector;
  }

  /**
   * Class of checked item fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When checked item fragment class is not valid.
   */
  get CheckedItemFragment() {
    if (!this._CheckedItemFragment) {
      this._CheckedItemFragment = this.getSomethingFragment('CheckedItem', CheckableGroupInput);
    }

    return this._CheckedItemFragment;
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that checkable group input fragment has checked item fragment
   * specified by `spec` and `opts`. Optionally, asserts that specified checked
   * item found in checkable group input in position specified by `idx`.
   * 
   * @param {*} [spec] See `spec` parameter of item fragment's class constructor
   * @param {*} [opts] See `opts` parameter of item fragment's class constructor
   * @param {Options|Object} [options]
   * @param {Number} [options.idx] A position (integer gte 0) at which checked item must be found in group input to pass assertion
   * @returns {Promise<Object>} Checked item.
   */
  async expectHasCheckedItem(spec, opts, options) {
    return this.expectHasSomething('CheckedItem', spec, opts, options);
  }

  /**
   * Asserts that checkable group input fragment has checked checkable group
   * input item fragments specified in `specAndOptsList`. Optionally, asserts
   * that checkable group input has only specified checked items, and, also
   * optionally, asserts that checked items found in checkable group input in
   * same order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList Each element is a tuple of item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.only=false] Checkable group input must have only specified checked items to pass assertion
   * @param {Boolean} [options.sameOrder=false] Checked items must be found in checkable group input in same order as in `specAndOptsList` to pass assertion. Work only in conjunction with `options.only` parameter
   * @returns {Promise<Array<Object>>} Checked items.
   */
  async expectHasCheckedItems(specAndOptsList, options) {
    return this.expectHasSomethings('CheckedItem', specAndOptsList, options);
  }

  /**
   * Asserts that checkable group input checked item fragment specified by
   * `spec` found in checkable group input fragment at index specified by `idx`.
   *
   * @param {*} spec See `spec` parameter of checked item fragment's class constructor
   * @param {*} opts See `opts` parameter of checked item fragment's class constructor
   * @param {Number} idx Checked item must be found in checkable group input at this position to pass assertion
   * @returns {Promise<void>}
   */
  async expectCheckedItemIndexIs(spec, opts, idx) {
    await this.getCheckedItem(spec, opts).expectIndexInParentIs(this.selector, idx);
  }

  /**
   * Asserts that checkable group input fragment contains all and only all
   * checked item fragments passed in `specAndOptsList` list and they appears
   * in same order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList Each element is a tuple of checked item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @returns {Promise<Array<Object>>} Checked items.
   */
  async expectCheckedItemsAre(specAndOptsList) {
    return this.expectHasCheckedItems(specAndOptsList, { only: true, sameOrder: true });
  }

  /**
   * Asserts that number of checked item fragments in checkable group input
   * fragment equal value specified in `count`.
   *
   * @param {Number|Array} count Checkable group input must have that number of checked items to pass assertion. When you need more flexibility than just equality pass an `Array` with TestCafe assertion name (default to 'eql') as first element and expected value for assertion as second, for example, `['gte', 3]`
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be negated
   * @return {Promise<void>}
   */
  async expectCheckedItemsCountIs(count, options) {
    await CheckableGroupInput.expectSomethingsCountIs(this.checkedItemElementSelector, count, options);
  }

  async expectHasValue() {
    await this.expectCheckedItemsCountIs(['gt', 0]);
  }

  async expectHasNoValue() {
    await this.expectCheckedItemsCountIs(0);
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns checkable group input checked item fragment that matches `spec`
   * and `opts`.
   *
   * @param {*} [spec] See `spec` parameter of checked item fragment's class constructor
   * @param {*} [opts] See `opts` parameter of checked item fragment's class constructor
   * @returns {Fragment}
   */
  getCheckedItem(spec, opts) {
    return this.getSomething(
      this.CheckedItemFragment,
      _.assign({}, this._opts.CheckedItemFragmentSpec, { parent: this.selector }, spec),
      _.assign({}, this._opts.CheckedItemFragmentOpts, opts)
    );
  }
}

Object.defineProperties(CheckableGroupInput, {
  CheckedItemFragment: {
    value: CheckableGroupInputCheckedItem
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: CheckableGroupInputItem
  }
});

export default CheckableGroupInput;
