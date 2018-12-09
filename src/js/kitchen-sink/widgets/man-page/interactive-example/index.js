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
const fragmentDisplayName = 'nebula-widgets.kitchen-sink.widgets.man-page.interactive-example';

/**
 * Fragment that represents man page's interactive example.
 */
class InteractiveExample extends Fragment1 {

  /**
   * BEM base for fragment's 'view' element.
   *
   * @returns {BemBase}
   */
  get viewElementBemBase() {
    if (!this._viewElementBemBase) {
      this._viewElementBemBase = this
        .cloneBemBase()
        .setElt('view');
    }

    return this._viewElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'view' element.
   *
   * @returns {Selector}
   */
  get viewElementSelector() {
    if (!this._viewElementSelector) {
      this._viewElementSelector = this
        .selector
        .find(`.${this.viewElementBemBase}`);
    }

    return this._viewElementSelector;
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
