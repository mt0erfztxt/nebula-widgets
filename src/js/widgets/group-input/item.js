import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { Selector } from 'testcafe';

const {
  bem: { BemBase },
  Fragment,
  Options,
  selector
} = testFragment;

/**
 * Base class for group input item fragment.
 * 
 * @type {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['disabled', { antonym: 'enabled' }],
    ['invalid', { antonym: 'valid' }],
    ['widget', { isBoolean: false }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.group-input.item';

/**
 * Fragment that represents group input item.
 */
class Item extends BaseClass {

  // TODO: Copy implementation of spec.label somewhere as reference implementation of custom spec. Remove it because no more errors in group input item.
  /**
   * Creates fragment.
   *
   * @param {Item|Object} [spec] - When it's already instance of `Item` it would be returned as-is otherwise it's same as `Fragment` constructor `spec` parameter plus it implements following `custom` specs - `label`
   * @param {String|RegExp} [spec.label] - Error's label. Allows to find item with error text equal or matches given value
   * @param {Options|Object} [opts] - Options. Same as in `Fragment`
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    if (!_.isEmpty(initializedSpec.label)) {
      initializedSpec.custom = function(sel, spec, opts) {
        const { bemBase } = opts;
        const labelElementBemBase = bemBase.setElt('label', { fresh: true });

        return selector
          .filterSelectorByText(sel.child(`.${labelElementBemBase}`), spec.label)
          .parent(`.${bemBase}`)
          .nth(0);
      };
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  /**
   * BEM base for fragment's 'input' element.
   *
   * @returns {BemBase}
   */
  get inputElementBemBase() {
    if (!this._inputElementBemBase) {
      this._inputElementBemBase = this.cloneBemBase().setElt('input');
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
      this._inputElementSelector = this.selector.find(`.${this.inputElementBemBase}`);
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
        'disabled',
        'invalid',
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
   * @name Item#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Item#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Invalid (read-only, antonym: Valid)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Item#getInvalidPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Item#expectIsInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsNotInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsValid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Item#expectIsNotValid
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Widget (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Item#getWidgetPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Item#expectWidgetPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------
}

Object.defineProperties(Item, {
  bemBase: {
    value: 'nw-groupInput-item'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default Item;
