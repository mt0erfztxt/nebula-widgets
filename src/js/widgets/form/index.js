import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';
import { Selector } from 'testcafe';

import Button from '../button';
import CheckableGroupInputFormField from '../checkable-group-input-form-field';
import TextGroupInputFormField from '../text-group-input-form-field';
import TextInputFormField from '../text-input-form-field';

const {
  Fragment,
  Options,
  utils
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['disabled', { antonym: 'enabled' }],
    ['fetched', { waitUntil: true }],
    ['invalid', { antonym: 'valid' }]
  ]
});

/**
 * Fragment that represents button.
 *
 * State parts:
 * * own:
 *   - disabled (antonym: enabled)
 *   - entityId
 *   - fetched (+waitUntil)
 *   - fields (writable)
 *   - invalid (antonym: valid)
 *
 * @extends {Fragment}
 */
class Form extends BaseClass {

  /**
   * BEM base for fragment's 'buttons' element.
   *
   * @returns {BemBase}
   */
  get buttonsElementBemBase() {
    if (!this._buttonsElementBemBase) {
      this._buttonsElementBemBase = this
        .cloneBemBase()
        .setElt('buttons');
    }

    return this._buttonsElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'buttons' element.
   *
   * @returns {Selector}
   */
  get buttonsElementSelector() {
    if (!this._buttonsElementSelector) {
      this._buttonsElementSelector = this
        .selector
        .find(`.${this.buttonsElementBemBase}`);
    }

    return this._buttonsElementSelector;
  }

  /**
   * BEM base for fragment's 'fields' element.
   *
   * @returns {BemBase}
   */
  get fieldsElementBemBase() {
    if (!this._fieldsElementBemBase) {
      this._fieldsElementBemBase = this
        .cloneBemBase()
        .setElt('fields');
    }

    return this._fieldsElementBemBase;
  }

  /**
   * TestCafe selector for fragment's 'fields' element.
   *
   * @returns {Selector}
   */
  get fieldsElementSelector() {
    if (!this._fieldsElementSelector) {
      this._fieldsElementSelector = this
        .selector
        .find(`.${this.fieldsElementBemBase}`);
    }

    return this._fieldsElementSelector;
  }

  /**
   * Class of button fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When button fragment class is not valid.
   */
  get ButtonFragment() {
    if (!this._ButtonFragment) {
      this._ButtonFragment = this.getSomethingFragment('Button', Form);
    }

    return this._ButtonFragment;
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
      .concat(['fields']);

    if (onlyWritable) {
      return writableParts;
    }
    else {
      return writableParts.concat([
        'disabled',
        'entityId',
        'fetched',
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
   * @name Form#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Form#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: EntityId (read-only)
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'EntityId' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options]
   * @returns {Promise<String|null>}
   */
  async getEntityIdPartOfState(options) {
    const value = await this.selector.getAttribute('data-entity-id');
    return (_.isNil(value) || utils.isBlankString(value)) ? null : value;
  }

  /**
   * Simply returns value of 'EntityId' part of fragment's state because it's
   * read only.
   *
   * @param {*} value Doesn't matter
   * @param {Options|Object} [options] Options, passed as-is to state part getter
   * @returns {Promise<String|null>}
   */
  async setEntityIdPartOfState(value, options) {
    return this.getEntityIdPartOfState(options);
  }

  /**
   * Asserts that 'EntityId' part of fragment's state is equal `value`.
   *
   * @param {*} value 'EntityId' part of fragment's state must be equal that value to pass assertion
   * @param {Options|Object} [options] Options
   * @param {Boolean} [options.isNot=false] When truthy, 'EntityId' part of state must not be equal specified value to pass assertion
   * @return {Promise<void>}
   */
  async expectEntityIdPartOfStateIs(value, options) {
    const { isNot } = new Options(options, {
      defaults: {
        isNot: false
      }
    });

    await this.expectExistsAndConformsRequirements({
      attributes: [
        ['data-entity-id', value, isNot]
      ]
    });
  }

  // ---------------------------------------------------------------------------
  // State :: Fetched (read-only, +waitUntil)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Form#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Form#expectIsFetched
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsNotFetched
   * @method
   * @returns {Promise<void>}
   */

  /**
   * Allows to wait until form's 'Fetched' part of state will become truthy.
   * It's just an alias for `Form#expectIsFetched`.
   *
   * @name Form#waitUntilFetched
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Fields
  // ---------------------------------------------------------------------------

  /**
   * Obtains 'Fields' part of fragment's state and returns it.
   *
   * @param {Options|Object} [options] Options
   * @returns {Promise<Object>}
   */
  async getFieldsPartOfState(options) {
    const state = {};

    if (!_.isEmpty(this.fields)) {
      const fieldNames = [];
      const fieldGetStatePromises = [];

      for (const k of _.keys(this.fields)) {
        fieldNames.push(k);
        fieldGetStatePromises.push(this.fields[k].getState(options));
      }

      const fieldStateList = await Promise.all(fieldGetStatePromises);
      const fieldStateListLength = fieldStateList.length;

      for (let i = 0; i < fieldStateListLength; i++) {
        state[fieldNames[i]] = fieldStateList[i];
      }
    }

    return state;
  }

  /**
   * Sets 'Fields' part of state to new `value`.
   *
   * @param {Object|undefined} [value] New value for 'Fields' part of fragment's state. Field-name/field-value hash of new values for form's fields. Form must be `init`ialized and have fields. Passing `undefined` means that state must stay intact
   * @param {Options|Object} [options] Options
   * @returns {Promise<Object>}
   * @throws {TypeError} When provided arguments aren't valid.
   */
  async setFieldsPartOfState(value, options) {
    const state = {};

    if (_.isUndefined(value) || _.isEmpty(this.fields)) {
      return state;
    }

    if (!_.isPlainObject(value)) {
      throw new TypeError(
        `${this.displayName}#setFieldsPartOfState(): 'value' argument must ` +
        `be a plain object but it is ${typeOf(value)} (${value})`
      );
    }

    // Note that state mustn't be set in parallel because some fragments, for
    // example `AutosuggestionTextInput` need multiple interactions with UI to
    // set part of state to new value.
    for (let k of _.keys(value)) {
      const field = this.fields[k];

      if (!field) {
        throw new TypeError(
          `${this.displayName}#setFieldsPartOfState(): Form doesn't have ` +
          `field named '${k}'`
        );
      }

      state[k] = await field.setState(value[k], options);
    }

    return state;
  }

  // ---------------------------------------------------------------------------
  // State :: Invalid (read-only, antonym: Valid)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Form#getInvalidPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Form#expectIsInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsNotInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsValid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Form#expectIsNotValid
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
   * @returns {Button}
   */
  getButton(locator, options) {
    return this.getSomething('Button', locator, options);
  }

  /**
   * Returns object, where each key is a field type and corresponding value is
   * a fragment class for that type of field.
   *
   * List of suported field types (name parens is a short alias (if any)):
   * - CheckableGroupInputFormField (CheckableGroupInput)
   * - TextGroupInputFormField (TextGroupInput)
   * - TextInputFormField (TextInput)
   *
   * @returns {Object}
   */
  getFieldTypes() {
    return {
      CheckableGroupInputFormField,
      CheckableGroupInput: CheckableGroupInputFormField,
      TextGroupInputFormField,
      TextGroupInput: TextGroupInputFormField,
      TextInputFormField,
      TextInput: TextInputFormField
    };
  }

  /**
   * Accepts config object and creates form buttons and form fields specified
   * in it, and then puts them on `buttons` and `fields` properties of
   * fragment. To re-initialize form call it with new `config`.
   *
   * @param {Object} [config] Config
   * @param {Object} [config.buttons] Each key is an attribute name for form button and value is an array of locator (required) and options (selector would be forcibly set to from's selector) for Button fragment. In case when no options provided value can be just a locator
   * @param {Object} [config.fields] Each key is an attribute name for form field and value is an array of: 1 - form field type (required), which is a name of one of supported form field types or a user-defined fragment class; 2 - locator used to create form field fragment (required); 3 - options used to create form field fragment (optional). For list of supported field types see {@link #getFieldTypes}
   */
  init(config) {
    this.buttons = {};
    this.fields = {};

    if (_.isNil(config)) {
      return;
    }

    if (!_.isPlainObject(config)) {
      throw new TypeError(
        `${this.displayName}#init(): 'config' argument must be a nil, ` +
        `or a plain object but it is ${typeOf(config)} (${config})`
      );
    }

    const { buttons, fields } = config || {};

    for (const k of _.keys(buttons)) {
      let locator = buttons[k];
      let options;

      if (Array.isArray(locator)) {
        [locator, options] = locator;
      }

      if (_.isNil(locator)) {
        throw new TypeError(
          `${this.displayName}#init(): 'config.buttons.${k}' locator ` +
          `must be a non-empty locator but it is ${typeOf(locator)} ` +
          `(${locator})`
        );
      }

      const opts = new Options(options);
      opts.parent = this.selector;

      this.buttons[k] = this.getButton(locator, opts);
    }

    for (const k of _.keys(fields)) {
      const [type, locator, options] = fields[k];
      const typeIsFunction = _.isFunction(type);

      if (!(typeIsFunction || _.isString(type))) {
        throw new TypeError(
          `${this.displayName}#init(): 'config.fields.${k}' type must ` +
          `be a string, or a function but it is ${typeOf(type)} (${type})`
        );
      }

      const FormFieldFragment = typeIsFunction ?
        type : this.getFieldTypes()[type];

      if (!_.isFunction(FormFieldFragment)) {
        throw new TypeError(
          `${this.displayName}#init(): 'config.fields.${k}'type must ` +
          `be a fragment class but it is ${typeOf(FormFieldFragment)} ` +
          `(${FormFieldFragment})`
        );
      }

      if (_.isNil(locator)) {
        throw new TypeError(
          `${this.displayName}#init(): 'config.fields.${k}' locator ` +
          `must be a non-empty locator but it is ${typeOf(locator)} ` +
          `(${locator})`
        );
      }

      const opts = new Options(options);
      opts.parent = this.selector;

      this.fields[k] = new FormFieldFragment(locator, opts);
    }
  }
}

Object.defineProperties(Form, {
  bemBase: {
    value: 'nw-form'
  },
  ButtonFragment: {
    value: Button
  },
  displayName: {
    value: 'nebula-widgets.widgets.form'
  }
});

export default Form;
