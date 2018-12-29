(ns nebula-widgets.widgets.checkable-group-input-form-field.core
  (:require
    [nebula-widgets.widgets.checkable-group-input.core :as checkable-group-input]
    [nebula-widgets.widgets.form-field.core :as form-field]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field with checkable group input.

  Arguments:
  * `ff-props` - map. Same as in [form-field](/widgets/form-field) widget, plus:
    - `:bem` - forcibly set to 'nw-checkableGroupInputFormField'
  * `cgi-props` - map. Same as in [checkable-group-input](/widgets/checkable-group-input) widget.

  TODO:
  * update styles for better positioning of label, input and etc"
  [{:keys [disabled] :as ff-props} cgi-props]
  [form-field/widget (assoc ff-props :bem "nw-checkableGroupInputFormField")
   [checkable-group-input/widget (cond-> cgi-props disabled (assoc :disabled disabled))]])
