import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';
import { t } from 'testcafe';

import CheckableGroupInputCheckedItem from '../checkable-group-input/checked-item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.radio-group-input.checked-item';

/**
 * Fragment that represents radio group input checked item.
 */
class RadioGroupInputCheckedItem extends CheckableGroupInputCheckedItem {

  /**
   * Creates fragment.
   *
   * @param {RadioGroupInputCheckedItem|Object} [spec] When it's already instance of `RadioGroupInputCheckedItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
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
  // State :: Checked
  // ---------------------------------------------------------------------------

  // TODO Copied as-is from './item' - find a better way (mixins?).
  /**
   * Sets checked item's 'Checked' part of state to boolean true or false.
   * 
   * @param {Boolean} value Whether item must be checked or not
   * @param {Options|Object} [options] Options. Passed as-is to `#getCheckedPartOfState()` to get current value before setting new one
   * @return {Promise<Boolean>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    if (!_.isBoolean(value)) {
      throw new TypeError(
        `'${this.displayName}#setCheckedPartOfState():' 'value' argument must be a boolean but it is ` +
        `${typeOf(value)} (${value})`
      );
    }

    const isChecked = await this.getCheckedPartOfState(options);

    if (isChecked !== value) {
      await this.click();
    }

    return value;
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  // TODO Copied as-is from './item' - find a better way (mixins?).
  /**
   * Clicks on checked item.
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.labelElementSelector);
  }
}

Object.defineProperties(RadioGroupInputCheckedItem, {
  bemBase: {
    value: 'nw-radioGroupInput-item--checked'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default RadioGroupInputCheckedItem;
