import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

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
    ['disabled', { antonym: 'enabled' }],
    ['invalid', { antonym: 'valid' }],
    ['size', { isBoolean: false }],
    ['widget', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents input.
 */
class Input extends BaseClass {

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
      'value'
    ]);

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return _.concat(writableParts, [
        'disabled',
        'invalid',
        'size',
        'widget'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Input#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Input#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Invalid (read-only, antonym: Valid)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Input#getInvalidPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Input#expectIsInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsNotInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsValid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Input#expectIsNotValid
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Size (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Input#getSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Input#expectSizePartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Value
  // ---------------------------------------------------------------------------
  // Implementation differs for concrete input fragments and so can not be
  // provided here
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<*>}
   */
  async getValuePartOfState(options) {
    throw new Error(
      `'${this.displayName}#getValuePartOfState()' not implemented`
    );
  }

  /**
   * Sets 'Value' part of fragment's state and returns it.
   *
   * @param {*} value New value for 'Value' part of fragment's state
   * @param {Options|Object} [options] Options
   * @return {Promise<*>} Current value of 'Value' part of fragment's state after set state operation is done.
   */
  async setValuePartOfState(value, options) {
    throw new Error(
      `'${this.displayName}#setValuePartOfState()' not implemented`
    );
  }

  /**
   * Asserts that 'Value' part of fragment's state is equal specified value.
   *
   * @param {*} value Part of state must match that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy assertion would be inverted
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    throw new Error(
      `'${this.displayName}.expectValuePartOfStateIs()' not implemented`
    );
  }

  // ---------------------------------------------------------------------------
  // State :: Widget (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Input#getWidgetPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Input#expectWidgetPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /**
   * Asserts that fragment has value.
   *
   * @returns {Promise<void>}
   */
  async expectHasValue() {
    throw new Error(
      `'${this.displayName}.expectHasValue()' not implemented`
    );
  }

  /**
   * Asserts that fragment has no value.
   *
   * @returns {Promise<void>}
   */
  async expectHasNoValue() {
    throw new Error(
      `'${this.displayName}.expectHasNoValue()' not implemented`
    );
  }

  /**
   * Asserts that fragment's value is equal specified one.
   *
   * @param {*} value Fragment's value must be equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIs(value) {
    throw new Error(
      `'${this.displayName}.expectValueIs()' not implemented`
    );
  }

  /**
   * Asserts that fragment's value is not equal specified one.
   *
   * @param {*} value Fragment's value must be not equal specified one to pass assertion
   * @returns {Promise<void>}
   */
  async expectValueIsNot(value) {
    throw new Error(
      `'${this.displayName}#expectValueIsNot()' not implemented`
    );
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Shortcut for {@link Input#getValuePartOfState}.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<*>} Value of input.
   */
  async getValue(options) {
    return this.getValuePartOfState(options);
  }

  /**
   * Shortcut for {@link Input#setValuePartOfState}.
   *
   * @param {*} value New value for input
   * @param {Options|Object} [options] Options
   * @returns {Promise<*>} New value of input.
   */
  async setValue(value, options) {
    return this.setValuePartOfState(value, options);
  }
}

Object.defineProperties(Input, {
  displayName: {
    value: 'nebula-widgets.widgets.input'
  }
});

export default Input;
