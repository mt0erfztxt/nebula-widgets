import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

import Button from '../button';

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
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.button-group';

/**
 * Fragment that represents button group.
 * 
 * @extends {Fragment}
 */
class ButtonGroup extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {ButtonGroup|Object} [spec] When it's already instance of `ButtonGroup` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter plus it implements following custom specs - 'alignment'
   * @param {String} [spec.alignment] Button group's alignment. Allows to find button group by its alignment
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   * @param {Object} [opts.ButtonFragmentOpts] Default `opts` for button fragment's constructor
   * @param {Object} [opts.ButtonFragmentSpec] Default `spec` for button fragment's constructor
   */
  constructor(spec, opts) {
    const {
      initializedOpts,
      initializedSpec,
      initializedSpec: { alignment },
      isInstance
    } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

    if (alignment) {
      const className = this
        .cloneBemBase()
        .setMod(['alignment', alignment]);

      this.selector = this.selector.filter(`.${className}`);
    }

    return this;
  }

  /**
   * Class of button fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When item fragment class is not valid.
   */
  get ButtonFragment() {
    if (!this._buttonFragment) {
      this._buttonFragment = this.getSomethingFragment('Button', ButtonGroup);
    }

    return this._buttonFragment;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  getStateParts(onlyWritable = false) {
    const parentParts = super.getStateParts(onlyWritable);
    const parts = _.concat(parentParts, []);

    if (onlyWritable) {
      return parts;
    }
    else {
      return _.concat(parts, [
        'alignment',
        'disabled'
      ]);
    }
  }

  // ---------------------------------------------------------------------------
  // State :: Alignment (read-only)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name ButtonGroup#getAlignmentPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<String>}
   */

  /**
   * @name ButtonGroup#expectAlignmentIs
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectAlignmentIsNot
   * @method
   * @param {String} alignment
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name ButtonGroup#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ButtonGroup#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroup#expectIsNotEnabled
   * @method
   * @returns {Promise<void>}
   */

  // ---------------------------------------------------------------------------
  // Other Methods
  // ---------------------------------------------------------------------------

  /**
   * Returns button fragment that matches `spec` and `opts`.
   *
   * @param {*} [spec] See `spec` parameter of button fragment's class constructor
   * @param {*} [opts] See `opts` parameter of button fragment's class constructor
   * @returns {Fragment}
   */
  getButton(spec, opts) {
    return this.getSomething(
      this.ButtonFragment,
      _.assign({}, this._opts.ButtonFragmentSpec, { parent: this.selector }, spec),
      _.assign({}, this._opts.ButtonFragmentOpts, opts)
    );
  }

  /**
   * Hovers on button group.
   * 
   * @returns {Promise<void>}
   */
  async hover() {
    await t.hover(this.selector);
  }
}

Object.defineProperties(ButtonGroup, {
  bemBase: {
    value: 'nw-buttonGroup'
  },
  ButtonFragment: {
    value: Button
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default ButtonGroup;
