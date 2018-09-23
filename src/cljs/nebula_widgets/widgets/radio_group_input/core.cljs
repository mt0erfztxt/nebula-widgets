(ns nebula-widgets.widgets.radio-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.radio-group-input.item :as radio-group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of radio inputs.

  Arguments:
  * `props` - optional, map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:items` - seq of maps, no default. Group items, each map is a props for
      [radio-group-input-item](/widgets/radio-group-input-item) widget.
    - `:value` - any, no default.Item, which have :value prop equal that value, would be checked.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget looks."
  [{:keys [item-props items value] :as props}]
  (let [widget (-> props :widget keyword #{:button :icon :native} (or :icon))]
    (into [group-input/widget (assoc props :bem "nw-radioGroupInput")]
          (for [{v :value :as item} items]
            [radio-group-input-item/widget
             (merge item-props
                    item
                    {:checked (= v value)}
                    (select-keys props [:disabled])
                    {:widget widget})]))))
