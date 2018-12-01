import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';

import Input from '../input';
import { t } from 'testcafe';

const {
  bem: { BemBase },
  Options,
  selector,
  utils
} = testFragment;

/**
 * Base class for checkable input fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Input.makeFragmentClass(Input, {
  stateParts: [
    'checked'
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.checkable-input';

/**
 * Fragment that represents checkable input.
 */
class CheckableInput extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'checked' - Boolean
   * 2. 'value' - String, label text
   * 
   * @param {*} transformations 
   * @param {*} sel 
   * @param {*} bemBase 
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (_.has(transformations, k)) {
        if (k === 'checked') {
          const checked = transformations[k];

          if (_.isBoolean(checked)) {
            sel = sel.filter((node) => {
              return (checked === node.classList.contains(className));
            }, {
              checked,
              className: bemBase.setMod('checked', { fresh: true }).toString()
            });
          }
          else {
            throw new TypeError(
              `${this.displayName}: value for 'checked' transformation must ` +
              `be a boolean but it is ${typeOf(checked)} (${checked})`
            );
          }
        }
        else if (k === 'value') {
          const value = transformations[k];

          if (utils.isNonBlankString(value)) {
            const labelElementBemBase = bemBase.setElt('label', { fresh: true });
            sel = selector
              .filterByText(sel.child(`.${labelElementBemBase}`), value)
              .parent(`.${bemBase}`)
              .nth(0);
          }
          else {
            throw new TypeError(
              `${this.displayName}: value for 'value' transformation must ` +
              `be a non-blank string but it is ${typeOf(checked)} (${checked})`
            );
          }
        }
      }
    }

    return sel;
  }

  /**
   * BEM base for fragment's 'label' element.
   *
   * @returns {BemBase}
   */
  get labelElementBemBase() {
    if (!this._labelElementBemBase) {
      this._labelElementBemBase = this
        .cloneBemBase()
        .setElt('label');
    }

    return this._labelElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'label' element.
   *
   * @returns {Selector}
   */
  get labelElementSelector() {
    if (!this._labelElementSelector) {
      this._labelElementSelector = this
        .selector
        .find(`.${this.labelElementBemBase}`);
    }

    return this._labelElementSelector;
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

    const writableParts = _.concat(super.getStateParts({ onlyWritable }), [
      'checked'
    ]);

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return _.concat(writableParts, []);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Checked
  // ---------------------------------------------------------------------------
  // Mostly inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name CheckableInput#getCheckedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * Sets item's 'Checked' part of state to boolean true or false depending on
   * whether passed in `value` is truthy or not.
   * 
   * @param {*} value Whether item must be checked or not
   * @param {Options|Object} [options] Options
   * @return {Promise<*>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    throw new Error(
      `${this.displayName}.setCheckedPartOfState(): not implemented`
    );
  }

  /**
   * @name CheckableInput#expectIsChecked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name CheckableInput#expectIsNotChecked
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------
  // Overrides Input
  // Checkable input's value is a label text
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it.
   * 
   * @param {Options|Object} [options] Options
   * @returns {Promise<String>}
   */
  async getValuePartOfState(options) {
    return this.labelElementSelector.textContent;
  }

  /**
   * Obtains 'Value' part of fragment's state and returns it because this part
   * of state is read-only.
   * 
   * @param {*} value
   * @param {Options|Object} [options]
   * @return {Promise<String>}
   */
  async setValuePartOfState(value, options) {
    return this.getValuePartOfState(options);
  }

  /**
   * Asserts that 'Value' part of fragment's state is equal specified value.
   *
   * @param {String} value Part of state must equal that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be inverted
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    await t
      .expect(this.getValuePartOfState(options))
      .eql(value);
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Clicks on checkable input (actually on its label).
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.labelElementSelector);
  }

  /**
   * Hovers on fragment.
   * 
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.selector=this.labelElementSelector] Selector to hover on
   * @param {Number} [options.wait] Wait specified number of milliseconds after hover is done
   * @returns {Promise<void>}
   */
  async hover(options) {
    await Input.prototype.hover.call(
      this,
      new Options(options, {
        defaults: {
          selector: this.labelElementSelector
        }
      })
    );
  }
}

Object.defineProperties(CheckableInput, {
  displayName: {
    value: fragmentDisplayName
  }
});

export default CheckableInput;
