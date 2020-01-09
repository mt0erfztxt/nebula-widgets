(ns nebula-widgets.kitchen-sink.panels.action-group-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.action-group-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.action-group.core :as action-group]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [re-frame.core :as rf]))

(def ^:private bem
  "actionGroupWidgetPanel")

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
      (let [{:keys [size] :as props} @*props]
        (into
          [ie/widget
           [action-group/widget
            (merge
              props
              {:actions
               [{:text "ACTION1"}
                {:active true, :icon "pencil", :text "ACTION2"}
                [text-input/widget
                 {:placeholder "Just renderable"
                  :size (if (= "normal" size) "small" "normal")}]
                {:accented true, :text "ACTION3"}
                {:disabled true, :text "ACTION4"}]})]]
          (for
            [params
             [[:- "widget props"]
              :disabled
              [:size (ie-cgi-knob/gen-items "large" "normal")]]
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
    "# Action group widget"
    (-> #'action-group/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
