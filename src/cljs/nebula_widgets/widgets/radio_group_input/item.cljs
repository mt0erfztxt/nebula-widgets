(ns nebula-widgets.widgets.radio-group-input.item
  (:require
    [nebula-widgets.widgets.group-input.item :as group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders item of radio group input. Accepts same props map as in group-input-item/widget but:
  * :bem - forcibly set to nw-radioGroupInput-item.
  * :widget - set to :icon by default."
  [{:keys [checked disabled on-change value widget] :as props}]
  [group-input-item/widget
   (assoc props :bem "nw-radioGroupInput-item", :widget (if (nil? widget) :icon widget))
   :input
   {:checked checked
    :on-change #(when (and on-change (not disabled)) (on-change % value))
    :type "radio"}])
