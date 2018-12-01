import GroupInput from '../group-input';
import RadioInput from '../radio-input';

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.radio-group-input';

/**
 * Fragment that represents radio group input.
 */
class RadioGroupInput extends GroupInput {}

Object.defineProperties(RadioGroupInput, {
  bemBase: {
    value: 'nw-radioGroupInput'
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: RadioInput
  }
});

export default RadioGroupInput;
