import TabBase from './tab-base';

/**
 * Fragment that represents head of tab group's tab.
 *
 * State parts:
 * * derived from TabBase:
 *   - active
 */
class TabHead extends TabBase {}

Object.defineProperties(TabHead, {
  bemBase: {
    value: 'nw-tabGroup__tabHead'
  },
  displayName: {
    value: 'nebula-widgets.widgets.tab-group.tab-head'
  }
});

export default TabHead;
