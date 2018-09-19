import testFragment from 'nebula-test-fragment';

import CheckableGroupInputItem from './item';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkable-group-input.checked-item';

/**
 * Fragment that represents checkable group input checked item.
 */
class CheckableGroupInputCheckedItem extends CheckableGroupInputItem {

  /**
   * Creates fragment.
   *
   * @param {CheckableGroupInputCheckedItem|Object} [spec] When it's already instance of `CheckableGroupInputCheckedItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
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

Object.defineProperties(CheckableGroupInputCheckedItem, {
  bemBase: {
    value: 'nw-checkableGroupInput-item--checked'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default CheckableGroupInputCheckedItem;
