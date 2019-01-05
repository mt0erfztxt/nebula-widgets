import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';

import Button from '../button';
import ButtonGroup from '../button-group';

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
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Fragment that represents button group set.
 *
 * @extends {Fragment1}
 */
class ButtonGroupSet extends BaseClass {

  /**
   * Returns initialized button fragments mapping.
   *
   * @returns {Object}
   */
  get buttons() {
    if (!this._buttons) {
      this._buttons = {};
    }

    return this._buttons;
  }

  /**
   * Returns initialized button group fragments mapping.
   *
   * @returns {Object}
   */
  get buttonGroups() {
    if (!this._buttonGroups) {
      this._buttonGroups = {};
    }

    return this._buttonGroups;
  }

  /**
   * Class of button fragment used in this fragment.
   *
   * @returns {class}
   */
  get ButtonFragment() {
    if (!this._buttonFragment) {
      this._buttonFragment = this
        .getSomethingFragment('Button', ButtonGroupSet);
    }

    return this._buttonFragment;
  }

  /**
   * Class of button group fragment used in this fragment.
   *
   * @returns {class}
   */
  get ButtonGroupFragment() {
    if (!this._buttonGroupFragment) {
      this._buttonGroupFragment = this
        .getSomethingFragment('ButtonGroup', ButtonGroupSet);
    }

    return this._buttonGroupFragment;
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
   * @name ButtonGroupSet#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ButtonGroupSet#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns button fragment.
   *
   * @param {*} [locator] See `locator` parameter of button fragment's class constructor
   * @param {*} [options] See `options` parameter of button fragment's class constructor
   * @returns {Fragment1}
   */
  getButton(locator, options) {
    return this.getSomething('Button', locator, options);
  }

  /**
   * Returns button group fragment.
   *
   * @param {*} [locator] See `locator` parameter of button group fragment's class constructor
   * @param {*} [options] See `options` parameter of button group fragment's class constructor
   * @returns {Fragment1}
   */
  getButtonGroup(locator, options) {
    return this.getSomething('ButtonGroup', locator, options);
  }

  /**
   * Accepts config object and creates button and button group fragments.
   *
   * @param {Object} [config] Config
   * @param {Object} [config.buttons] Object where each key is a name for button and value is an array of button fragment locator and options or just a button locator
   * @param {Object} [config.buttonGroups] Object where each key is a name for button group and value is an array of button group fragment locator and options or just a button group locator
   * @throws {TypeError} When `config` argument is not valid.
   * @example
   * ```js
   * {
   *   buttons: {
   *     myButton1: [{ // button locator }, { // button options }],
   *     myButton2: [{ // button locator }],
   *     myButton3:  { // button locator },
   *   },
   *   buttonGroups: {
   *     myButtonGroup1: [{ // button group locator }, { // button group options }],
   *     myButtonGroup2: [{ // button group locator }],
   *     myButtonGroup3:  { // button group locator },
   *   },
   * }
   * ```
   */
  init(config) {

    // (Re-)Initialize containers for buttons and button groups.
    this._buttons = {};
    this._buttonGroups = {};

    if (_.isNil(config)) {
      return;
    }

    if (!_.isPlainObject(config)) {
      throw new TypeError(
        `${this.displayName}.init(): 'config' argument must be a plain ` +
        `object but it is ${typeOf(config)} (${config})`
      );
    }

    const { buttons, buttonGroups } = config || {};

    if (buttons) {
      if (!_.isPlainObject(buttons)) {
        throw new TypeError(
          `${this.displayName}.init(): 'config.buttons' argument must be a ` +
          `plain object but it is ${typeOf(buttons)} (${buttons})`
        );
      }

      for (const k in buttons) {
        if (buttons.hasOwnProperty(k)) {
          let locator = buttons[k];
          let options;

          if (Array.isArray(locator)) {
            [locator, options] = locator;
          }

          this._buttons[k] = this.getButton(locator, options);
        }
      }
    }

    if (buttonGroups) {
      if (!_.isPlainObject(buttonGroups)) {
        throw new TypeError(
          `${this.displayName}.init(): 'config.buttonGroups' argument must ` +
          `be a plain object but it is ${typeOf(buttons)} (${buttons})`
        );
      }

      for (const k in buttonGroups) {
        if (buttonGroups.hasOwnProperty(k)) {
          let lacator = buttonGroups[k];
          let options;

          if (Array.isArray(lacator)) {
            [lacator, options] = lacator;
          }

          this._buttonGroups[k] = this.getButtonGroup(lacator, options);
        }
      }
    }
  }
}

Object.defineProperties(ButtonGroupSet, {
  bemBase: {
    value: 'nw-buttonGroupSet'
  },
  ButtonFragment: {
    value: Button
  },
  ButtonGroupFragment: {
    value: ButtonGroup
  },
  displayName: {
    value: 'nebula-widgets.widgets.button-group-set'
  }
});

export default ButtonGroupSet;
