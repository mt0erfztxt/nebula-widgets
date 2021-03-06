(ns nebula-widgets.kitchen-sink.panels.text-input-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [re-frame.core :as rf]
    [reagent.core :as r]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget
   {:cid "010"
    :title "busy widget"}
   [text-input/widget
    {:busy true
     :on-change identity
     :value "Doing something..."}]
   "```clj
     [text-input/widget
      {:busy true
       :value \"Doing something...\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget
   {:cid "020"
    :title "disabled widget"}
   [text-input/widget
    {:disabled true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:disabled true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [example/widget
   {:cid "030"
    :title "invalid widget with errors"}
   [text-input/widget
    {:errors #{"error 1" "error 2"}
     :invalid true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:errors #{\"error 1\" \"error 2\"}
       :invalid true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 040
;;------------------------------------------------------------------------------

(defn- example040-cmp []
  [example/widget
   {:cid "040"
    :title "multi-line widget"}
   [text-input/widget
    {:multi-line true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:multi-line true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 050
;;------------------------------------------------------------------------------

(defn- example050-cmp []
  [example/widget
   {:cid "050"
    :title "widget of different sizes"}
   [text-input/widget
    {:on-change identity
     :size "large"
     :value "Large size"}]
   [text-input/widget
    {:on-change identity
     :size "normal"
     :value "Normal size"}]
   [text-input/widget
    {:on-change identity
     :size "small"
     :value "Small size"}]
   "```clj
     [text-input/widget
      {:size \"large\"
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 060
;;------------------------------------------------------------------------------

(defn- example060-cmp []
  [example/widget
   {:cid "060"
    :title "widget of text alignment"}
   [text-input/widget
    {:on-change identity
     :text-alignment "left"
     :value "Left"}]
   [text-input/widget
    {:on-change identity
     :text-alignment "center"
     :value "Center"}]
   [text-input/widget
    {:on-change identity
     :text-alignment "right"
     :value "Right"}]
   "```clj
     [text-input/widget
      {:text-alignment \"left\"
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 070
;;------------------------------------------------------------------------------

(defn- example070-cmp []
  [example/widget
   {:cid "070"
    :title "widget with actions"}
   [text-input/widget
    {:actions
     {:after [{:icon "plus"}, {:icon "trash"}]
      :before [{:disabled true, :icon "search"}]}
     :on-change identity
     :value "Something"}]
   "```clj
     [text-input/widget
      {:actions
       {:after [{:icon \"plus\"}, {:icon \"trash\"}]
        :before [{:disabled true, :icon \"search\"}]}
       :on-change identity
       :value \"Something\"}]]
     ```"])

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:actions :busy :disabled :errors :invalid :multi-line :size :text-alignment :value]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(let [{value-setter :value} ie-setters]
  (defn- handle-on-change [event]
    (value-setter (utils/event->value event)))

  (defn- handle-action-on-click [v _]
    (value-setter v)))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [actions errors] :as props} @*props
            actions
            (when (str/starts-with? actions "yes")
              {:after
               (for [icon ["plus" "trash"]]
                 {:icon icon
                  :on-click (r/partial handle-action-on-click icon)})
               :before
               [{:disabled (= "yes+disabled" actions)
                 :icon "search"
                 :on-click (r/partial handle-action-on-click "search")}]})]
        (into
          [ie/widget
           [text-input/widget
            (assoc props
              :actions actions
              :errors (when (not= "no" errors) errors)
              :on-change handle-on-change)]]
          (for [[cid items]
                [[:actions (ie-cgi-knob/gen-items "no" "yes" "yes+disabled")]
                 [:busy]
                 [:disabled]
                 [:errors (ie-cgi-knob/gen-items "no" ["yes" #{"error 1" "error 2"}])]
                 [:invalid]
                 [:multi-line]
                 [:size (ie-cgi-knob/gen-items "small" "normal" "large")]
                 [:text-alignment (ie-cgi-knob/gen-items "left" "center" "right")]]]
            [ie-cgi-knob/widget
             {:cid cid}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
                :value (get props cid)}
               items (assoc :items items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.textInputWidgetPanel
   [man-page/widget
    "# Text input widget"
    (-> #'text-input/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]
    [example050-cmp]
    [example060-cmp]
    [example070-cmp]
    "## Interactive example"
    [interactive-example-cmp]]])
