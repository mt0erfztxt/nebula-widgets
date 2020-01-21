import TabBody from './tab-body';
import TabHead from './tab-head';

/**
 * Fragment that represents tab group's tab. Because tab's body and head aren't
 * siblings and doesn't share same parent `TabHead` used.
 *
 * State parts:
 * * derived from TabHead:
 *   - active
 */
class Tab extends TabHead {

  /**
   * Class of body fragment used in this fragment.
   *
   * @returns {TabBody}
   */
  get BodyFragment() {
    if (!this._BodyFragment) {
      this._BodyFragment = this.getSomethingFragment('Body', Tab);
    }

    return this._BodyFragment;
  }

  get body() {
    if (this._body) {
      return this._body;
    }
    else {
      throw new Error(
        `${this.displayName}.body(): Tab's body not initialized yet, call ` +
        `'getBody' first`
      );
    }
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns tab's body fragment.
   *
   * @returns {Promise<TabBody>}
   */
  async getBody() {
    if (!this._body) {
      const cid = await this.getCidPartOfState();
      const parent = this.selector.parent(0);
      this._body = new this.BodyFragment({ cid }, { parent });
    }

    return this._body;
  }
}

Object.defineProperties(Tab, {
  bemBase: {
    value: 'nw-tabGroup__tabHead'
  },
  BodyFragment: {
    value: TabBody
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group.tab'
  }
});

export default Tab;
