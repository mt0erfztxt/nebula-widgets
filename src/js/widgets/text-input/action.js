import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
  bem: { BemBase },
  Fragment,
  Options
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Fragment that represents action of text input.
 * 
 * NOTE: Icon in widget promoted to CID and so later can be used to select
 *       required fragment
 */
class Action extends BaseClass {

  /**
   * BEM base for fragment's 'icon' element.
   *
   * @returns {BemBase}
   */
  get iconElementBemBase() {
    if (!this._iconElementBemBase) {
      this._iconElementBemBase = this
        .cloneBemBase()
        .setElt('icon');
    }

    return this._iconElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'icon' element.
   *
   * @returns {Selector}
   */
  get iconElementSelector() {
    if (!this._iconElementSelector) {
      this._iconElementSelector = this
        .selector
        .find(`.${this.iconElementBemBase}`);
    }

    return this._iconElementSelector;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(options) {
    const { onlyWritable } = new Options(options, {
      defaults: {
        onlyWritable: false
      }
    });

    const writableParts = super.getStateParts({ onlyWritable });

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat(['disabled']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Action#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Action#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Action#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Action#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Action#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Clicks on text input'a action (actually on its icon).
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.iconElementSelector);
  }

  /**
   * Hovers on fragment.
   * 
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.selector=this.iconElementSelector] Selector to hover on
   * @param {Number} [options.wait] Wait specified number of milliseconds after hover is done
   * @returns {Promise<void>}
   */
  async hover(options) {
    await Fragment.prototype.hover.call(
      this,
      new Options(options, {
        defaults: {
          selector: this.iconElementSelector
        }
      })
    );
  }
}

Object.defineProperties(Action, {
  bemBase: {
    value: 'nw-textInput-action'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-input.action'
  }
});

export default Action;
