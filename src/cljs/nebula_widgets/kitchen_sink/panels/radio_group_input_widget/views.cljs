(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.example.section :as example-section]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]
    [re-frame.core :as rf]))

(def ^:private panel-path->keyword (partial utils/path->keyword :panels :radio-group-input-widget))
(def ^:private example010-path->keyword (partial panel-path->keyword :example010 "/"))
(def ^:private example020-path->keyword (partial panel-path->keyword :example020 "/"))
(def ^:private example030-path->keyword (partial panel-path->keyword :example030 "/"))
(def ^:private example040-path->keyword (partial panel-path->keyword :example040 "/"))

(defn- example010-item-on-change-handler [_ value]
  (rf/dispatch [(example010-path->keyword :set :value) value]))

(defn- example020-item-on-change-handler [_ value]
  (rf/dispatch [(example020-path->keyword :set :value) value]))

(defn- example030-item-on-change-handler [_ value]
  (rf/dispatch [(example030-path->keyword :set :value) value]))

(defn- example040-item-on-change-handler [_ value]
  (rf/dispatch [(example040-path->keyword :set :value) value]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let [*example010 (rf/subscribe [(example010-path->keyword)])
        *example020 (rf/subscribe [(example020-path->keyword)])
        *example030 (rf/subscribe [(example030-path->keyword)])
        *example040 (rf/subscribe [(example040-path->keyword)])]
    (fn []
      [:div.radioGroupInputWidgetPanel
       (let [{:keys [value]} @*example010]
         [example/widget {:cid "010" :title "Example 010 - Without initial value"}
          [radio-group-input/widget
           {:cid        "ex010-01"
            :item-props {:on-change example010-item-on-change-handler}
            :items      [{:label "Option 1" :value :option1}
                         {:label "Option 2" :value :option2}
                         {:label "Option 3" :value :option3}]
            :value      value}]])
       (let [{:keys [value]} @*example020]
         [example/widget {:cid "020" :title "Example 020 - With initial value + Inline"}
          [radio-group-input/widget
           {:cid        "ex020-01"
            :inline     true
            :item-props {:on-change example020-item-on-change-handler}
            :items      (for [n (range 1 19)] {:label (str "Option " n) :value (->> n (str "option") keyword)})
            :value      value}]])
       (let [{:keys [value]} @*example030]
         [example/widget {:cid "030" :title "Example 030 - Columns_5"}
          [example-section/widget {:separated true :title "without labels that spans multiple columns"}
           [radio-group-input/widget
            {:cid        "ex030-01"
             :columns    5
             :item-props {:on-change example030-item-on-change-handler}
             :items      (for [n (range 1 19)] {:label (str "Option " n) :value (->> n (str "option") keyword)})
             :value      value}]]
          [example-section/widget {:separated true :title "with label that spans multiple columns"}
           [radio-group-input/widget
            {:cid        "ex030-02"
             :columns    5
             :item-props {:on-change example030-item-on-change-handler}
             :items      (for [n (range 1 19)]
                           (let [label (condp = n
                                         3 "A label that spans multiple columns"
                                         (str "Option " n))]
                             {:label label :value (->> n (str "option") keyword)}))
             :value      value}]]
          [example-section/widget
           {:separated true
            :title     [:span "with label that spans multiple columns and " [:b "SOFT-COLUMNS_TRUE"]]}
           [radio-group-input/widget
            {:cid          "exp030-03"
             :columns      5
             :item-props   {:on-change example030-item-on-change-handler}
             :items        (for [n (range 1 19)]
                             (let [label (condp = n
                                           3 "A label that spans multiple columns"
                                           (str "Option " n))]
                               {:label label :value (->> n (str "option") keyword)}))
             :soft-columns true
             :value        value}]]])
       (let [{:keys [value]} @*example040
             default-props {:equidistant true
                            :item-props  {:on-change example040-item-on-change-handler}
                            :items       [{:label "Label" :value :option1}
                                          {:label "Long label" :value :option2}
                                          {:label "Very, very long label" :value :option3}
                                          {:label "Label" :value :option4}]
                            :value       value
                            :widget      "button"}]
         [example/widget {:cid "040" :title "Example 040 - Equidistant + Widget_button"}
          [example-section/widget {:title [:b "SIZE_LARGE"]}
           [radio-group-input/widget (merge default-props {:cid "ex040-01" :size "large"})]]
          [example-section/widget {:title [:span [:b "SIZE_NORMAL"] " (default)"]}
           [radio-group-input/widget (merge default-props {:cid "ex040-02"})]]
          [example-section/widget {:title [:b "SIZE_SMALL"]}
           [radio-group-input/widget (merge default-props {:cid "ex040-03" :size "small"})]]])])))
