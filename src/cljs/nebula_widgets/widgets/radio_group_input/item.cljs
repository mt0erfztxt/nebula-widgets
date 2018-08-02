(ns nebula-widgets.widgets.radio-group-input.item
  (:require
    [nebula-widgets.widgets.group-input.item :as group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props is a map as in group-input-item/widget"
  [{:keys [checked cns disabled on-change value] :or {cns "radioGroupInput-item" on-change identity} :as props}]
  [group-input-item/widget (assoc props :cns cns) :input {:checked   checked
                                                          :on-change #(when-not disabled (on-change % value))
                                                          :type      "radio"}])
