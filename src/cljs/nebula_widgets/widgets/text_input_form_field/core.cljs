(ns nebula-widgets.widgets.text-input-form-field.core
  (:require
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.text-input.core :as text-input]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field with text input.

  Arguments:
  * `ff-props` - map. Same as in [form-field](/nebula-widgets/widgets/form-field) widget, plus:
    - `:bem` - forcibly set to 'nw-textInputFormField'
  * `ti-props` - map. Same as in [text-input](/nebula-widgets/widgets/text-input) widget."
  [{:keys [disabled] :as ff-props} ti-props]
  [form-field/widget (assoc ff-props :bem "nw-textInputFormField")
   [text-input/widget (cond-> ti-props disabled (assoc :disabled disabled))]])
