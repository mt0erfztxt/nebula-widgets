import TabBase from './tab-base';

/**
 * Fragment that represents body of tab group's tab.
 *
 * State parts:
 * * derived from TabBase:
 *   - active
 */
class TabBody extends TabBase {}

Object.defineProperties(TabBody, {
  bemBase: {
    value: 'nw-tabGroup__tabBody'
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group.tab-body'
  }
});

export default TabBody;
