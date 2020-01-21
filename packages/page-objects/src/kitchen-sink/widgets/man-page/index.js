import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

import Example from './example';

const {
  Fragment
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
   * Returns example fragment.
   *
   * @param {*} [locator] See `locator` parameter of `Example` fragment's constructor
   * @param {*} [options] See `options` parameter of `Example` fragment's constructor
   * @returns {Example}
   */
  getExample(locator, options) {
    return this.getSomething('example', locator, options);
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
