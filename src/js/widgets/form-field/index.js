import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
  Fragment,
  Options,
  selector
} = testFragment;

/**
 * Base class for fragment.
 * 
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['inline'],
    ['required']
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.form-field';

/**
 * Fragment that represents form field.
 * 
 * @extends {Fragment}
 */
class FormField extends BaseClass {

  /**
   * Creates fragment.
   * 
   * @param {FormField|Object} [spec] When it's already instance of `FormField` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   */
  constructor(spec, opts) {
    const {
      initializedOpts,
      initializedSpec,
      isInstance
    } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  /**
   * BEM base for fragment's 'label' element.
   *
   * @returns {BemBase}
   */
  get labelElementBemBase() {
    if (!this._labelElementBemBase) {
      this._labelElementBemBase = this.cloneBemBase().setElt('label');
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
      this._labelElementSelector = this.selector.find(`.${this.labelElementBemBase}`);
    }

    return this._labelElementSelector;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, []);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, [
        'inline',
        'required'
      ]);
    }
  }

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

  // TODO Perhaps we need to user textContent instead of text here because of
  //      label can have auxiliary text (in child element).
  /**
   * Asserts that form field's label equal or matches specified value. Accepts
   * same arguments as {@link Fragment#expectTextIs} except that 'selector'
   * option forcibly set to fragment's label element selector.
   * 
   * @returns {Promise<void>}
   */
  async expectLabelIs(text, options) {
    const opts = new Options(options);
    opts.selector = this.labelElementSelector;
    await this.expectTextIs(text, opts);
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
    value: fragmentDisplayName
  }
});

export default FormField;
