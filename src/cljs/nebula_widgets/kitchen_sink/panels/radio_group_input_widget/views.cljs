(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget
   {:cid "010"
    :title "without checked item"}
   [radio-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Choice " n)
        :value (->> n (str "choice") keyword)})
     :value nil}]
   "```clj
     [radio-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Choice 1\", :value :choice1}
        {:label \"Choice 2\", :value :choice2}
        {:label \"Choice 3\", :value :choice3}]
       :value nil}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget
   {:cid "020"
    :title "with checked item"}
   [radio-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Choice " n)
        :value (->> n (str "choice") keyword)})
     :value :choice2}]
   "```clj
     [radio-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Choice 1\", :value :choice1}
        {:label \"Choice 2\", :value :choice2}
        {:label \"Choice 3\", :value :choice3}]
       :value :choice2}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [:<>
   [example/widget
    {:cid "030a"
     :title "with :inline and :columns props - case without items with label that spans multiple columns"}
    [radio-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15)]
        {:label (str "Choice " n)
         :value (->> n (str "choice") keyword)})
      :value :choice2}]
    "```clj
      [radio-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Choice 1\", :value :choice1}
         {:label \"Choice 2\", :value :choice2}
         {:label \"Choice 3\", :value :choice3}
         ...]
        :value :choice2]
      ```"]
   [example/widget
    {:cid "030b"
     :title "widget with inline and columns props - case with item with label that spans multiple columns"}
    [radio-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Choice " n))]]
        {:label label
         :value (->> n (str "choice") keyword)})
      :value :choice2}]
    "```clj
      [radio-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Choice 1\", :value :choice1}
         {:label \"Choice 2\", :value :choice2}
         {:label \"Choice 3\", :value :choice3}
         ...]
        :value :choice2}]
      ```"]
   [example/widget
    {:cid "030c"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :label.shrinked prop"}
    [radio-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Choice " n))]]
        {:label {:shrinked true, :text label}
         :value (->> n (str "choice") keyword)})
      :value :choice2}]
    "```clj
      [radio-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label {:shrinked true, :text \"Choice 1\"}, :value :choice1}
         {:label {:shrinked true, :text \"Choice 2\"}, :value :choice2}
         {:label {:shrinked true, :text \"Choice 3\"}, :value :choice3}
         ...]
        :value :choice2}]
      ```"]
   [example/widget
    {:cid "030d"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :soft-columns prop"}
    [radio-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Choice " n))]]
        {:label label
         :value (->> n (str "choice") keyword)})
      :soft-columns true
      :value :choice2}]
    "```clj
      [radio-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Choice 1\", :value :choice1}
         {:label \"Choice 2\", :value :choice2}
         {:label \"Choice 3\", :value :choice3}
         ...]
        :soft-columns true
        :value :choice2}]
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
             {:label label, :value (->> idx inc (str "choice") keyword)})
           ["Label" "Long label" "Very, very long label" "Label"])
         :value :choice2
         :widget "button"}]
    [example/widget
     {:cid "040"
      :title "with :equidistant, :size and :widget props"}
     [radio-group-input/widget (merge default-props {:size "large"})]
     [radio-group-input/widget default-props]
     [radio-group-input/widget (merge default-props {:size "small"})]
     "```clj
       [radio-group-input/widget
        {:equidistant true
         :inline true
         :item-props {:on-change (fn [event value] ...)}
         :items [{:label \"Label\", :value :choice1}, ...]
         :size \"large\"   ; \"normal\", \"small\"
         :value :choice2
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

(defn- interactive-example-cmp []
  (let [*rgi-props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [rgi-props @*rgi-props]
        (into
          [ie/widget
           [radio-group-input/widget
            (assoc rgi-props
              :item-props {:on-change (:value ie-setters)}
              :items
              (for [n (range 1 10) :let [label (str "choice" n)]]
                {:label
                 {:shrinked (get rgi-props :label-shrinked)
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
                :value (get rgi-props cid)}
               items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.radioGroupInputWidgetPanel
   [man-page/widget
    "# Radio group input widget"
    (-> #'radio-group-input/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]
    "## Interactive example"
    [interactive-example-cmp]]])
