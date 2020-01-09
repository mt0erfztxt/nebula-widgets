import testFragment from 'nebula-test-fragment';

const {
  bem: { BemBase },
  Fragment,
  Options,
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: ['active']
});

/**
 * Fragment used as a base for body and head fragments of tab group's tab.
 *
 * State parts:
 * * own:
 *   - active
 *
 * @extends {Fragment}
 */
class TabBase extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'active' - boolean, wether head is of an active tab or not
   *
   * @param {*} transformations
   * @param {*} sel
   * @param {BemBase} bemBase
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (transformations.hasOwnProperty(k) && k === 'active') {
        const active = transformations[k];

        if (active === false || active === true) {
          sel = sel.filter((node) => {
            return (active === node.classList.contains(className));
          }, {
            active,
            className: bemBase.setMod('active', { fresh: true }).toString()
          });
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'active' transformation must ` +
            `be a boolean but it is ${typeOf(active)} (${active})`
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
      return writableParts.concat(['active']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Active (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabBase#getActivePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name TabBase#expectIsActive
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabBase#expectIsNotActive
   * @method
   * @returns {Promise<void>}
   */

}

Object.defineProperties(TabBase, {
  bemBase: {
    value: null
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group.tab-base'
  }
});

export default TabBase;
