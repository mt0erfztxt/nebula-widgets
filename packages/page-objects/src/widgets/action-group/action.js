import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
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
    ['accented'],
    ['active'],
    ['disabled', { antonym: 'enabled' }],
    ['reversed'],
    ['size', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents action of action group.
 *
 * State parts:
 * * own:
 *   - accented
 *   - active
 *   - disabled (antonym: enabled)
 *   - reversed
 *   - size
 *
 * @extends {Fragment}
 */
class ActionGroupAction extends BaseClass {

  /**
   * BEM base for fragment's 'text' element.
   *
   * @returns {BemBase}
   */
  get textElementBemBase() {
    if (!this._textElementBemBase) {
      this._textElementBemBase = this
        .cloneBemBase()
        .setElt('text');
    }

    return this._textElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'text' element.
   *
   * @returns {Selector}
   */
  get textElementSelector() {
    if (!this._textElementSelector) {
      this._textElementSelector = this
        .selector
        .find(`.${this.textElementBemBase}`);
    }

    return this._textElementSelector;
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
      return writableParts.concat([
        'accented',
        'active',
        'disabled',
        'reversed',
        'size'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Accented (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroupAction#getAccentedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ActionGroupAction#expectIsAccented
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsNotAccented
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Active (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroupAction#getActivePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ActionGroupAction#expectIsActive
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsNotActive
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroupAction#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ActionGroupAction#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Reversed (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroupAction#getReversedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ActionGroupAction#expectIsReversed
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectIsNotReversed
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Size (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name ActionGroupAction#getSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name ActionGroupAction#expectSizeIs
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  /**
   * @name ActionGroupAction#expectSizeIsNot
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that action has specified text.
   *
   * @param {String} text Action must have that text to pass assertion
   */
  async expectTextIs(text) {
    await Fragment.prototype.expectTextIs.call(this, text, {
      selector: this.textElementSelector
    });
  }
}

Object.defineProperties(ActionGroupAction, {
  bemBase: {
    value: 'nw-actionGroup-action'
  },
  displayName: {
    value: 'nebula-widgets.widgets.action-group.action'
  }
});

export default ActionGroupAction;
