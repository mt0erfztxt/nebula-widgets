(ns nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.text-group-input-form-field.core :as text-group-input-form-field]
    [re-frame.core :as rf]
    [reagent.core :as r]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:disabled :inline :label :required :value]
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
           [:<>
            [text-group-input-form-field/widget
             (select-keys props [:disabled :inline :label :required])
             (-> props
                 (select-keys [:disabled :value])
                 (assoc
                   :items (for [v value] {:remove-allowed remove-allowed?, :value v})
                   :on-change (r/partial handle-on-change)))]]]
          (for [params
                [[:- "form field props"]
                 :disabled
                 :inline
                 [:label
                  [{:label "string", :value "Field"}
                   {:label "tuple", :value ["Field" "auxiliary text"]}]]
                 :required]
                :let [[cid label-or-items] (if (sequential? params) params [params])
                      label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
                :value (get props cid)}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.formFieldWidgetPanel
   [man-page/widget
    "# Text group input form field widget"
    (-> #'text-group-input-form-field/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
