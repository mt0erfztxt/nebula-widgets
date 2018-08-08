import testFragment from 'nebula-test-fragment';

import CheckableGroupInput_Item from '../checkable-group-input/item';

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
class RadioGroupInput_Item extends CheckableGroupInput_Item {

  /**
   * Creates fragment.
   *
   * @param {RadioGroupInput_Item|Object} [spec] - When it's already instance of `RadioGroupInput_Item` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] - Options
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts, {
      spec: {
        cns: 'radioGroupInput-item'
      }
    });

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }
}

Object.defineProperties(RadioGroupInput_Item, {
  displayName: {
    value: fragmentDisplayName
  }
});

export default RadioGroupInput_Item;
