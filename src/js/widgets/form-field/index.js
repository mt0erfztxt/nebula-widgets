import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
  Fragment1,
  Options
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment1}
 */
const BaseClass = Fragment1.makeFragmentClass(Fragment1, {
  stateParts: [
    'disabled',
    'inline',
    'required'
  ]
});

/**
 * Fragment that represents form field.
 *
 * State parts:
 * * own:
 *   - disabled (antonym: enabled)
 *   - inline
 *   - input (writable)
 *   - required
 *
 * @extends {Fragment1}
 */
class FormField extends BaseClass {

  /**
   * BEM base for fragment's 'input' element.
   *
   * @returns {BemBase}
   */
  get inputElementBemBase() {
    if (!this._inputElementBemBase) {
      this._inputElementBemBase = this
        .cloneBemBase()
        .setElt('input');
    }

    return this._inputElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'input' element.
   *
   * @returns {Selector}
   */
  get inputElementSelector() {
    if (!this._inputElementSelector) {
      this._inputElementSelector = this
        .selector
        .find(`.${this.inputElementBemBase}`);
    }

    return this._inputElementSelector;
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

  /**
   * Class of input fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When input fragment class is not valid.
   */
  get InputFragment() {
    if (!this._InputFragment) {
      this._InputFragment = this.getSomethingFragment('Input', FormField);
    }

    return this._InputFragment;
  }

  /**
   * Input fragment used in this fragment.
   *
   * @returns {Fragment1}
   */
  get input() {
    if (!this._input) {
      this._input = new this.InputFragment(null, { parent: this.selector });
    }

    return this._input;
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

    const writableParts = super
      .getStateParts({ onlyWritable })
      .concat(['input']);

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat([
        'disabled',
        'inline',
        'required'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name FormField#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name FormField#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name FormField#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name FormField#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name FormField#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Inline (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name FormField#getInlinePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name FormField#expectIsInline
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name FormField#expectIsNotInline
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Input
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Input' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<Object|null>} Returns `null` when field has no input.
   */
  async getInputPartOfState(options) {
    if (this.input) {
      return this.input.getState(options);
    }
    else {
      return null;
    }
  }

  /**
   * Sets 'Input' part of fragment's state to new `value`.
   *
   * @param {Object} value New value for 'Input' part of fragment's state. Passing `undefined` is noop
   * @param {Options|Object} [options] Options
   * @returns {Promise<Object>} Fragment's 'Input' part of state.
   */
  async setInputPartOfState(value, options) {
    if (value === void 0) {
      return this.getInputPartOfState(options);
    }
    else if (this.input) {
      return this.input.setState(value, options);
    }
    else {
      return this.getState(options);
    }
  }

  /**
   * Asserts that 'Input' part of fragment's state equal specified 'value'.
   *
   * @param {Object} value 'Input' part of fragment's state must be equal that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy when truthy 'Input' part of fragment's state must be not equal that value to pass assertion
   * @return {Promise<void>}
   */
  async expectInputPartOfStateIs(value, options) {
    const { isNot } = new Options(options, {
      defaults: {
        isNot: false
      }
    });

    const assertionName = utils.buildTestCafeAssertionName('eql', { isNot });
    await t.expect(this.input)[assertionName](value);
  }

  // ---------------------------------------------------------------------------
  // State :: Required (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name FormField#getRequiredPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name FormField#expectIsRequired
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name FormField#expectIsNotRequired
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that form field's label equal or matches specified value. Accepts
   * same arguments as {@link Fragment1#expectTextIs} except that 'selector'
   * option forcibly set to fragment's label element selector.
   *
   * @returns {Promise<void>}
   */
  async expectLabelIs(text, options) {
    const opts = _
      .chain(new Options(options))
      .set('selector', this.labelElementSelector)
      .value();
    await this.expectTextIs(text, opts);
  }

  /**
   * Asserts that fragment's value is equal specified one.
   *
   * @param {*} value Fragment's value must be equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIs(value) {
    await this.input.expectValueIs(value);
  }

  /**
   * Asserts that fragment's value is not equal specified one.
   *
   * @param {*} value Fragment's value must be not equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIsNot(value) {
    await this.input.expectValueIsNot(value);
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Hovers on form field.
   *
   * @returns {Promise<void>}
   */
  async hover() {
    await t.hover(this.selector);
  }
}

Object.defineProperties(FormField, {
  bemBase: {
    value: 'nw-formField'
  },
  displayName: {
    value: 'nebula-widgets.widgets.form-field'
  },
  InputFragment: {
    value: null
  }
});

export default FormField;
