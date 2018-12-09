import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

const {
  Fragment1
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
class Example extends Fragment1 {

  /**
   * BEM base for fragment's 'title' element.
   *
   * @returns {BemBase}
   */
  get titleElementBemBase() {
    if (!this._titleElementBemBase) {
      this._titleElementBemBase = this
        .cloneBemBase()
        .setElt('title');
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
      this._titleElementSelector = this
        .selector
        .find(`.${this.titleElementBemBase}`);
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
