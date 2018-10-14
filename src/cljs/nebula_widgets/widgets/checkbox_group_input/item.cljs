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
    - `:widget` - set to :icon by default"
  [{:keys [checked disabled on-change path value widget] :as props}]
  [group-input-item/widget
   (assoc props
     :bem "nw-checkboxGroupInput-item"
     :widget (if (nil? widget) :icon widget))
   :input
   {:checked checked
    :on-change
    (fn [event]
      (when (and on-change (not disabled))
        (on-change event (or path value))))
    :type "checkbox"}])
