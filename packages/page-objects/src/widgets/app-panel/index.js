import testFragment from 'nebula-test-fragment';

import AppPanelSidebar from './sidebar';
import AppPanelToolbar from './toolbar';

const {
  Fragment
} = testFragment;

/**
 * Fragment that represents application panel.
 */
class AppPanel extends Fragment {

  /**
   * Class of sidebar fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When sidebar fragment class is not valid.
   */
  get SidebarFragment() {
    if (!this._SidebarFragment) {
      this._SidebarFragment = this.getSomethingFragment('Sidebar', AppPanel);
    }

    return this._SidebarFragment;
  }

  /**
   * Class of toolbar fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When toolbar fragment class is not valid.
   */
  get ToolbarFragment() {
    if (!this._ToolbarFragment) {
      this._ToolbarFragment = this.getSomethingFragment('Toolbar', AppPanel);
    }

    return this._ToolbarFragment;
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns sidebar fragment.
   *
   * @param {*} [locator] See `locator` parameter of sidebar fragment's class constructor
   * @param {*} [options] See `options` parameter of sidebar fragment's class constructor
   * @returns {AppPanelToolbar}
   */
  getSidebar(locator, options) {
    return this.getSomething('Sidebar', locator, options);
  }

  /**
   * Returns toolbar fragment.
   *
   * @param {*} [locator] See `locator` parameter of toolbar fragment's class constructor
   * @param {*} [options] See `options` parameter of toolbar fragment's class constructor
   * @returns {AppPanelToolbar}
   */
  getToolbar(locator, options) {
    return this.getSomething('Toolbar', locator, options);
  }
}

Object.defineProperties(AppPanel, {
  bemBase: {
    value: 'nw-appPanel'
  },
  displayName: {
    value: 'nebula-widgets.widgets.app-panel'
  },
  SidebarFragment: {
    value: AppPanelSidebar
  },
  ToolbarFragment: {
    value: AppPanelToolbar
  }
});

export default AppPanel;
