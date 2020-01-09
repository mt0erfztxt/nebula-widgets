import testFragment from 'nebula-test-fragment';

const {
  Fragment,
  Options,
  selector,
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
    ['kind', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents button.
 *
 * State parts:
 * * own:
 *   - disabled (antonym: enabled)
 *   - kind (not boolean)
 *
 * @extends {Fragment}
 */
class Button extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'text' - String, button text
   *
   * @param {*} transformations
   * @param {*} sel
   * @param {*} bemBase
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (transformations.hasOwnProperty(k) && k === 'text') {
        const value = transformations[k];

        if (utils.isNonBlankString(value) || utils.isRegExp(value)) {
          sel = selector.filterByText(sel, value);
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'text' transformation must ` +
            `be a non-blank string or a regular expression but it is ` +
            `${typeOf(value)} (${value})`
          );
        }
      }
    }

    return sel;
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
      return writableParts.concat(['disabled', 'kind']);
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
  // State :: Kind (read-only, not boolean)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name Button#getKindPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name Button#expectKindPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */
}

Object.defineProperties(Button, {
  bemBase: {
    value: 'nw-button'
  },
  displayName: {
    value: 'nebula-widgets.widgets.button'
  }
});

export default Button;
