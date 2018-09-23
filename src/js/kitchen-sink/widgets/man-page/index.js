import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import Example from './example';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.kitchen-sink.widgets.man-page';

/**
 * Fragment that represents man page.
 */
class ManPage extends Fragment {

  /**
   * Creates fragment.
   *
   * @param {ManPage|Object} [spec] When it's already instance of `ManPage` it would be returned as-is, otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   * @param {Object} [opts.ExampleFragmentOpts] Default `opts` for example section fragment's constructor
   * @param {Object} [opts.ExampleFragmentSpec] Default `spec` for example section fragment's constructor
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  /**
   * Class of example fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When example fragment class is not valid.
   */
  get ExampleFragment() {
    if (!this._ExampleFragment) {
      this._ExampleFragment = this.getSomethingFragment('example', ManPage);
    }

    return this._ExampleFragment;
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns example fragment that matches `spec` and `opts`.
   *
   * @param {*} [spec] - See `spec` parameter of `Example`
   * @param {*} [opts] - See `opts` parameter of `Example`
   * @returns {Example}
   */
  getExample(spec, opts) {
    return this.getSomething(
      this.ExampleFragment,
      _.assign({}, this.opts.ExampleFragmentSpec, { parent: this.selector }, spec),
      _.assign({}, this.opts.ExampleFragmentOpts, opts)
    );
  }
}

Object.defineProperties(ManPage, {
  bemBase: {
    value: 'manPage'
  },
  displayName: {
    value: fragmentDisplayName
  },
  ExampleFragment: {
    value: Example
  }
});

export default ManPage;
