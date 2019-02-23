(ns nebula-widgets.kitchen-sink.panels.action-group-action-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.action-group-action-widget.common :as common]
    [nebula-widgets.kitchen-sink.routes :as routes]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.action-group.action :as action-group-action]
    [re-frame.core :as rf]))

(def ^:private bem
  "actionGroupActionWidgetPanel")

(def ^:private href
  (routes/resolve :widgets/action-group))

(def ^:private icon
  "pencil")

(def ^:private text
  "Action")

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
      (let [props @*props]
        (into
          [ie/widget
           [action-group-action/widget props]]
          (for
            [params
             [[:- "widget props"]
              :accented
              :active
              :disabled
              [:href (ie-cgi-knob/gen-items ["no" nil] ["yes" href])]
              [:icon (ie-cgi-knob/gen-items ["no" nil] ["yes" icon])]
              :reversed
              [:text (ie-cgi-knob/gen-items ["no" nil] ["Title case" text] ["Upper case" (str/upper-case text)])]
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
    "# Action group's action widget"
    (-> #'action-group-action/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
