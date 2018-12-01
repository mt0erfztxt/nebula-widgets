import _ from 'lodash';
import testFragment from 'nebula-test-fragment';

const {
  Fragment1
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.kitchen-sink.widgets.man-page.interactive-example';

/**
 * Fragment that represents man page's interactive example.
 */
class InteractiveExample extends Fragment1 {}

Object.defineProperties(InteractiveExample, {
  bemBase: {
    value: 'manPage-interactiveExample'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default InteractiveExample;
