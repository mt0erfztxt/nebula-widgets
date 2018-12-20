(ns nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-group-input-form-field.core :as checkable-group-input-form-field]
    [re-frame.core :as rf]))

(defn- base-props
  ([] (base-props nil nil nil))
  ([ff-props] (base-props ff-props nil nil))
  ([ff-props cgi-props] (base-props ff-props cgi-props nil))
  ([ff-props cgi-props n]
   (let [n (some #(when (number? %) %) [ff-props cgi-props n])]
     [(merge {:label "Field"} (if (number? ff-props) {} ff-props))
      (merge
        {:columns 5
         :inline true
         :items
         (for [n (range 1 (or n 10)) :let [label (str "choice" n)]]
           {:label label, :value n})
         :value 2}
        (if (number? cgi-props) {} cgi-props))])))

(defn- cgiff-cmp [& args]
  (into [checkable-group-input-form-field/widget] (apply base-props args)))

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
  (defn- handle-on-change [value event]
    (let [checked (utils/event->checked event)]
      (value-setter #((if checked conj disj) % value)))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [value] :as props} @*props]
        (into
          [ie/widget
           [:<>
            [checkable-group-input-form-field/widget
             (dissoc props :value)
             {:columns 5
              :inline true
              :items (for [n (range 1 10) :let [label (str "option" n)]] {:label label, :value n})
              :on-change handle-on-change
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
    "# Checkable group input form field widget"
    (-> #'checkable-group-input-form-field/widget meta :doc)
    "## Examples"
    [example/widget
     {:cid "010"
      :title "label placement using :inline prop"}
     [cgiff-cmp {:label "Stacked"} 11]
     [cgiff-cmp {:inline true, :label "Inline"} 11]
     "```clj
       [checkable-group-input-form-field/widget
        {:inline true, ...}
        ...]
       ```"]
    [example/widget
     {:cid "020"
      :title "composite label using :label prop"}
     [cgiff-cmp {:label ["Field" "auxiliary text"]}]
     "```clj
       [checkable-group-input-form-field/widget
        {:label [\"Field\" \"auxiliary text\"], ...}
        ...]
       ```"]
    [example/widget
     {:cid "030"
      :title "marking form field as required using :required prop"}
     [cgiff-cmp {:required true}]
     "```clj
       [checkable-group-input-form-field/widget
        {:required true, ...}
        ...]
       ```"]
    "## Interactive example"
    [interactive-example-cmp]]])
