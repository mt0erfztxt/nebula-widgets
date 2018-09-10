import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

const {
  Fragment,
  Options
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.button';

/**
 * Fragment that represents button.
 */
class Button extends Fragment {

  /**
   * Creates fragment.
   *
   * @param {Button|Object} [spec] When it's already instance of `RadioGroupInputItem` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    return this;
  }

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Clicks on button.
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.selector);
  }
}

Object.defineProperties(Button, {
  bemBase: {
    value: 'nw-button'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default Button;
