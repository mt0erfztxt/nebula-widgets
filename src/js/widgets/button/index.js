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
    ['disabled', { antonym: 'enabled' }],
    ['flat'],
    ['primary'],
    ['secondary']
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.button';

/**
 * Fragment that represents button.
 * 
 * @extends {Fragment}
 */
class Button extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {Button|Object} [spec] When it's already instance of `Button` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter plus it implements following `custom` specs - `text`
   * @param {String|RegExp} [spec.text] Button's text. Allows to find button with text equal or matches given value
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

    if (_.has(initializedSpec, 'text')) {
      this.selector = selector.filterByText(this.selector, initializedSpec.text);
    }

    return this;
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
        'flat',
        'primary',
        'secondary'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Button#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Button#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Flat (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Button#getFlatPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Button#expectIsFlat
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsNotFlat
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Primary (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Button#getPrimaryPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Button#expectIsPrimary
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsNotPrimary
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Secondary (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Button#getSecondaryPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name Button#expectIsSecondary
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name Button#expectIsNotSecondary
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Clicks on button.
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.selector);
  }
}

Object.defineProperties(Button, {
  bemBase: {
    value: 'nw-button'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default Button;
