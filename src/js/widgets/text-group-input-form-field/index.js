import FormField from '../form-field';
import TextGroupInput from '../text-group-input';

/**
 * Fragment that represents form field with text group input.
 *
 * @extends {FormField}
 */
class TextGroupInputFormField extends FormField {}

Object.defineProperties(TextGroupInputFormField, {
  bemBase: {
    value: 'nw-textGroupInputFormField'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-group-input-form-field'
  },
  InputFragment: {
    value: TextGroupInput
  }
});

export default TextGroupInputFormField;
