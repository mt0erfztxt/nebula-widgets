import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { Selector, t } from 'testcafe';

const {
  bem: { BemBase },
  Fragment,
  Options,
  selector
} = testFragment;

/**
 * Base class for group input item fragment.
 * 
 * @class
 * @extends {Fragment}
 */
const GroupInputItemBaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['disabled', { antonym: 'enabled' }],
    ['invalid', { antonym: 'valid' }],
    ['labelShrinked'],
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
class GroupInputItem extends GroupInputItemBaseClass {

  /**
   * Creates fragment.
   *
   * @param {GroupInputItem|Object} [spec]  When it's already instance of `GroupInputItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter plus it implements following `custom` specs - `label`
   * @param {String|RegExp} [spec.label] Item's label. Allows to find item with label equal or matches given value
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
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
          .filterByText(sel.child(`.${labelElementBemBase}`), spec.label)
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
   * @name GroupInputItem#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInputItem#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Invalid (read-only, antonym: Valid)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInputItem#getInvalidPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInputItem#expectIsInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsNotInvalid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsValid
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsNotValid
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: LabelShrinked (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInputItem#getLabelShrinkedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInputItem#expectIsLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name GroupInputItem#expectIsNotLabelShrinked
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Widget (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name GroupInputItem#getWidgetPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name GroupInputItem#expectWidgetPartOfStateIs
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

  /**
   * Hovers on item.
   * 
   * @param {Options|Object} [options] Options
   * @param {Number} [options.wait] Wait specified number of milliseconds after hover is done
   * @returns {Promise<void>}
   */
  async hover(options) {
    const { wait } = new Options(options);

    await t.hover(this.selector);

    if (wait) {
      await t.wait(wait);
    }
  }
}

Object.defineProperties(GroupInputItem, {
  bemBase: {
    value: 'nw-groupInput-item'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default GroupInputItem;
