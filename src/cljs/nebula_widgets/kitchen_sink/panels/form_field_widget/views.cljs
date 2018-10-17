(ns nebula-widgets.kitchen-sink.panels.form-field-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.widgets.form-field.core :as form-field]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]))

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
       ```"]]])
