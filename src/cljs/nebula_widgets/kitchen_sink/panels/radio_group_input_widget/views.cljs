(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]
    [re-frame.core :as rf]))

(def ^:private panel-path->keyword
  (partial utils/path->keyword :panels :radio-group-input-widget))

(def ^:private example010-path->keyword
  (partial panel-path->keyword :example010 "/"))

(defn- example010-item-on-change-handler [_ value]
  (rf/dispatch [(example010-path->keyword :set :value) value]))

(defn- example010-cmp []
  (let [*example010 (rf/subscribe [(example010-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example010]
        [example/widget
         {:cid "010"
          :title "widget with value prop not equal to value of any item"}
         [radio-group-input/widget
          {:cid "010"
           :item-props {:on-change example010-item-on-change-handler}
           :items
           [{:label "Option 1" :value :option1}
            {:label "Option 2" :value :option2}
            {:label "Option 3" :value :option3}]
           :value value}]
         "```clojure
           [radio-group-input/widget
            {:item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}]
             :value :option9}]
           ```"]))))

(def ^:private example020-path->keyword
  (partial panel-path->keyword :example020 "/"))

(defn- example020-item-on-change-handler [_ v]
  (rf/dispatch [(example020-path->keyword :set :value) v]))

(defn- example020-dispatch-set-disabled [v]
  (rf/dispatch [(example020-path->keyword :set :disabled) v]))

(defn- example020-set-disabled-button-on-click-handler [_]
  (example020-dispatch-set-disabled true))

(defn- example020-unset-disabled-button-on-click-handler [_]
  (example020-dispatch-set-disabled false))

(defn- example020-dispatch-set-invalid [v]
  (rf/dispatch [(example020-path->keyword :set :invalid) v]))

(defn- example020-set-invalid-button-on-click-handler [_]
  (example020-dispatch-set-invalid true))

(defn- example020-unset-invalid-button-on-click-handler [_]
  (example020-dispatch-set-invalid false))

(defn- example020-dispatch-set-label-shrinked [v]
  (rf/dispatch [(example020-path->keyword :set :label-shrinked) v]))

(defn- example020-set-label-shrinked-button-on-click-handler [_]
  (example020-dispatch-set-label-shrinked true))

(defn- example020-unset-label-shrinked-button-on-click-handler [_]
  (example020-dispatch-set-label-shrinked false))

(defn- example020-dispatch-set-widget [v]
  (rf/dispatch [(example020-path->keyword :set :widget) v]))

(defn- example020-set-widget-to-icon-button-on-click-handler [_]
  (example020-dispatch-set-widget "icon"))

(defn- example020-set-widget-to-native-button-on-click-handler [_]
  (example020-dispatch-set-widget "native"))

(defn- example020-cmp []
  (let [*example020 (rf/subscribe [(example020-path->keyword)])]
    (fn []
      (let [{:keys [disabled invalid label-shrinked value widget]} @*example020]
        [example/widget
         {:cid "020"
          :title "widget with value prop equal to value of one of items and inline props set"}
         [radio-group-input/widget
          {:cid "020"
           :disabled disabled
           :inline true
           :item-props {:on-change example020-item-on-change-handler}
           :items
           (for [n (range 1 19)]
             {:cid (str "020-" n)
              :invalid invalid
              :label {:shrinked label-shrinked :text (str "Option " n)}
              :value (->> n (str "option") keyword)
              :widget widget})
           :invalid invalid
           :value value
           :widget widget}]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setDisabled
           {:on-click example020-set-disabled-button-on-click-handler
            :type "button"}
           "Set disabled"]
          [:button.nw-button.nw-button--cid_unsetDisabled
           {:on-click example020-unset-disabled-button-on-click-handler
            :type "button"}
           "Unset disabled"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setInvalid
           {:on-click example020-set-invalid-button-on-click-handler
            :type "button"}
           "Set invalid"]
          [:button.nw-button.nw-button--cid_unsetInvalid
           {:on-click example020-unset-invalid-button-on-click-handler
            :type "button"}
           "Unset invalid"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setLabelShrinked
           {:on-click example020-set-label-shrinked-button-on-click-handler
            :type "button"}
           "Set labelShrinked"]
          [:button.nw-button.nw-button--cid_unsetLabelShrinked
           {:on-click example020-unset-label-shrinked-button-on-click-handler
            :type "button"}
           "Unset labelShrinked"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setWidgetToIcon
           {:on-click example020-set-widget-to-icon-button-on-click-handler
            :type "button"}
           "Set widget to icon"]
          [:button.nw-button.nw-button--cid_setWidgetToNative
           {:on-click example020-set-widget-to-native-button-on-click-handler
            :type "button"}
           "Set widget to native"]]
         "```clojure
           [radio-group-input/widget
            {:inline true
             :item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}
              ...]
             :value :option3}]
           ```"]))))

(def ^:private example030-path->keyword
  (partial panel-path->keyword :example030 "/"))

(defn- example030-item-on-change-handler [_ value]
  (rf/dispatch [(example030-path->keyword :set :value) value]))

(defn- example030-cmp []
  (let [*example030 (rf/subscribe [(example030-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example030]
        [:<>
         [example/widget
          {:cid "030-010"
           :title "widget with inline and columns props set and without items with label that spans multiple columns"}
          [radio-group-input/widget
           {:cid "030-010"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items (for [n (range 1 19)] {:label (str "Option " n), :value (->> n (str "option") keyword)})
            :value value}]
          "```clojure
            [radio-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label \"Option 1\" :value :option1}
               {:label \"Option 2\" :value :option2}
               {:label \"Option 3\" :value :option3}
               ...]
              :value :option1}]
            ```"]
         [example/widget
          {:cid "030-020"
           :title "widget with inline and columns props set and one item with label that spans multiple columns"}
          [radio-group-input/widget
           {:cid "030-020"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 19) :let [label (if (= n 3) "A label that spans multiple columns" (str "Option " n))]]
              {:label label
               :value (->> n (str "option") keyword)})
            :value value}]
          "```clojure
            [radio-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label \"Option 1\" :value :option1}
               {:label \"Option 2\" :value :option2}
               {:label \"Option 3\" :value :option3}
               ...]
              :value :option1}]
            ```"]
         [example/widget
          {:cid "030-030"
           :title "widget with inline, columns and label/shrinked props set and one item with label that spans multiple columns"}
          [radio-group-input/widget
           {:cid "030-030"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 19) :let [label (if (= n 3) "A label that spans multiple columns" (str "Option " n))]]
              {:label {:shrinked true :text label}
               :value (->> n (str "option") keyword)})
            :value value}]
          "```clojure
            [radio-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label {:shrinked true :text \"Option 1\"} :value :option1}
               {:label {:shrinked true :text \"Option 2\"} :value :option2}
               {:label {:shrinked true :text \"Option 3\"} :value :option3}
               ...]
              :value :option1}]
            ```"]
         [example/widget
          {:cid "030-040"
           :title "widget with inline, columns and soft-columns props set and one item with label that spans multiple columns"}
          [radio-group-input/widget
           {:cid "030-040"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 19) :let [label (if (= n 3) "A label that spans multiple columns" (str "Option " n))]]
              {:label label
               :value (->> n (str "option") keyword)})
            :soft-columns true
            :value value}]
          "```clojure
            [radio-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label \"Option 1\" :value :option1}
               {:label \"Option 2\" :value :option2}
               {:label \"Option 3\" :value :option3}
               ...]
              :soft-columns true
              :value :option1}]
            ```"]]))))

(def ^:private example040-path->keyword
  (partial panel-path->keyword :example040 "/"))

(defn- example040-item-on-change-handler [_ value]
  (rf/dispatch [(example040-path->keyword :set :value) value]))

(defn- example040-cmp []
  (let [*example040 (rf/subscribe [(example040-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example040
            default-props
            {:equidistant true
             :item-props {:on-change example040-item-on-change-handler}
             :items
             [{:label "Label" :value :option1}
              {:label "Long label" :value :option2}
              {:label "Very, very long label" :value :option3}
              {:label "Label" :value :option4}]
             :value value
             :widget "button"}]
        [example/widget
         {:cid "040-010"
          :title "widget with equidistant, size and widget props set"}
         [radio-group-input/widget (merge default-props {:cid "040-010" :size "large"})]
         [radio-group-input/widget (merge default-props {:cid "040-020"})]
         [radio-group-input/widget (merge default-props {:cid "ex040-03" :size "small"})]
         "```clojure
           [radio-group-input/widget
            {:equidistant true
             :inline true
             :item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}
              ...]
             :size \"large\"   ; \"normal\", \"small\"
             :value :option3
             :widget \"button\"}]
           ```"]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.radioGroupInputWidgetPanel
   [man-page/widget {:title "Radio group input widget"}
    [markdown/widget "Widget that represents group of inputs of type `radio`."]
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]]])
