(ns nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-group-input-form-field.core :as checkable-group-input-form-field]
    [re-frame.core :as rf]
    [reagent.core :as r]))

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
  (->> [:disabled :inline :label :multi-checkable :required :value :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(let [{value-setter :value multi-checkable-setter :multi-checkable} ie-setters]
  (defn- handle-on-change [multi-checkable value event]
    (let [checked (utils/event->checked event)]
      (value-setter
        (if multi-checkable
          #((if checked conj disj) % value)
          #(when checked value)))))

  (defn- handle-multi-checkable-prop-on-change [value _]
    (multi-checkable-setter value)
    (value-setter (if value #{1 4} 2))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [multi-checkable value] :as props} @*props]
        (into
          [ie/widget
           [:<>
            [checkable-group-input-form-field/widget
             (select-keys props [:disabled :inline :label :required])
             (-> props
                 (select-keys [:disabled :multi-checkable :value :widget])
                 (merge
                   {:columns 5
                    :inline true
                    :items
                    (for [n (range 1 10)]
                      {:label (str (if multi-checkable "option" "choice") n)
                       :value n})
                    :on-change (r/partial handle-on-change multi-checkable)
                    :value value}))]]]
          (for [params
                [[:- "form field props"]
                 :disabled
                 :inline
                 [:label
                  [{:label "string", :value "Field"}
                   {:label "tuple", :value ["Field" "auxiliary text"]}]]
                 :required
                 [:- "checkable group input props"]
                 :multi-checkable
                 [:widget (ie-cgi-knob/gen-items "button" "checkbox" "radio")]]
                :let [[cid label-or-items] (if (sequential? params) params [params])
                      label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (if (= :multi-checkable cid) handle-multi-checkable-prop-on-change (get ie-setters cid))
                :value (get props cid)}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

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
