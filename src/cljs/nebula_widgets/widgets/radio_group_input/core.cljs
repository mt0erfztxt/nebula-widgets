(ns nebula-widgets.widgets.radio-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.radio-group-input.item :as radio-group-input-item]))

(defn widget
  "props is a map as in group-input/widget plus:
    :items - optional, seq of maps, no default, group's radios, each map is a props for radio-group-input-item widget
    :value - optional, any, no default, item which :value prop matches that value would be checked"
  [{:keys [cns disabled items value widget] :or {cns "radioGroupInput" widget "icon"} :as props}]
  (into [group-input/widget (assoc props :cns cns)]
        (for [{v :value :as item} items]
          [radio-group-input-item/widget
           (-> props :item-props (merge item {:checked (= v value) :disabled disabled :widget widget}))])))
