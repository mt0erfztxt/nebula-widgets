import CheckableGroupInput from '../checkable-group-input';
import FormField from '../form-field';

/**
 * Fragment that represents form field with checkable group input.
 *
 * @extends {FormField}
 */
class CheckableGroupInputFormField extends FormField {}

Object.defineProperties(CheckableGroupInputFormField, {
  bemBase: {
    value: 'nw-checkableGroupInputFormField'
  },
  displayName: {
    value: 'nebula-widgets.widgets.checkable-group-input-form-field'
  },
  InputFragment: {
    value: CheckableGroupInput
  }
});

export default CheckableGroupInputFormField;
