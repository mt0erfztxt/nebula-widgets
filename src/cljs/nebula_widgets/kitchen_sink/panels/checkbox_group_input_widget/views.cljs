(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkbox-group-input.core :as checkbox-group-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(def ^:private example010-path->keyword
  (partial common/panel-path->keyword :example010 "/"))

(defn- example010-item-on-change-handler [event value]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example010-path->keyword :set :value)
       #(if checked? (conj % value) (disj % value))])))

(defn- example010-cmp []
  (let [*example010 (rf/subscribe [(example010-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example010]
        [example/widget
         {:cid "010"
          :title "widget without checked items"}
         [checkbox-group-input/widget
          {:cid "010"
           :item-props {:on-change example010-item-on-change-handler}
           :items
           (for [n (range 1 4)]
             {:cid n
              :label (str "Option " n)
              :value (->> n (str "option") keyword)})
           :value value}]
         "```clj
           [checkbox-group-input/widget
            {:item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}]
             :value #{}}]
           ```"]))))

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(def ^:private example020-path->keyword
  (partial common/panel-path->keyword :example020 "/"))

(defn- example020-item-on-change-handler [event value]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example020-path->keyword :set :value)
       #(if checked? (conj % value) (disj % value))])))

(defn- example020-cmp []
  (let [*example020 (rf/subscribe [(example020-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example020]
        [example/widget
         {:cid "020"
          :title "widget with checked items - case when `:boolean` prop is false"}
         [checkbox-group-input/widget
          {:cid "010"
           :item-props {:on-change example020-item-on-change-handler}
           :items
           (for [n (range 1 4)]
             {:cid n
              :label (str "Option " n)
              :value (->> n (str "option") keyword)})
           :value value}]
         "```clj
           [checkbox-group-input/widget
            {:item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}
              ...]
             :value #{:option1 :option3}}]
           ```"]))))

;;------------------------------------------------------------------------------
;; Example 025
;;------------------------------------------------------------------------------

(def ^:private example025-path->keyword
  (partial common/panel-path->keyword :example025 "/"))

(defn- example025-item-on-change-handler [event path]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example025-path->keyword :set :value)
       #(assoc % path checked?)])))

(defn- example025-cmp []
  (let [*example025 (rf/subscribe [(example025-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example025]
        [example/widget
         {:cid "025"
          :title "widget with checked items - case when `:boolean` prop is true"}
         [checkbox-group-input/widget
          {:boolean true
           :cid "010"
           :item-props {:on-change example025-item-on-change-handler}
           :items
           (for [n (range 1 4)]
             {:cid n
              :label (str "Option " n)
              :path (keyword (str "option" n))})
           :value value}]
         "```clj
           [checkbox-group-input/widget
            {:inline true
             :item-props {:on-change (fn [event path] ...)}
             :items
             [{:label \"Option 1\" :path :option1 :value :option1}
              {:label \"Option 2\" :path :option2 :value :option2}
              {:label \"Option 3\" :path :option3 :value :option3}
              ...]
             :value {:option1 true, :option3 true}}]
           ```"]))))

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(def ^:private example030-path->keyword
  (partial common/panel-path->keyword :example030 "/"))

(defn- example030-item-on-change-handler [event value]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example030-path->keyword :set :value)
       #(if checked? (conj % value) (disj % value))])))

(defn- example030-cmp []
  (let [*example030 (rf/subscribe [(example030-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example030]
        [:<>
         [example/widget
          {:cid "030a"
           :title "widget with inline and columns props - case without items with label that spans multiple columns"}
          [checkbox-group-input/widget
           {:cid "010"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 15)]
              {:label (str "Option " n)
               :value (->> n (str "option") keyword)})
            :value value}]
          "```clj
            [checkbox-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label \"Option 1\" :value :option1}
               {:label \"Option 2\" :value :option2}
               {:label \"Option 3\" :value :option3}
               ...]
              :value #{:option1 :option3 :option4}]
            ```"]
         [example/widget
          {:cid "030b"
           :title "widget with inline and columns props - case with item with label that spans multiple columns"}
          [checkbox-group-input/widget
           {:cid "010"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
              {:label label
               :value (->> n (str "option") keyword)})
            :value value}]
          "```clj
            [checkbox-group-input/widget
             {:columns 5
              :inline true
              :item-props {:on-change (fn [event value] ...)}
              :items
              [{:label \"Option 1\" :value :option1}
               {:label \"Option 2\" :value :option2}
               {:label \"Option 3\" :value :option3}
               ...]
              :value #{:option1 :option3 :option4}}]
            ```"]
         [example/widget
          {:cid "030c"
           :title "widget with inline and columns props - case with item with label that spans multiple columns and label/shrinked prop"}
          [checkbox-group-input/widget
           {:cid "010"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
              {:label {:shrinked true, :text label}
               :value (->> n (str "option") keyword)})
            :value value}]
          "```clj
            [checkbox-group-input/widget
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
          {:cid "030d"
           :title "widget with inline and columns props - case with item with label that spans multiple columns and soft-columns prop"}
          [checkbox-group-input/widget
           {:cid "010"
            :columns 5
            :item-props {:on-change example030-item-on-change-handler}
            :items
            (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
              {:label label
               :value (->> n (str "option") keyword)})
            :soft-columns true
            :value value}]
          "```clj
            [checkbox-group-input/widget
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

;;------------------------------------------------------------------------------
;; Example 040
;;------------------------------------------------------------------------------

(def ^:private example040-path->keyword
  (partial common/panel-path->keyword :example040 "/"))

(defn- example040-item-on-change-handler [event value]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example040-path->keyword :set :value)
       #(if checked? (conj % value) (disj % value))])))

(defn- example040-cmp []
  (let [*example040 (rf/subscribe [(example040-path->keyword)])]
    (fn []
      (let [{:keys [value]} @*example040
            default-props
            {:equidistant true
             :item-props {:on-change example040-item-on-change-handler}
             :items
             (map-indexed
               (fn [idx label]
                 {:label label, :value (->> idx inc (str "option") keyword)})
               ["Label" "Long label" "Very, very long label" "Label"])
             :value value
             :widget "button"}]
        [example/widget
         {:cid "040"
          :title "widget with equidistant, size and widget props"}
         [checkbox-group-input/widget (merge default-props {:cid "010", :size "large"})]
         [checkbox-group-input/widget (merge default-props {:cid "020"})]
         [checkbox-group-input/widget (merge default-props {:cid "030", :size "small"})]
         "```clj
           [checkbox-group-input/widget
            {:equidistant true
             :inline true
             :item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}
              ...]
             :size \"large\"   ; \"normal\", \"small\"
             :value #{:option1 :option2}
             :widget \"button\"}]
           ```"]))))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private example22-path->keyword
  (partial common/panel-path->keyword :example22 "/"))

(defn- example22-item-on-change-handler [event value]
  (let [checked? (utils/event->checked event)]
    (rf/dispatch
      [(example22-path->keyword :set :value)
       #(if checked? (conj % value) (disj % value))])))

(defn- example22-dispatch-set-disabled [v]
  (rf/dispatch [(example22-path->keyword :set :disabled) v]))

(defn- example22-set-disabled-button-on-click-handler [_]
  (example22-dispatch-set-disabled true))

(defn- example22-unset-disabled-button-on-click-handler [_]
  (example22-dispatch-set-disabled false))

(defn- example22-dispatch-set-invalid [v]
  (rf/dispatch [(example22-path->keyword :set :invalid) v]))

(defn- example22-set-invalid-button-on-click-handler [_]
  (example22-dispatch-set-invalid true))

(defn- example22-unset-invalid-button-on-click-handler [_]
  (example22-dispatch-set-invalid false))

(defn- example22-dispatch-set-label-shrinked [v]
  (rf/dispatch [(example22-path->keyword :set :label-shrinked) v]))

(defn- example22-set-label-shrinked-button-on-click-handler [_]
  (example22-dispatch-set-label-shrinked true))

(defn- example22-unset-label-shrinked-button-on-click-handler [_]
  (example22-dispatch-set-label-shrinked false))

(defn- example22-dispatch-set-widget [v]
  (rf/dispatch [(example22-path->keyword :set :widget) v]))

(defn- example22-set-widget-to-icon-button-on-click-handler [_]
  (example22-dispatch-set-widget "icon"))

(defn- example22-set-widget-to-native-button-on-click-handler [_]
  (example22-dispatch-set-widget "native"))

(defn- example22-cmp []
  (let [*example22 (rf/subscribe [(example22-path->keyword)])]
    (fn []
      (let [{:keys [disabled invalid label-shrinked value widget]} @*example22]
        [example/widget
         {:cid "020"
          :title "widget with checked items - case when `:boolean` prop is false)"}
         [checkbox-group-input/widget
          {:cid "010"
           :columns 5
           :disabled disabled
           :inline true
           :item-props {:on-change example22-item-on-change-handler}
           :items
           (for [n (range 1 19)]
             {:cid n
              :invalid invalid
              :label {:shrinked label-shrinked :text (str "Option " n (when (= 11 n) " (Longish text for label)"))}
              :value (->> n (str "option") keyword)
              :widget widget})
           :invalid invalid
           :value value
           :widget widget}]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setDisabled
           {:on-click example22-set-disabled-button-on-click-handler
            :type "button"}
           "Set disabled"]
          [:button.nw-button.nw-button--cid_unsetDisabled
           {:on-click example22-unset-disabled-button-on-click-handler
            :type "button"}
           "Unset disabled"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setInvalid
           {:on-click example22-set-invalid-button-on-click-handler
            :type "button"}
           "Set invalid"]
          [:button.nw-button.nw-button--cid_unsetInvalid
           {:on-click example22-unset-invalid-button-on-click-handler
            :type "button"}
           "Unset invalid"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setLabelShrinked
           {:on-click example22-set-label-shrinked-button-on-click-handler
            :type "button"}
           "Set labelShrinked"]
          [:button.nw-button.nw-button--cid_unsetLabelShrinked
           {:on-click example22-unset-label-shrinked-button-on-click-handler
            :type "button"}
           "Unset labelShrinked"]]
         [:div                                              ; TODO Use button-group widget
          [:button.nw-button.nw-button--cid_setWidgetToIcon
           {:on-click example22-set-widget-to-icon-button-on-click-handler
            :type "button"}
           "Set widget to icon"]
          [:button.nw-button.nw-button--cid_setWidgetToNative
           {:on-click example22-set-widget-to-native-button-on-click-handler
            :type "button"}
           "Set widget to native"]]
         "```clj
           [checkbox-group-input/widget
            {:inline true
             :item-props {:on-change (fn [event value] ...)}
             :items
             [{:label \"Option 1\" :value :option1}
              {:label \"Option 2\" :value :option2}
              {:label \"Option 3\" :value :option3}
              ...]
             :value #{:option1 :option3 :option4}}]
           ```"]))))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.checkboxGroupInputWidgetPanel
   [man-page/widget
    "# Checkbox group input widget"
    (-> #'checkbox-group-input/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example025-cmp]
    [example030-cmp]
    [example040-cmp]]])
