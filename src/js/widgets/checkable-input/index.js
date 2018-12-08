import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';
import { t } from 'testcafe';

import Input from '../../fragments/group-input';

const {
  bem: { BemBase },
  Options,
  selector,
  utils
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Input}
 */
const BaseClass = Input.makeFragmentClass(Input, {
  stateParts: [
    'checked',
    'labelShrinked',
    ['selectionMode', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents checkable input.
 */
class CheckableInput extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'checked' - Boolean, whether input is checked or not
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
      return _.concat(writableParts, [
        'labelShrinked',
        'selectionMode'
      ]);
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
   * Sets 'Checked' part of state to boolean true or false.
   *
   * @param {Boolean} value New value for 'Checked' part of state
   * @param {Options|Object} [options] Options. Passed as-is to `#getCheckedPartOfState()` to get current value before setting new one
   * @return {Promise<Boolean>} Current value of 'Checked' part of fragment's state after set state operation is done.
   */
  async setCheckedPartOfState(value, options) {
    if (!_.isBoolean(value)) {
      throw new TypeError(
        `'${this.displayName}#setCheckedPartOfState():' 'value' argument ` +
        `must be a boolean but it is ${typeOf(value)} (${value})`
      );
    }

    const isChecked = await this.getCheckedPartOfState(options);

    if (isChecked !== value) {
      await this.click();
    }

    return value;
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
  // State :: LabelShrinked (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name CheckableInput#getLabelShrinkedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name CheckableInput#expectIsLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name CheckableInput#expectIsNotLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: SelectionMode (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name CheckableInput#getSelectionModePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name CheckableInput#expectSelectionModePartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
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
    const { isNot } = new Options(options, {
      defaults: {
        isNot: false
      }
    });
    const v = await this.getValuePartOfState(options);
    const assertionName = utils.buildTestCafeAssertionName('eql', { isNot });
    await t.expect(v)[assertionName](value);
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
  bemBase: {
    value: 'nw-checkableInput'
  },
  displayName: {
    value: 'nebula-widgets.widgets.checkable-input'
  }
});

export default CheckableInput;
