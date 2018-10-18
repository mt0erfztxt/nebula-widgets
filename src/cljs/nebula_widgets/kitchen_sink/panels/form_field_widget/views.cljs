(ns nebula-widgets.kitchen-sink.panels.form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.form-field-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.interactive-example.core :as interactive-example]
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]
    [re-frame.core :as rf]))

(defn- base-form-field [ff-props rgi-props n]
  [form-field/widget (merge {:label "Field"} ff-props)
   [radio-group-input/widget
    (merge
      {:columns 5
       :inline true
       :items
       (for [n (range 1 (or n 10)) :let [label (str "choice" n)]]
         {:label label, :value n})
       :value 2}
      rgi-props)]])

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:consider-input-margin :errors :display :label :required]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %2])]))
       (into {})))

;; TODO Extract common prop of ff and rgi widgets.
(defn- interactive-example-cmp []
  (let [*data (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [consider-input-margin errors display label required] :as ff-props} @*data]
        [interactive-example/widget
         [:<>
          [form-field/widget
           ff-props
           [radio-group-input/widget
            {:columns 5
             :inline true
             :items (for [n (range 1 10) :let [label (str "choice" n)]] {:label label, :value n})
             :value 1}]]
          [form-field/widget {:label "Other field"}
           [radio-group-input/widget
            {:columns 5
             :disabled true
             :inline true
             :items (for [n (range 1 10) :let [label (str "choice" n)]] {:label label, :value n})
             :value 2}]]]
         [form-field/widget
          {:cid "consider-input-margin"
           :consider-input-margin true
           :display "table"
           :label ":consider-input-margin"}
          [radio-group-input/widget
           {:columns 8
            :inline true
            :item-props {:on-change (:consider-input-margin ie-setters)}
            :items (for [v [false true]] {:label (str v), :value v})
            :no-row-gap true
            :value consider-input-margin}]]
         [form-field/widget
          {:cid "errors"
           :consider-input-margin true
           :display "table"
           :label ":errors"}
          [radio-group-input/widget
           {:columns 8
            :inline true
            :item-props {:on-change (:errors ie-setters)}
            :items
            [{:label "false", :value nil}
             {:label "true", :value ["Error message 1" "Error message 2"]}]
            :no-row-gap true
            :value errors}]]
         [form-field/widget
          {:cid "display"
           :consider-input-margin true
           :display "table"
           :label ":display"}
          [radio-group-input/widget
           {:columns 8
            :inline true
            :item-props {:on-change (:display ie-setters)}
            :items (for [v ["inline" "stacked" "table"]] {:label v, :value v})
            :no-row-gap true
            :value display}]]
         [form-field/widget
          {:cid "label"
           :consider-input-margin true
           :display "table"
           :label ":label"}
          [radio-group-input/widget
           {:columns 8
            :inline true
            :item-props {:on-change (:label ie-setters)}
            :items
            [{:label "string", :value "Field"}
             {:label "tuple", :value ["Field" "something"]}]
            :no-row-gap true
            :value label}]]
         [form-field/widget
          {:cid "required"
           :consider-input-margin true
           :display "table"
           :label ":required"}
          [radio-group-input/widget
           {:columns 8
            :inline true
            :item-props {:on-change (:required ie-setters)}
            :items (for [v [false true]] {:label (str v), :value v})
            :no-row-gap true
            :value required}]]]))))

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
      :title "label variations"}
     [base-form-field]
     [base-form-field {:label ["Field" "something"]}]
     "```clj
       [form-field/widget
        {:label \"Field\"}   ; [\"Field\" \"something\"]
        [radio-group-input/widget ...]]
       ```"]
    [example/widget
     {:cid "020"
      :title "adjusting vertical space between widgets with :consider-input-margin prop"}
     [:<>
      [base-form-field {:label "Field 1", :consider-input-margin true}]
      [base-form-field {:label "Field 2", :consider-input-margin false}]
      [base-form-field {:label "Field 3"}]]
     "```clj
       [:form
        [form-field/widget {:label \"Field 1\", :consider-input-margin true} ...]
        [form-field/widget {:label \"Field 2\", :consider-input-margin false} ...]
        [form-field/widget {:label \"Field 3\"} ...]]
       ```"]
    [example/widget
     {:cid "030"
      :title "displaying errors"}
     [base-form-field {:errors #{"Error message" "Another error message"}}]
     "```clj
       [form-field/widget
        {:errors #{\"Error message\" \"Another error message\"}
         :label \"Field\"}
        ...]
       ```"]
    [example/widget
     {:cid "040"
      :title "placing label before input (inline) instead of default label above input (stacked)"}
     [base-form-field {:inline true} {} 6]
     [base-form-field {:inline true} {} 12]
     [base-form-field {:inline true} {} 18]
     "```clj
       [form-field/widget {:inline true, :label \"Field\"} ...]
       ```"]
    [example/widget
     {:cid "050"
      :title "marking form field as required"}
     [base-form-field {:required true}]
     "```clj
       [form-field/widget {:label \"Field\", :required true} ...]
       ```"]
    "## Interactive example"
    [interactive-example-cmp]]])
