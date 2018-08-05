import testFragment from 'nebula-test-fragment';

import GroupInputItem from '../checkable-group-input/item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Base class for checkable group input item fragment.
 */
const BaseClass = Fragment.makeFragmentClass(GroupInputItem, {
  stateParts: [
    'checked'
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkable-group-input.item';

/**
 * Fragment that represents checkable group input item.
 */
class Item extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {Item|Object} [spec] - When it's already instance of `Item` it would be returned as-is otherwise it's same as `Fragment` constructor `spec` parameter
   * @param {Options|Object} [opts] - Options
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
  // State
  // ---------------------------------------------------------------------------

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, [
      'checked'
    ]);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, []);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Checked
  // ---------------------------------------------------------------------------
  // Mostly inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Item#getCheckedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * Sets item's 'Checked' part of state to boolean true or false depending on
   * whether passed in `value` is truthy or not.
   * 
   * @param {*} value - Whether item must be checked or not
   * @param {Options|Object} [options] - Options
   * @return {Promise<*>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    throw new Error(
      `${this.displayName}.setCheckedPartOfState(): not implemented`
    );
  }

  /**
   * @name Item#expectIsChecked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsNotChecked
   * @method
   * @returns {Promise<void>}
   */

}

Object.defineProperties(Item, {
  displayName: {
    value: fragmentDisplayName
  }
});

export default Item;
