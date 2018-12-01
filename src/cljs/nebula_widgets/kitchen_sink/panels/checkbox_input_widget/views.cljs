(ns nebula-widgets.kitchen-sink.panels.checkbox-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkbox-input.core :as checkbox-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:checked :disabled :invalid :label-shrinked :size :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- on-change-handler [event]
  ((:checked ie-setters) (utils/event->checked event)))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [label-shrinked] :as props} @*props]
        (into
          [ie/widget
           [:div {:style {:width (if label-shrinked 100 "100%")}}
            [checkbox-input/widget
             (merge
               props
               {:checked (get props :checked)
                :label {:shrinked label-shrinked, :text "Checkbox input label"}
                :on-change on-change-handler})]]]
          (for [[cid items]
                [[:checked]
                 [:disabled]
                 [:invalid]
                 [:label-shrinked]
                 [:size (for [s ["small" "normal" "large"]] {:label s, :value s})]
                 [:widget (for [s ["button" "icon" "native"]] {:label s, :value s})]]]
            [ie-rgi-knob/widget
             {:cid cid}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
                :value (get props cid)}
               items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.checkboxInputWidgetPanel
   [man-page/widget
    "# Checkbox input widget"
    (-> #'checkbox-input/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
