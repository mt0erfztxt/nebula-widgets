import TextInput from '../text-input';
import TextInputAction from '../text-input/action';

/**
 * Fragment that represents item (text input) of text group input. It has two
 * actions 'Insert' and 'Remove'.
 */
class TextGroupInputItem extends TextInput {

  /**
   * Clicks on 'Insert' action.
   * 
   * @returns {Promise<TextInputAction>} Clicked action fragment.
   */
  async clickInsertAction() {
    return this.clickAction({ cid: 'plus' });
  }

  /**
   * Clicks on 'Remove' action.
   * 
   * @returns {Promise<TextInputAction>} Clicked action fragment.
   */
  async clickRemoveAction() {
    return this.clickAction({ cid: 'trash' });
  }
}

export default TextGroupInputItem;
