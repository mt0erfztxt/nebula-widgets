import testFragment from 'nebula-test-fragment';

import CheckableGroupInput from '../checkable-group-input';

import CheckboxGroupInputCheckedItem from './checked-item';
import CheckboxGroupInputItem from './item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkbox-group-input';

/**
 * Fragment that represents checkbox group input.
 */
class CheckboxGroupInput extends CheckableGroupInput {

  /**
   * Creates fragment.
   *
   * @param {CheckboxGroupInput|Object} [spec] When it's already instance of `CheckboxGroupInput` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
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
}

Object.defineProperties(CheckboxGroupInput, {
  bemBase: {
    value: 'nw-checkboxGroupInput'
  },
  CheckedItemFragment: {
    value: CheckboxGroupInputCheckedItem
  },
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: CheckboxGroupInputItem
  }
});

export default CheckboxGroupInput;
