(ns nebula-widgets.widgets.text-group-input-form-field.core
  (:require
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.text-group-input.core :as text-group-input]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field with text group input.

  Arguments:
  * `ff-props` - map. Same as in [form-field](/widgets/form-field) widget, plus:
    - `:bem` - forcibly set to 'nw-textGroupInputFormField'
  * `tgi-props` - map. Same as in [text-group-input](/widgets/text-group-input) widget.

  TODO:
  * update styles for better positioning of label, input and etc"
  [{:keys [disabled] :as ff-props} tgi-props]
  [form-field/widget (assoc ff-props :bem "nw-textGroupInputFormField")
   [text-group-input/widget (cond-> tgi-props disabled (assoc :disabled disabled))]])
