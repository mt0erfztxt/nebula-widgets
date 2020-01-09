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
    ['collapsed', { antonym: 'expanded' }],
    ['placement', { isBoolean: false }]
  ]
});

/**
 * Fragment that represents sidebar of application panel.
 *
 * State parts:
 * * own:
 *   - collapsed
 *   - placement (not boolean)
 */
class AppPanelSidebar extends BaseClass {

  /**
   * Provides custom transformations for selector:
   * 1. 'placement' - String, sidebar placement (currently widget supports left and right sidebars)
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

        if (['left', 'right'].includes(value)) {
          sel = sel.filter('.' + bemBase.setMod(['placement', value], {
            fresh: true
          }));
        }
        else {
          throw new TypeError(
            `${this.displayName}: value for 'placement' transformation must ` +
            `be a 'left|right' but it is ${typeOf(value)} (${value})`
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
      return writableParts.concat(['collapsed', 'placement']);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Collapsed (read-only, antonym: Expanded)
  // ---------------------------------------------------------------------------

  /**
   * @name AppPanelSidebar#getCollapsedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name AppPanelSidebar#expectIsCollapsed
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name AppPanelSidebar#expectIsNotCollapsed
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name AppPanelSidebar#expectIsExpanded
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name AppPanelSidebar#expectIsNotExpanded
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Placement (read-only, not boolean)
  // ---------------------------------------------------------------------------

  /**
   * @name AppPanelSidebar#getPlacementPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<*>}
   */

  /**
   * @name AppPanelSidebar#expectPlacementPartOfStateIs
   * @method
   * @param {*} value
   * @param {Options|Object} options
   * @returns {Promise<void>}
   */
}

Object.defineProperties(AppPanelSidebar, {
  bemBase: {
    value: 'nw-appPanel__sidebar'
  },
  displayName: {
    value: 'nebula-widgets.widgets.app-panel.sidebar'
  }
});

export default AppPanelSidebar;
