import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';
import typeOf from 'typeof--';

import GroupInput from '../group-input';

import Item from './item';

const {
  bem: { BemBase },
  Fragment,
  Options,
  utils
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
   * @param {CheckableGroupInput|Object} [spec] - When it's already instance of `CheckableGroupInput` it would be returned as-is otherwise it's same as `GroupInput` constructor `spec` parameter
   * @param {Options|Object} [opts] - Options. Same as in `GroupInput` constructor
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that number of checked item fragments in checkable group input
   * fragment equal value specified in `count`.
   *
   * @param {Number|Array} count - Checkable group input must have that number of checked items to pass assertion. When you need more flexibility than just equality pass an `Array` with TestCafe assertion name (default to 'eql') as first element and expected value for assertion as second, for example, `['gte', 3]`
   * @param {Options|Object} [options] - Options
   * @param {Boolean} [options.isNot=false] - When truthy assertion would be negated
   * @return {Promise<void>}
   */
  async expectCheckedItemsCountIs(count, options) {
    let assertionName = 'eql';
    const checkedItems = await this.getCheckedItems();

    if (_.isArray(count)) {
      [assertionName, count] = count;
    }

    assertionName = utils.buildTestCafeAssertionName(assertionName, options);
    await t.expect(checkedItems.length)[assertionName](count);
  }

  /**
   * Asserts that checkable group input fragment has checked item fragment
   * specified by `spec` and `opts`. Optionally, asserts that specified checked
   * item found in checkable group input in position specified by `idx`.
   * 
   * @param {*} [spec] - See `spec` parameter of item fragment's class constructor
   * @param {*} [opts] - See `opts` parameter of item fragment's class constructor
   * @param {Number} [idx] - A position (integer gte 0) at which item must be found in group input to pass assertion
   * @returns {Promise<Object>} Checked item.
   */
  async expectHasCheckedItem(spec, opts, idx) {
    const checkedItems = await this.expectHasCheckedItems([spec, opts]);

    if (idx) {
      if (!(_.isInteger(idx) && idx >= 0)) {
        throw new TypeError(
          `${this.displayName}#expectHasCheckedItem(): 'idx' argument must be an integer greater or ` +
          `equal 0 but it is ${typeOf(idx)} (${idx})`
        );
      }

      const item = this.getItem(spec, opts);
      const itemAtIdx = this.getItem({ idx });

      await itemAtIdx.expectIsExist();
      await itemAtIdx.expectIsChecked();

      await t
        .expect(item.textContent)
        .eql(itemAtIdx.textContent, `Item matches ${spec} and ${opts} doesn't equal item at index ${idx}`);
    }

    return checkedItems[0];
  }

  // TODO It can be implemented in terms of `Fragment#expectHasSomethings` if we allow composable specs, e.g.
  //      we only need to add 'checked: true' to `spec` to get only checked items.
  /**
   * Asserts that checkable group input fragment has checked checkable group
   * input item fragments specified in `specAndOptsList`. Optionally, asserts
   * that checkable group input has only specified checked items, and, also
   * optionally, asserts that checked items found in checkable group input in
   * same order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList - Each element is a tuple of item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @param {Options|Object} [options] - Options
   * @param {Boolean} [options.only=false] - Checkable group input must have only specified checked items to pass assertion
   * @param {Boolean} [options.sameOrder=false] - Checked items must be found in checkable group input in same order as in `specAndOptsList` to pass assertion. Work only in conjunction with `options.only` parameter
   * @returns {Promise<Array<Object>>} Checked items.
   */
  async expectHasCheckedItems(specAndOptsList, options) {
    const opts = new Options(options, {
      defaults: {
        only: false,
        sameOrder: false
      }
    });

    const specifiedCheckedItems = [];

    for (let i = 0, len = specAndOptsList.length; i < len; i++) {
      const item = this.getItem(specAndOptsList[0], specAndOptsList[1]);

      await item.expectIsExist();
      await item.expectIsChecked();

      specifiedCheckedItems.push(item);
    }

    // Check that group has no more and no less than specified checked items.
    if (opts.only) {
      const allCheckedItems = await this.getCheckedItems();

      await t
        .expect(specifiedCheckedItems.length)
        .eql(allCheckedItems.length, `Number of specified checked items doesn't equal number of checked items in DOM`);

      // Check that group has checked items in specified order.
      // Naive implementation, but (I hope :D) works in most cases.
      if (opts.sameOrder) {
        for (let i = 0, len = allCheckedItems.length; i < len; i++) {
          await t
            .expect(allCheckedItems[i].selector.textContent)
            .eql(specifiedCheckedItems[i].selector.textContent);
        }
      }
    }

    return specifiedCheckedItems;
  }

  /**
   * Asserts that checkable group input fragment contains all and only all
   * checked item fragments passed in `specAndOptsList` list and they appears
   * in same order as in `specAndOptsList`.
   *
   * @param {Array} specAndOptsList - Each element is a tuple of item fragment's `spec` and `opts`. See corresponding parameters of item fragment's class constructor
   * @returns {Promise<Array<Object>>} Checked items.
   */
  async expectCheckedItemsAre(specAndOptsList) {
    return this.expectHasCheckedItems(specAndOptsList, { only: true, sameOrder: true });
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
   * Returns list of all checked item fragments in checkable group input
   * fragment.
   * 
   * @returns {Promise<Array<Object>>}
   */
  async getCheckedItems() {
    const checkedItems = [];
    const itemsCount = await this.itemElementSelector.count;

    for (let i = 0; i < itemsCount; i++) {
      const item = this.getItem({ idx: i });

      if (await item.getCheckedPartOfState()) {
        checkedItems.push(item);
      }
    }

    return checkedItems;
  }
}

Object.defineProperties(CheckableGroupInput, {
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: Item
  }
});

export default CheckableGroupInput;
