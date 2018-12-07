(ns nebula-widgets.kitchen-sink.panels.checkable-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkable-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-input.core :as checkable-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:checked :disabled :invalid :label-shrinked :selection-mode :size :widget]
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
            [checkable-input/widget
             (merge
               props
               {:checked (get props :checked)
                :label {:shrinked label-shrinked, :text "Checkable input label"}
                :on-change on-change-handler})]]]
          (for [[cid items]
                [[:checked]
                 [:disabled]
                 [:invalid]
                 [:label-shrinked]
                 [:selection-mode (for [s ["single" "multi"]] {:label s, :value s})]
                 [:size (for [s ["small" "normal" "large"]] {:label s, :value s})]
                 [:widget (for [s ["button" "icon"]] {:label s, :value s})]]]
            [ie-cgi-knob/widget
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
  [:div.checkableInputWidgetPanel
   [man-page/widget
    "# Checkable input widget"
    (-> #'checkable-input/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
