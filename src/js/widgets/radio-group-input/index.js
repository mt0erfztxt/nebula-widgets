import testFragment from 'nebula-test-fragment';

import CheckableGroupInput from '../checkable-group-input';

import RadioGroupInputCheckedItem from './checked-item';
import RadioGroupInputItem from './item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.radio-group-input';

/**
 * Fragment that represents radio group input.
 */
class RadioGroupInput extends CheckableGroupInput {

  /**
   * Creates fragment.
   *
   * @param {RadioGroupInput|Object} [spec] When it's already instance of `RadioGroupInput` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
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
}

Object.defineProperties(RadioGroupInput, {
  bemBase: {
    value: 'nw-radioGroupInput'
  },
  CheckedItemFragment: {
    value: RadioGroupInputCheckedItem
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: RadioGroupInputItem
  }
});

export default RadioGroupInput;
