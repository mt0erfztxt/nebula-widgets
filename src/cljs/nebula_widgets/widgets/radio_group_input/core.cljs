(ns nebula-widgets.widgets.radio-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.radio-group-input.item :as radio-group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of radio inputs. Accepts same props map as in group-input/widget plus following:
  * :items - seq of maps, no default. Group radios, each map is a props for radio-group-input-item widget.
  * :value - any, no default. Item, which have :value prop equal that value, would be checked."
  [{:keys [item-props items value] :as props}]
  (into [group-input/widget (assoc props :bem "nw-radioGroupInput")]
        (for [{v :value :as item} items]
          [radio-group-input-item/widget
           (merge item-props item {:checked (= v value)} (select-keys props [:disabled :widget]))])))
