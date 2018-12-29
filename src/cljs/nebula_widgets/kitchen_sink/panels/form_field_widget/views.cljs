(ns nebula-widgets.kitchen-sink.panels.form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [re-frame.core :as rf]))

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
  (defn- handle-input-on-change [event]
    (value-setter (utils/event->value event))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [disabled value] :as props} @*props]
        (into
          [ie/widget
           [form-field/widget (dissoc props :value)
            [text-input/widget
             {:disabled disabled
              :on-change handle-input-on-change
              :value value}]]]
          (for [[cid items]
                [[:disabled]
                 [:inline]
                 [:label
                  [{:label "string", :value "Field"}
                   {:label "tuple", :value ["Field" "auxiliary text"]}]]
                 [:required]]]
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
  [:div.formFieldWidgetPanel
   [man-page/widget
    "# Form field widget"
    (-> #'form-field/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
