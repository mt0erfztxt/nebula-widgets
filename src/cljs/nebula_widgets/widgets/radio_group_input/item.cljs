(ns nebula-widgets.widgets.radio-group-input.item
  (:require
    [nebula-widgets.widgets.group-input.item :as group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders item of [radio-group-input](/widgets/radio-group-input) widget.

  Arguments:
  * `props` - optional, map. Same as in [group-input-item](/widgets/group-input-item) widget, plus:
    - `:bem` - forcibly set to 'nw-radioGroupInput-item'
    - `:on-change` - function, no default. Called when browser input's on-change fired, arguments:
      1. event - browser event
      2. value of `:value` prop
    - `:value` - any, no default. Items's value.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget
      looks."
  [{:keys [checked disabled on-change value widget] :as props}]
  [group-input-item/widget
   (assoc props
     :bem "nw-radioGroupInput-item"
     :widget (if (nil? widget) :icon widget))
   :input
   {:checked checked
    :on-change
    (fn [event]
      (when (and on-change (not disabled))
        (on-change event value)))
    :type "radio"}])
