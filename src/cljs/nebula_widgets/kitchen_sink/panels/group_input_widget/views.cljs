(ns nebula-widgets.kitchen-sink.panels.group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-group-input.core :as checkable-group-input]
    [nebula-widgets.widgets.group-input.core :as group-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:columns :disabled :equidistant :errors :inline :invalid :no-row-gap :size :soft-columns :stacked-on-mobile
        :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- item-widget [{:keys [value]}]
  [:div.nw-groupInputItem value])

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [props @*props]
        (into
          [ie/widget
           [group-input/widget
            (assoc props
              :item-widget item-widget
              :items
              (for [n (range 1 10) :let [label (str "item" n)]]
                {:value (keyword label)}))]]
          (for [[cid items]
                [[:columns (for [v [nil 3 5]] {:label (if (nil? v) "nil" v), :value v})]
                 [:disabled]
                 [:equidistant]
                 [:errors (ie-cgi-knob/gen-items "no" ["yes" #{"error 1" "error 2"}])]
                 [:inline]
                 [:invalid]
                 [:no-row-gap]
                 [:size (ie-cgi-knob/gen-items "small" "normal" "large")]
                 [:soft-columns]
                 [:stacked-on-mobile]
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
  [man-page/widget
   "# Group input widget"
   (-> #'group-input/widget meta :doc)
   "## Interactive example"
   [interactive-example-cmp]])
