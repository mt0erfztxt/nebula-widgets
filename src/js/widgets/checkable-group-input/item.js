import testFragment from 'nebula-test-fragment';

import GroupInputItem from '../group-input/item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Base class for checkable group input item fragment.
 * 
 * @class
 * @extends {GroupInputItem}
 */
const CheckableGroupInputItemBaseClass = Fragment.makeFragmentClass(GroupInputItem, {
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
class CheckableGroupInputItem extends CheckableGroupInputItemBaseClass {

  /**
   * Creates fragment.
   *
   * @param {CheckableGroupInputItem|Object} [spec] When it's already instance of `CheckableGroupInputItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter plus it implements following custom specs - 'checked'
   * @param {Boolean} [spec.checked] Allows to find item that is checked or not. Can be combined with specs of extended fragment
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

    const { checked } = initializedSpec;

    if (checked === true || checked === false) {
      this.selector = this.selector.filter((node) => {
        return (checked === node.classList.contains(checkdeModifierClassName));
      }, {
        checked,
        checkdeModifierClassName: this.cloneBemBase().setMod('checked').toString()
      });
    }

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
   * @name CheckableGroupInputItem#getCheckedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * Sets item's 'Checked' part of state to boolean true or false depending on
   * whether passed in `value` is truthy or not.
   * 
   * @param {*} value Whether item must be checked or not
   * @param {Options|Object} [options] Options
   * @return {Promise<*>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    throw new Error(
      `${this.displayName}.setCheckedPartOfState(): not implemented`
    );
  }

  /**
   * @name CheckableGroupInputItem#expectIsChecked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name CheckableGroupInputItem#expectIsNotChecked
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------
  // Overrides Input
  // Checkable input's value is same as for 'Checked' part of state
  // ---------------------------------------------------------------------------

  // TODO Tests
  /**
   * Obtains 'Value' part of fragment's state and returns it.
   * 
   * @param {Options|Object} [options] Options
   * @returns {Promise<Boolean>}
   */
  async getValuePartOfState(options) {
    return this.getCheckedPartOfState(options);
  }

  // TODO Tests
  /**
   * Sets 'Value' part of fragment's state and returns it.
   * 
   * @param {Boolean} value New value for 'Value' part of fragment's state
   * @param {Options|Object} [options] Options
   * @return {Promise<Boolean>} Current value of 'Value' part of fragment's state after set state operation is done.
   */
  async setValuePartOfState(value, options) {
    return this.setCheckedPartOfState(value, options);
  }

  // TODO Tests
  /**
   * Asserts that 'Value' part of fragment's state is equal specified value.
   *
   * @param {Boolean} value Part of state must equal that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be inverted
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    await this.expectCheckedPartOfStateIs(value, options);
  }
}

Object.defineProperties(CheckableGroupInputItem, {
  displayName: {
    value: fragmentDisplayName
  }
});

export default CheckableGroupInputItem;
