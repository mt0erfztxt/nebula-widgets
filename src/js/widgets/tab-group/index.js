import testFragment from 'nebula-test-fragment';

import Tab from './tab';
import TabGroupButton from './button';

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
    ['alignment', { isBoolean: false }],
    ['collapsed'],
    ['layout', { isBoolean: false }],
    ['sidebar'],
    ['sidebarPlacement', { isBoolean: false }],
    ['sidebarSize', { isBoolean: false }],
    ['size', { isBoolean: false }],
  ]
});

/**
 * Fragment that represents tab group.
 *
 * State parts:
 * * own:
 *   - alignment (not boolean)
 *   - collapsed
 *   - layout (not boolean)
 *   - sidebar
 *   - sidebarPlacement (not boolean)
 *   - sidebarSize (not boolean)
 *   - size (not boolean)
 */
class TabGroup extends BaseClass {

  /**
   * Class of button fragment used in this fragment.
   *
   * @returns {class}
   */
  get ButtonFragment() {
    if (!this._ButtonFragment) {
      this._ButtonFragment = this.getSomethingFragment('Button', TabGroup);
    }

    return this._ButtonFragment;
  }

  /**
   * Class of tab fragment used in this fragment.
   *
   * @returns {class}
   */
  get TabFragment() {
    if (!this._TabFragment) {
      this._TabFragment = this.getSomethingFragment('Tab', TabGroup);
    }

    return this._TabFragment;
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
      return writableParts.concat([
        'alignment',
        'collapsed',
        'layout',
        'sidebar',
        'sidebarPlacement',
        'sidebarSize',
        'size'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Alignment (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getAlignmentPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name TabGroup#expectAlignmentIs
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectAlignmentIsNot
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Collapsed (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getCollapsedPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name TabGroup#expectIsCollapsed
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectIsNotCollapsed
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Layout (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getLayoutPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name TabGroup#expectLayoutIs
   * @method
   * @param {String} layout
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectLayoutIsNot
   * @method
   * @param {String} layout
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Sidebar (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getSidebarPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name TabGroup#expectIsSidebar
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectIsNotSidebar
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: SidebarPlacement (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getSidebarPlacementPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name TabGroup#expectSidebarPlacementIs
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectSidebarPlacementIsNot
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: SidebarSize (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getSidebarSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name TabGroup#expectSidebarSizeIs
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectSidebarSizeIsNot
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Size (read-only)
  // ---------------------------------------------------------------------------

  /**
   * @name TabGroup#getSizePartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name TabGroup#expectSizeIs
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  /**
   * @name TabGroup#expectSizeIsNot
   * @method
   * @param {String} size
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  async expectActiveTabIs(locator, options) {
    const tab = this.getTab(locator, options);
    await tab.expectIsActive();
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns button fragment.
   *
   * @param {*} [locator] See `locator` parameter of button fragment's class constructor
   * @param {*} [options] See `options` parameter of button fragment's class constructor
   * @returns {TabGroupButton}
   */
  getButton(locator, options) {
    return this.getSomething('button', locator, options);
  }

  /**
   * Returns tab fragment.
   *
   * @param {*} [locator] See `locator` parameter of tab fragment's class constructor
   * @param {*} [options] See `options` parameter of tab fragment's class constructor
   * @returns {Tab}
   */
  getTab(locator, options) {
    return this.getSomething('tab', locator, options);
  }

  /**
   * Sets specified tab as active one.
   *
   * @returns {Promise<void>}
   */
  async setActiveTab(locator, options) {
    await this.getTab(locator, options).click();
  }
}

Object.defineProperties(TabGroup, {
  bemBase: {
    value: 'nw-tabGroup'
  },
  ButtonFragment: {
    value: TabGroupButton
  },
  TabFragment: {
    value: Tab
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group'
  }
});

export default TabGroup;
