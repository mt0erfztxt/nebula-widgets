(ns nebula-widgets.kitchen-sink.panels.form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.radio-group-input.core :as rgi]
    [re-frame.core :as rf]))

(defn- base-form-field [ff-props rgi-props n]
  (let [n (some #(when (number? %) %) [ff-props rgi-props n])
        ff-props (if (number? ff-props) {} ff-props)
        rgi-props (if (number? rgi-props) {} rgi-props)]
    [form-field/widget (merge {:label "Field"} ff-props)
     [rgi/widget
      (merge
        {:columns 5
         :inline true
         :items
         (for [n (range 1 (or n 10)) :let [label (str "choice" n)]]
           {:label label, :value n})
         :value 2}
        rgi-props)]]))

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:inline :label :required]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %2])]))
       (into {})))

(defn- interactive-example-cmp []
  (let [*ff-props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [ff-props @*ff-props]
        (into
          [ie/widget
           [:<>
            [form-field/widget ff-props
             [rgi/widget
              {:columns 5
               :inline true
               :items (for [n (range 1 10) :let [label (str "choice" n)]] {:label label, :value n})
               :value 1}]]
            [form-field/widget
             {:inline (:inline ff-props)
              :label "Other field"}
             [rgi/widget
              {:columns 5
               :disabled true
               :inline true
               :items (for [n (range 1 10) :let [label (str "choice" n)]] {:label label, :value n})
               :value 2}]]]]
          (for [[cid items]
                [[:inline]
                 [:label
                  [{:label "string", :value "Field"}
                   {:label "tuple", :value ["Field" "auxiliary text"]}]]
                 [:required]]]
            [ie-rgi-knob/widget
             {:cid cid}
             (cond-> {:item-props {:on-change (get ie-setters cid)}, :value (get ff-props cid)}
                     items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.formFieldWidgetPanel
   [man-page/widget
    "# Form field widget"
    (-> #'form-field/widget meta :doc)
    "## Examples"
    [example/widget
     {:cid "010"
      :title "toggling placement of label and input using :inline prop"}
     [:<>
      [base-form-field {:label "Stacked"} 11]
      [base-form-field {:label "Stacked (more text)"} 11]]
     [:hr.formFieldWidgetPanel-inExampleDivider]
     [:<>
      [base-form-field {:inline true, :label "Inline"} 3]
      [base-form-field {:inline true, :label "Inline (more text)"} 12]]
     "```clj
       [form-field/widget {:inline true, ...}
        [radio-group-input/widget ...]]
       ```"]
    [example/widget
     {:cid "020"
      :title "setting form field's label using :label prop"}
     [:<>
      [base-form-field {:label "Field"}]
      [base-form-field {:label ["Field" "auxiliary text"]}]]
     "```clj
       [form-field/widget
        {:label \"Field\"}   ; [\"Field\" \"auxiliary text\"]
        [radio-group-input/widget ...]]
       ```"]
    [example/widget
     {:cid "030"
      :title "marking form field as required using :required prop"}
     [base-form-field {:required true}]
     "```clj
       [form-field/widget {:label \"Field\", :required true} ...]
       ```"]
    "## Interactive example"
    [interactive-example-cmp]]])
