import testFragment from 'nebula-test-fragment';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Base class for fragment.
 *
 * @class
 * @extends {Fragment}
 */
const BaseClass = Fragment.makeFragmentClass(Fragment, {
  stateParts: [
    ['placement', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents toolbar of application panel.
 *
 * State parts:
 * * own:
 *   - placement (not boolean)
 */
class AppPanelToolbar extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'placement' - String, toolbar placement (currently widget supports top and bottom toolbars)
   *
   * @param {*} transformations
   * @param {*} sel
   * @param {*} bemBase
   */
  transformSelector(transformations, sel, bemBase) {
    sel = super.transformSelector(transformations, sel, bemBase);

    for (const k in transformations) {
      if (transformations.hasOwnProperty(k) && k === 'placement') {
        const value = transformations[k];

        if (['bottom', 'top'].includes(value)) {
          sel = sel.filter('.' + bemBase.setMod(['placement', value], {
            fresh: true
          }));
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'placement' transformation must ` +
            `be a 'bottom|top' but it is ${typeOf(value)} (${value})`
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
      return writableParts.concat(['placement']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Placement (read-only, not boolean)
  // ---------------------------------------------------------------------------

  /**
   * @name AppPanelToolbar#getPlacementPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name AppPanelToolbar#expectPlacementPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */
}

Object.defineProperties(AppPanelToolbar, {
  bemBase: {
    value: 'nw-appPanel-toolbar'
  },
  displayName: {
    value: 'nebula-widgets.widgets.app-panel.toolbar'
  }
});

export default AppPanelToolbar;
