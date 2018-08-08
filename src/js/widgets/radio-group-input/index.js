import testFragment from 'nebula-test-fragment';

import CheckableGroupInput from '../checkable-group-input';

import RadioGroupInput_Item from './item';

const {
  Fragment,
  Options,
  utils
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
   * @param {RadioGroupInput|Object} [spec] - When it's already instance of `RadioGroupInput` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] - Options, see extended fragment's constructor `opts` parameter
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts, {
      spec: {
        cns: 'radioGroupInput'
      }
    });

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }
}

Object.defineProperties(RadioGroupInput, {
  displayName: {
    value: fragmentDisplayName
  },
  ItemFragment: {
    value: RadioGroupInput_Item
  }
});

export default RadioGroupInput;
