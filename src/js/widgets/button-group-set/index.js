import _ from 'lodash';
import testFragment from 'nebula-test-fragment';
import { t } from 'testcafe';

import Button from '../button';
import ButtonGroup from '../button-group';

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
    ['disabled', { antonym: 'enabled' }]
  ]
});

/**
 * Display name of fragment.
 *
 * @type {String}
 */
const fragmentDisplayName = 'nebula-widgets.widgets.button-group-set';

/**
 * Fragment that represents button group set.
 * 
 * @extends {Fragment}
 */
class ButtonGroupSet extends BaseClass {

  /**
   * Creates fragment.
   *
   * @param {ButtonGroupSet|Object} [spec] When it's already instance of `ButtonGroupSet` it would be returned as-is otherwise it's same as extended fragment's constructor `spec` parameter
   * @param {Options|Object} [opts] Options, same as extended fragment's constructor `opts` parameter
   * @param {Object} [opts.ButtonFragmentOpts] Default `opts` for button fragment's constructor
   * @param {Object} [opts.ButtonFragmentSpec] Default `spec` for button fragment's constructor
   * @param {Object} [opts.ButtonGroupFragmentOpts] Default `opts` for button group fragment's constructor
   * @param {Object} [opts.ButtonGroupFragmentSpec] Default `spec` for button group fragment's constructor
   */
  constructor(spec, opts) {
    const {
      initializedOpts,
      initializedSpec,
      isInstance
    } = Fragment.initializeFragmentSpecAndOpts(spec, opts);

    if (isInstance === true) {
      return spec;
    }

    super(initializedSpec, initializedOpts);

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
      this._buttonFragment = this.getSomethingFragment('Button', ButtonGroupSet);
    }

    return this._buttonFragment;
  }

  /**
   * Class of button group fragment used in this fragment.
   *
   * @returns {class}
   * @throws {TypeError} When item fragment class is not valid.
   */
  get ButtonGroupFragment() {
    if (!this._buttonGroupFragment) {
      this._buttonGroupFragment = this.getSomethingFragment('ButtonGroup', ButtonGroupSet);
    }

    return this._buttonGroupFragment;
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
  // State :: Disabled (read-only, antonym: Enabled)
  // ---------------------------------------------------------------------------
  // Inherited from `BaseClass`
  // ---------------------------------------------------------------------------

  /**
   * @name ButtonGroupSet#getDisabledPartOfState
   * @method
   * @param {Options|Object} options
   * @returns {Promise<Boolean>}
   */

  /**
   * @name ButtonGroupSet#expectIsDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsNotDisabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsEnabled
   * @method
   * @returns {Promise<void>}
   */

  /**
   * @name ButtonGroupSet#expectIsNotEnabled
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
   * Returns button group fragment that matches `spec` and `opts`.
   *
   * @param {*} [spec] See `spec` parameter of button group fragment's class constructor
   * @param {*} [opts] See `opts` parameter of button group fragment's class constructor
   * @returns {Fragment}
   */
  getButtonGroup(spec, opts) {
    return this.getSomething(
      this.ButtonFragment,
      _.assign({}, this._opts.ButtonGroupFragmentSpec, { parent: this.selector }, spec),
      _.assign({}, this._opts.ButtonGroupFragmentOpts, opts)
    );
  }

  /**
   * Clicks on button.
   * 
   * @returns {Promise<void>}
   */
  async click() {
    await t.click(this.selector);
  }

  /**
   * Hovers on button.
   * 
   * @returns {Promise<void>}
   */
  async hover() {
    await t.hover(this.selector);
  }
}

Object.defineProperties(ButtonGroupSet, {
  bemBase: {
    value: 'nw-buttonGroupSet'
  },
  ButtonFragment: {
    value: Button
  },
  ButtonGroupFragment: {
    value: ButtonGroup
  },
  displayName: {
    value: fragmentDisplayName
  }
});

export default ButtonGroupSet;
