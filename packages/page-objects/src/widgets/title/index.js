import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import typeOf from 'typeof--';

const {
  Fragment,
  Options,
  selector
} = testFragment;

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.title';

/**
 * Fragment that represents title.
 */
class Title extends Fragment {

  /**
   * Creates fragment.
   *
   * @param {Title|Object} [spec] When it's already instance of `Title` it would be returned as-is, otherwise it's same as extended fragment's constructor `spec` parameter plus it implements following `custom` specs - `text`
   * @param {String|RegExp} [spec.text] Title's text. Allows to find title with text equal or matches given value
   * @param {Options|Object} [opts] Options. Same as in extended fragment's constructor
   */
  constructor(spec, opts) {
    const { initializedOpts, initializedSpec, isInstance } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    const { text } = spec;

    if (!(_.isNil(text) || _.isString(text) || _.isRegExp(text))) {
      throw new TypeError(
        `'${Title.displayName}.constructor()': 'spec.text' argument must be a nil, a string or ` +
        `a regular expression but it is ${typeOf(text)} (${text})`
      );
    }

    if (!_.isNil(text)) {
      initializedSpec.custom = function(sel, spec) {
        return selector.filterByText(sel, spec.text);
      };
    }

    super(initializedSpec, initializedOpts);

    return this;
  }
}

Object.defineProperties(Title, {
  bemBase: {
    value: 'nw-title'
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default Title;
