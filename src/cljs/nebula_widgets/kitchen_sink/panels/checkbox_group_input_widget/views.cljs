(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkbox-group-input.core :as checkbox-group-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget
   {:cid "010"
    :title "without checked items"}
   [checkbox-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Option " n)
        :value (->> n (str "option") keyword)})
     :value #{}}]
   "```clj
     [checkbox-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Option 1\", :value :option1}
        {:label \"Option 2\", :value :option2}
        {:label \"Option 3\", :value :option3}]
       :value #{}}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget
   {:cid "020"
    :title "with checked items - case when :boolean prop is false"}
   [checkbox-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Option " n)
        :value (->> n (str "option") keyword)})
     :value #{:option1 :option3}}]
   "```clj
     [checkbox-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Option 1\", :value :option1}
        {:label \"Option 2\", :value :option2}
        {:label \"Option 3\", :value :option3}]
       :value #{:option1 :option3}}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 025
;;------------------------------------------------------------------------------

(defn- example025-cmp []
  [example/widget
   {:cid "025"
    :title "with checked items - case when :boolean prop is true"}
   [checkbox-group-input/widget
    {:boolean true
     :items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Option " n)
        :path (keyword (str "option" n))})
     :value {:option1 true, :option3 true}}]
   "```clj
     [checkbox-group-input/widget
      {:inline true
       :item-props {:on-change (fn [event path] ...)}
       :items
       [{:label \"Option 1\", :path :option1}
        {:label \"Option 2\", :path :option2}
        {:label \"Option 3\", :path :option3}]
       :value {:option1 true, :option3 true}}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [:<>
   [example/widget
    {:cid "030a"
     :title "with :inline and :columns props - case without items with label that spans multiple columns"}
    [checkbox-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15)]
        {:label (str "Option " n)
         :value (->> n (str "option") keyword)})
      :value #{:option1 :option3 :option4}}]
    "```clj
      [checkbox-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :value #{:option1 :option3 :option4}]
      ```"]
   [example/widget
    {:cid "030b"
     :title "widget with inline and columns props - case with item with label that spans multiple columns"}
    [checkbox-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label label
         :value (->> n (str "option") keyword)})
      :value #{:option1 :option3 :option4}}]
    "```clj
      [checkbox-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :value #{:option1 :option3 :option4}}]
      ```"]
   [example/widget
    {:cid "030c"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :label.shrinked prop"}
    [checkbox-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label {:shrinked true, :text label}
         :value (->> n (str "option") keyword)})
      :value #{:option1 :option3 :option4}}]
    "```clj
      [checkbox-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label {:shrinked true, :text \"Option 1\"}, :value :option1}
         {:label {:shrinked true, :text \"Option 2\"}, :value :option2}
         {:label {:shrinked true, :text \"Option 3\"}, :value :option3}
         ...]
        :value #{:option1 :option3 :option4}}]
      ```"]
   [example/widget
    {:cid "030d"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :soft-columns prop"}
    [checkbox-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label label
         :value (->> n (str "option") keyword)})
      :soft-columns true
      :value #{:option1 :option3 :option4}}]
    "```clj
      [checkbox-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :soft-columns true
        :value #{:option1 :option3 :option4}}]
      ```"]])

;;------------------------------------------------------------------------------
;; Example 040
;;------------------------------------------------------------------------------

(defn- example040-cmp []
  (let [default-props
        {:equidistant true
         :items
         (map-indexed
           (fn [idx label]
             {:label label, :value (->> idx inc (str "option") keyword)})
           ["Label" "Long label" "Very, very long label" "Label"])
         :value #{:option1 :option2}
         :widget "button"}]
    [example/widget
     {:cid "040"
      :title "with :equidistant, :size and :widget props"}
     [checkbox-group-input/widget (merge default-props {:size "large"})]
     [checkbox-group-input/widget default-props]
     [checkbox-group-input/widget (merge default-props {:size "small"})]
     "```clj
       [checkbox-group-input/widget
        {:equidistant true
         :inline true
         :item-props {:on-change (fn [event value] ...)}
         :items [{:label \"Label\", :value :option1}, ...]
         :size \"large\"   ; \"normal\", \"small\"
         :value #{:option1 :option2}
         :widget \"button\"}]
       ```"]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:columns :disabled :equidistant :errors :inline :invalid :label-shrinked :no-row-gap :size :soft-columns
        :stacked-on-mobile :value :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %2])]))
       (into {})))

(defn- update-ie-value [event value]
  (let [updater (if (utils/event->checked event) conj disj)]
    ((:value ie-setters) event #(updater % value))))

(defn- interactive-example-cmp []
  (let [*cgi-props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [cgi-props @*cgi-props]
        (into
          [ie/widget
           [checkbox-group-input/widget
            (assoc cgi-props
              :item-props {:on-change update-ie-value}
              :items
              (for [n (range 1 10) :let [label (str "option" n)]]
                {:label
                 {:shrinked (get cgi-props :label-shrinked)
                  :text (str label (when (= 2 n) " (some long text here)"))}
                 :value (keyword label)}))]]
          (for [[cid items]
                [[:columns (for [v [nil 3 5]] {:label (if (nil? v) "nil" v), :value v})]
                 [:disabled]
                 [:equidistant]
                 [:errors
                  [{:label "no"}
                   {:label "yes", :value #{"error 1" "error 2"}}]]
                 [:inline]
                 [:invalid]
                 [:label-shrinked]
                 [:no-row-gap]
                 [:size (for [s ["small" "normal" "large"]] {:label s, :value s})]
                 [:soft-columns]
                 [:stacked-on-mobile]
                 [:widget (for [s ["button" "icon" "native"]] {:label s, :value s})]]]
            [ie-rgi-knob/widget
             {:cid cid}
             (cond->
               {:cid cid
                :item-props {:on-change (get ie-setters cid)}
                :value (get cgi-props cid)}
               items (assoc :items items))]))))))

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
    [example040-cmp]
    "## Interactive example"
    [interactive-example-cmp]]])
