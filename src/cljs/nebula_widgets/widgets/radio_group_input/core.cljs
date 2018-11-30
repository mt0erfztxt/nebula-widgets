(ns nebula-widgets.widgets.radio-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.radio-input.core :as radio-input]
    [reagent.core :as r]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of radio inputs.

  Arguments:
  * `props` - map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:items` - seq of maps, no default. Each map is a props for [radio-input](/widgets/radio-input) widget.
    - `:on-change` - function, no default. Called with item's value and browser event as arguments when item checked or
      unchecked.
    - `:value` - any, no default. Item, which have `:value` prop equal that value, would be checked."
  [{:keys [item-props items on-change value] :as props}]
  [group-input/widget
   (-> props
       (assoc
         :bem "nw-radioGroupInput"
         :item-widget radio-input/widget
         :items
         (for [{v :value :as item} items]
           (merge
             item-props
             item
             {:checked (= v value)
              :on-change (r/partial on-change v)})))
       (dissoc :item-props))])
