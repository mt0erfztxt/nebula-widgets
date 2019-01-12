import FormField from '../form-field';
import TextInput from '../text-input';

/**
 * Fragment that represents form field with text input.
 *
 * @extends {FormField}
 */
class TextInputFormField extends FormField {}

Object.defineProperties(TextInputFormField, {
  bemBase: {
    value: 'nw-textInputFormField'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-input-form-field'
  },
  InputFragment: {
    value: TextInput
  }
});

export default TextInputFormField;
