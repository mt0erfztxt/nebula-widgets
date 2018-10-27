(ns nebula-widgets.widgets.checkbox-group-input.item
  (:require
    [nebula-widgets.widgets.group-input.item :as group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders item of [checkbox-group-input](/widgets/checkbox-group-input) widget.

  Arguments:
  * `props` - optional, map. Same as in [group-input-item](/widgets/group-input-item) widget, plus:
    - `:bem` - forcibly set to 'nw-checkboxGroupInput-item'
    - `:on-change` - function, no default. Called when browser input's on-change fired, arguments:
      1. event - browser event
      2. value of `:path` prop when it's logical true or value of `:value` prop otherwise
    - `:path` - keyword, no default. Used when [group-input-item](/widgets/group-input-item) holds value in map
    - `:value` - any, no default. Used when [group-input-item](/widgets/group-input-item) holds value in set
    - `:widget` - same as in [checkbox-group-input](/widgets/checkbox-group-input)"
  [{:keys [checked disabled on-change path value widget] :as props}]
  [group-input-item/widget
   (assoc props
     :bem "nw-checkboxGroupInput-item"
     :widget (if (nil? widget) :icon widget))
   :input
   {:checked (boolean checked)
    :on-change
    (fn [event]
      (when (and on-change (not disabled))
        (on-change event (or path value))))
    :type "checkbox"}])
