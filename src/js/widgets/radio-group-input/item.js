import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';
import { t } from 'testcafe';

import CheckableGroupInputItem from '../checkable-group-input/item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.radio-group-input.item';

/**
 * Fragment that represents radio group input item.
 */
class RadioGroupInputItem extends CheckableGroupInputItem {

  /**
   * Creates fragment.
   *
   * @param {RadioGroupInputItem|Object} [spec] When it's already instance of `RadioGroupInputItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
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

  // ---------------------------------------------------------------------------
  // State :: Checked
  // ---------------------------------------------------------------------------

  /**
   * Sets item's 'Checked' part of state to boolean true or false.
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
}

Object.defineProperties(RadioGroupInputItem, {
  bemBase: {
    value: 'nw-radioGroupInput-item'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default RadioGroupInputItem;
