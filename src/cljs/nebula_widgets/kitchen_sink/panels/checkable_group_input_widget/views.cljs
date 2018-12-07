(ns nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-group-input.core :as checkable-group-input]
    [re-frame.core :as rf]
    [reagent.core :as r]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget
   {:cid "010"
    :title "without checked item"}
   [checkable-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Option " n)
        :value (->> n (str "option") keyword)})
     :on-change identity
     :value nil}]
   "```clj
     [checkable-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Option 1\", :value :option1}
        {:label \"Option 2\", :value :option2}
        {:label \"Option 3\", :value :option3}]
       :on-change identity
       :value nil}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget
   {:cid "020"
    :title "with checked item"}
   [checkable-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Option " n)
        :value (->> n (str "option") keyword)})
     :on-change identity
     :value :option2}]
   "```clj
     [checkable-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Option 1\", :value :option1}
        {:label \"Option 2\", :value :option2}
        {:label \"Option 3\", :value :option3}]
       :on-change identity
       :value :option2}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [:<>
   [example/widget
    {:cid "030a"
     :title "with :inline and :columns props - case without items with label that spans multiple columns"}
    [checkable-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15)]
        {:label (str "Option " n)
         :value (->> n (str "option") keyword)})
      :on-change identity
      :value :option2}]
    "```clj
      [checkable-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :on-change identity
        :value :option2]
      ```"]
   [example/widget
    {:cid "030b"
     :title "widget with inline and columns props - case with item with label that spans multiple columns"}
    [checkable-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label label
         :value (->> n (str "option") keyword)})
      :on-change identity
      :value :option2}]
    "```clj
      [checkable-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :on-change identity
        :value :option2}]
      ```"]
   [example/widget
    {:cid "030c"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :label.shrinked prop"}
    [checkable-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label {:shrinked true, :text label}
         :value (->> n (str "option") keyword)})
      :on-change identity
      :value :option2}]
    "```clj
      [checkable-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label {:shrinked true, :text \"Option 1\"}, :value :option1}
         {:label {:shrinked true, :text \"Option 2\"}, :value :option2}
         {:label {:shrinked true, :text \"Option 3\"}, :value :option3}
         ...]
        :on-change identity
        :value :option2}]
      ```"]
   [example/widget
    {:cid "030d"
     :title "with :inline and :columns props - case with item with label that spans multiple columns and :soft-columns prop"}
    [checkable-group-input/widget
     {:columns 5
      :items
      (for [n (range 1 15) :let [label (if (= n 7) "A label that spans multiple columns" (str "Option " n))]]
        {:label label
         :value (->> n (str "option") keyword)})
      :on-change identity
      :soft-columns true
      :value :option2}]
    "```clj
      [checkable-group-input/widget
       {:columns 5
        :inline true
        :item-props {:on-change (fn [event value] ...)}
        :items
        [{:label \"Option 1\", :value :option1}
         {:label \"Option 2\", :value :option2}
         {:label \"Option 3\", :value :option3}
         ...]
        :on-change identity
        :soft-columns true
        :value :option2}]
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
         :on-change identity
         :value :option2
         :widget "button"}]
    [example/widget
     {:cid "040"
      :title "with :equidistant, :size and :widget props"}
     [checkable-group-input/widget (merge default-props {:size "large"})]
     [checkable-group-input/widget default-props]
     [checkable-group-input/widget (merge default-props {:size "small"})]
     "```clj
       [checkable-group-input/widget
        {:equidistant true
         :inline true
         :item-props {:on-change (fn [event value] ...)}
         :items [{:label \"Label\", :value :option1}, ...]
         :on-change identity
         :size \"large\"   ; \"normal\", \"small\"
         :value :option2
         :widget \"button\"}]
       ```"]))

;;------------------------------------------------------------------------------
;; Example 050
;;------------------------------------------------------------------------------

(defn- example050-cmp []
  [example/widget
   {:cid "050"
    :title "with :selection-mode set to single"}
   [checkable-group-input/widget
    {:items
     (for [n (range 1 4)]
       {:cid n
        :label (str "Choice " n)
        :value (->> n (str "choice") keyword)})
     :on-change identity
     :selection-mode "single"
     :value nil}]
   "```clj
     [checkable-group-input/widget
      {:item-props {:on-change (fn [event value] ...)}
       :items
       [{:label \"Choice 1\", :value :choice1}
        {:label \"Choice 2\", :value :choice2}
        {:label \"Choice 3\", :value :choice3}]
       :on-change identity
       :selection-mode \"single\"
       :value nil}]
     ```"])

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:columns :disabled :equidistant :errors :inline :invalid :label-shrinked :no-row-gap :selection-mode :size
        :soft-columns :stacked-on-mobile :value :widget]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- on-change-handler [selection-mode value event]
  (let [checked (utils/event->checked event)]
    ((:value ie-setters)
      (if (= "multi" selection-mode)
        #((if checked conj disj) % value)
        #(when checked value)))))

(defn- on-selection-mode-change-handler [value _]
  ((:selection-mode ie-setters) value)
  ((:value ie-setters)
    (if (= "multi" value) #{:option2} :choice2)))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [selection-mode] :as props} @*props
            multi-selection? (= "multi" selection-mode)]
        (into
          [ie/widget
           [checkable-group-input/widget
            (assoc props
              :items
              (for [n (range 1 10) :let [label (str (if multi-selection? "option" "choice") n)]]
                {:label
                 {:shrinked (get props :label-shrinked)
                  :text (str label (when (= 2 n) " (some long text here)"))}
                 :value (keyword label)})
              :on-change (r/partial on-change-handler selection-mode))]]
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
                 [:selection-mode (for [s ["multi" "single"]] {:label s, :value s})]
                 [:size (for [s ["small" "normal" "large"]] {:label s, :value s})]
                 [:soft-columns]
                 [:stacked-on-mobile]
                 [:widget (for [s ["button" "icon"]] {:label s, :value s})]]]
            [ie-cgi-knob/widget
             {:cid cid}
             (cond->
               {:cid cid
                :on-change (if (= :selection-mode cid) on-selection-mode-change-handler (get ie-setters cid))
                :value (get props cid)}
               items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.checkableGroupInputWidgetPanel
   [man-page/widget
    "# Checkable group input widget"
    (-> #'checkable-group-input/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]
    [example050-cmp]
    "## Interactive example"
    [interactive-example-cmp]]])
