(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-item-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-item-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkbox-group-input.item :as checkbox-group-input-item]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:checked :disabled :invalid :label-shrinked :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %2])]))
       (into {})))

(defn- update-ie-checked [event _]
  ((:checked ie-setters) event (utils/event->checked event)))

(defn- interactive-example-cmp []
  (let [*item-props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [item-props @*item-props]
        (into
          [ie/widget
           [checkbox-group-input-item/widget
            (merge
              item-props
              {:checked (get item-props :checked)
               :label {:shrinked (get item-props :label-shrinked), :text "option1"}
               :on-change update-ie-checked})]]
          (for [[cid items]
                [[:checked]
                 [:disabled]
                 [:invalid]
                 [:label-shrinked]
                 [:widget (for [s ["button" "icon" "native"]] {:label s, :value s})]]]
            [ie-rgi-knob/widget
             {:cid cid}
             (cond->
               {:cid cid
                :item-props {:on-change (get ie-setters cid)}
                :value (get item-props cid)}
               items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.checkboxGroupInputItemWidgetPanel
   [man-page/widget
    "# Checkbox group input item widget"
    (-> #'checkbox-group-input-item/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
