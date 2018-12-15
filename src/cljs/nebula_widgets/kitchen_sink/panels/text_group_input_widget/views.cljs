(ns nebula-widgets.kitchen-sink.panels.text-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.text-group-input.core :as text-group-input]
    [re-frame.core :as rf]
    [reagent.core :as r]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:disabled :errors :invalid :no-row-gap :size :value]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(let [{value-setter :value} ie-setters]
  (defn- handle-on-change [{:keys [value]} _]
    (value-setter value)))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [value] :as props} @*props
            remove-allowed? (> (count value) 1)]
        (into
          [ie/widget
           [text-group-input/widget
            (assoc props
              :items (for [v value] {:remove-allowed remove-allowed?, :value v})
              :on-change (r/partial handle-on-change))]]
          (for [[cid items]
                [[:disabled]
                 [:errors (ie-cgi-knob/gen-items "no" ["yes" #{"error 1" "error 2"}])]
                 [:invalid]
                 [:no-row-gap]
                 [:size (ie-cgi-knob/gen-items "small" "normal" "large")]]]
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
  [:div.textGroupInputWidgetPanel
   [man-page/widget
    "# Text group input widget"
    (-> #'text-group-input/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
