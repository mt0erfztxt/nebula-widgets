import textGroupInput from '../text-group-input';
import FormField from '../form-field';

/**
 * Fragment that represents form field with text group input.
 *
 * @extends {FormField}
 */
class textGroupInputFormField extends FormField {}

Object.defineProperties(textGroupInputFormField, {
  bemBase: {
    value: 'nw-textGroupInputFormField'
  },
  displayName: {
    value: 'nebula-widgets.widgets.text-group-input-form-field'
  },
  InputFragment: {
    value: textGroupInput
  }
});

export default textGroupInputFormField;
