import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Base class for input fragment.
 * 
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['disabled', { antonym: 'enabled' }],
    ['invalid', { antonym: 'valid' }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.input';

/**
 * Fragment that represents input.
 */
class Input extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {Input|Object} [spec] - When it's already instance of `Input` it would be returned as-is otherwise it's same as `Fragment` constructor `spec` parameter
   * @param {Options|Object} [opts] - Options. Same as in `Fragment`
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, [
      'value'
    ]);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, [
        'disabled',
        'invalid'
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
  // State :: Value
  // ---------------------------------------------------------------------------
  // Implementation differs for concrete input fragments and so can not be
  // provided here
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Value' part of fragment's state and returns it.
   * 
   * @param {Options|Object} [options] - Options
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
   * @param {*} value - New value for 'Value' part of fragment's state
   * @param {Options|Object} [options] - Options
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
   * @param {*} value - Part of state must match that value to pass assertion
   * @param {Options|Object} [options] - Options
   * @param {Boolean} [options.isNot=false] - When truthy assertion would be inverted
   * @return {Promise<void>}
   */
  async expectValuePartOfStateIs(value, options) {
    throw new Error(
      `'${this.displayName}.expectValuePartOfStateIs()' not implemented`
    );
  }

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
   * @param {*} value - Fragment's value must be equal specified one to pass assertion
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
   * @param {*} value - Fragment's value must be not equal specified one to pass assertion
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
   * Just a convenience alias for `getValuePartOfState` method.
   *
   * @param {Options|Object} [options] - Options
   * @returns {Promise<*>} Value of input.
   */
  async getValue(options) {
    return this.getValuePartOfState(options);
  }

  /**
   * Just a convenience alias for `setValuePartOfState` method.
   *
   * @param {*} value - New value for input
   * @param {Options|Object} [options] - Options
   * @returns {Promise<*>} New value of input.
   */
  async setValue(value, options) {
    return this.setValuePartOfState(value, options);
  }
}

Object.defineProperties(Input, {
  displayName: {
    value: fragmentDisplayName
  }
});

export default Input;
