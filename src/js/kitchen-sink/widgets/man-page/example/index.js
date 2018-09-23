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
const fragmentDisplayName = 'nebula-widgets.kitchen-sink.widgets.man-page.example';

/**
 * Fragment that represents man page's example.
 */
class Example extends Fragment {

  /**
   * Creates fragment.
   *
   * @param {Example|Object} [spec] When it's already instance of `Example` it would be returned as-is, otherwise it's same as extended fragment's constructor `spec` parameter
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

  /**
   * BEM base for fragment's 'title' element.
   *
   * @returns {BemBase}
   */
  get titleElementBemBase() {
    if (!this._titleElementBemBase) {
      this._titleElementBemBase = this.cloneBemBase().setElt('title');
    }

    return this._titleElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'title' element.
   *
   * @returns {Selector}
   */
  get titleElementSelector() {
    if (!this._titleElementSelector) {
      this._titleElementSelector = this.selector.find(`.${this.titleElementBemBase}`);
    }

    return this._titleElementSelector;
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that example's title equal or matches specified value.
   * 
   * @param {String|RegExp} text Title must be equal or match that text to pass assertion
   */
  async expectTitleIs(text) {
    await this.expectExistsAndConformsRequirements({ textContent: text }, {
      selector: this.titleElementSelector
    });
  }
}

Object.defineProperties(Example, {
  bemBase: {
    value: 'manPage-example'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default Example;
