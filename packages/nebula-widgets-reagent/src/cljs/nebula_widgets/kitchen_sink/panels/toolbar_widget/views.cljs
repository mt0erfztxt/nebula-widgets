(ns nebula-widgets.kitchen-sink.panels.toolbar-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.toolbar-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [nebula-widgets.widgets.toolbar.core :as toolbar]
    [re-frame.core :as rf]))

(def ^:private bem
  "toolbarWidgetPanel")

(defn- build-partition [alignment size]
  (case alignment
    :left
    {:action-groups
     [{:actions [{:cid "plus", :icon "plus"}]}
      {:actions
       [{:cid "edit", :icon "pencil"}
        {:cid "remove", :icon "trash"}]}]}
    :right
    {:action-groups
     [{:actions
       [{:text "ACTION1"}
        {:active true, :icon "pencil", :text "ACTION2"}
        [text-input/widget
         {:placeholder "Just renderable"
          :size (if (= "normal" size) "small" "normal")}]
        {:accented true, :text "ACTION3"}
        {:disabled true, :text "ACTION4"}]}]}))

(defn- build-partitions-prop
  "Accepts specially formatted string and returns seq of maps suitable to be used as `:partitions` prop of widget.
  Examples of string format:
  - left - only left partition
  - right - only right partition
  - left+right - left and right partitions
  - foo - no partitions"
  [value size]
  (->> (str/split value #"\+")
    (map (fn [s] (->> s (re-matches #"(left|right)") second)))
    (flatten)
    (filter some?)
    (map (comp #(vector % (build-partition % size)) keyword))
    (into {})))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> common/knobs
    (map
      (fn [prop]
        [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
    (into {})))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [partitions size] :as props} @*props]
        (into
          [ie/widget
           [toolbar/widget (merge props {:partitions (build-partitions-prop partitions size)})]]
          (for
            [params
             [[:- "widget props"]
              :disabled
              [:size (ie-cgi-knob/gen-items "normal" "large")]
              [:- "knobs"]
              [:partitions (ie-cgi-knob/gen-items "left" "right" "left+right")]]
             :let [[cid label-or-items] (if (sequential? params) params [params])
                   label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
                :value (get props cid)}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div {:class bem}
   [man-page/widget
    "# Toolbar widget"
    (-> #'toolbar/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
