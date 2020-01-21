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
  (->> [:checked :disabled :invalid :label-shrinked :size :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(let [{checked-setter :checked} ie-setters]
  (defn- handle-on-change [event]
    (checked-setter (utils/event->checked event))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [label-shrinked] :as props} @*props]
        (into
          [ie/widget
           [:div {:style {:width (str "100" (if label-shrinked "px" "%"))}}
            [checkable-input/widget
             (merge
               props
               {:checked (get props :checked)
                :label {:shrinked label-shrinked, :text "Checkable input label"}
                :on-change handle-on-change})]]]
          (for [[cid items]
                [[:checked]
                 [:disabled]
                 [:invalid]
                 [:label-shrinked]
                 [:size (ie-cgi-knob/gen-items "small" "normal" "large")]
                 [:widget (ie-cgi-knob/gen-items "button" "checkbox" "radio")]]]
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
