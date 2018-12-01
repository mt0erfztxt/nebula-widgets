import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';

import CheckableInput from '../checkable-input';

const {
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.radio-input';

/**
 * Fragment that represents radio input.
 */
class RadioInput extends CheckableInput {

  // ---------------------------------------------------------------------------
  // State :: Checked
  // ---------------------------------------------------------------------------

  /**
   * Sets 'Checked' part of state to boolean true or false.
   * 
   * @param {Boolean} value New value for 'Checked' part of state
   * @param {Options|Object} [options] Options. Passed as-is to `#getCheckedPartOfState()` to get current value before setting new one
   * @return {Promise<Boolean>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    if (!_.isBoolean(value)) {
      throw new TypeError(
        `'${this.displayName}#setCheckedPartOfState():' 'value' argument ` +
        `must be a boolean but it is ${typeOf(value)} (${value})`
      );
    }
    else if (value === false){
      throw new TypeError(
        `'${this.displayName}#setCheckedPartOfState():' 'value' argument ` +
        `can't be false because radio input can't uncheck itself`
      );
    }

    const isChecked = await this.getCheckedPartOfState(options);

    if (isChecked !== value) {
      await this.click();
    }

    return value;
  }
}

Object.defineProperties(RadioInput, {
  bemBase: {
    value: 'nw-radioInput'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default RadioInput;
