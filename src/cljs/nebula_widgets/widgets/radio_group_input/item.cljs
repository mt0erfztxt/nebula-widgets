(ns nebula-widgets.widgets.radio-group-input.item
  (:require
    [nebula-widgets.widgets.group-input.item :as group-input-item]))

(defn widget
  "props is a map as in group-input-item/widget"
  [{:keys [cns disabled on-change value] :or {cns "radioGroupInput-item" on-change identity} :as props}]
  [group-input-item/widget props
   :input
   {:cns       cns
    :on-change #(when-not disabled (on-change % value))
    :type      "radio"}])
