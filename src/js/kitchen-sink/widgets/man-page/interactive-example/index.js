import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.kitchen-sink.widgets.man-page.interactive-example';

/**
 * Fragment that represents man page's interactive example.
 */
class InteractiveExample extends Fragment {

  /**
   * Creates fragment.
   *
   * @param {InteractiveExample|Object} [spec] When it's already instance of `InteractiveExample` it would be returned as-is, otherwise it's same as extended fragment's constructor `spec` parameter
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

Object.defineProperties(InteractiveExample, {
  bemBase: {
    value: 'manPage-interactiveExample'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default InteractiveExample;
