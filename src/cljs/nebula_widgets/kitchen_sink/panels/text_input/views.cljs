(ns nebula-widgets.kitchen-sink.panels.text-input.views
  (:require
    [nebula-widgets.widgets.text-input :as text-input]
    [re-frame.core :as rf]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let [value-atom (rf/subscribe [:text-input-panel/value])]
    (fn []
      [:div.textInputPanel
       [text-input/widget
        {:busy? true
         :on-change #(rf/dispatch [:text-input-panel/set-value (-> % .-target .-value)])
         :value @value-atom}]])))
