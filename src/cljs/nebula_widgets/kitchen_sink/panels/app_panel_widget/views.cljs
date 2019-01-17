(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.app-panel.core :as app-panel]
    [re-frame.core :as rf]))

(defn- build-sidebar-props [sidebars placement]
  (let [{:keys [collapsed gutter size]} (get sidebars placement)]
    {:collapsed collapsed
     :gutter gutter
     :placement placement
     :size size}))

(defn- build-toolbar-props [placement separated]
  {:content [:div.appPanelWidget-toolbar (str "Content of " (name placement) " toolbar")]
   :placement placement
   :separated separated})

(defn- build-toolbars-prop
  "Accepts specially formatted string and returns seq of maps suitable to be used as `:toolbars` prop of widget.
  Examples of string format:
  - top - one top toolbar
  - top2 - two top toolbars
  - top+bottom2 - one top and two bottom toolbars
  - foo - no toolbars"
  [value]
  (->> (str/split value #"\+")
       (map
         (fn [s]
           (let [[_ placement cnt :as result] (re-matches #"(top|bottom)(\d*)" s)]
             (when result
               (if cnt (repeat (js/parseFloat cnt) placement) placement)))))
       (flatten)
       (filter some?)
       (map #(build-toolbar-props % false))))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> common/knobs
       (map
         (fn [knob]
           [(apply utils/path->keyword knob)
            #(rf/dispatch [(apply interactive-example-path->keyword :set knob) %])]))
       (into {})))

(defn- interactive-example-cmp [*props]
  (let [props @*props]
    (into
      [ie/widget
       [:p "This page itself is interactive example"]]
      (for [params
            [[:- "widget props"]
             :header
             [:layout (ie-cgi-knob/gen-items "adjusted" "pinned-header" "static")]
             [:toolbars (ie-cgi-knob/gen-items "no" "top2" "bottom2" "top2+bottom2")]
             [:- "left sidebar props"]
             :sidebars.left.collapsed
             [:sidebars.left.gutter (ie-cgi-knob/gen-items "none" "normal")]
             [:sidebars.left.size (ie-cgi-knob/gen-items "normal")]
             [:- "right sidebar props"]
             :sidebars.right.collapsed
             [:sidebars.right.gutter (ie-cgi-knob/gen-items "none" "normal")]
             [:sidebars.right.size (ie-cgi-knob/gen-items "normal")]]
            :let [[cid label-or-items] (if (sequential? params) params [params])
                  label? (= :- cid)]]
        [ie-cgi-knob/widget
         {:cid cid, :label (when label? label-or-items)}
         (cond->
           {:cid cid
            :on-change (get ie-setters cid)
            :value (get-in props (utils/keyword->path cid))}
           (and (not label?) label-or-items) (assoc :items label-or-items))]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [header sidebars toolbars] :as props} @*props]
        [app-panel/widget
         (-> props
             (select-keys [:layout])
             (merge
               {:cid "appPanelWidget"
                :header (when header [:h1.appPanelWidget-header "Header"])
                :sidebars
                [(build-sidebar-props sidebars :left)
                 (build-sidebar-props sidebars :right)]
                :toolbars (build-toolbars-prop toolbars)}))
         [man-page/widget
          "# Application panel widget (app-panel)"
          (-> #'app-panel/widget meta :doc)
          "## Interactive example"
          [interactive-example-cmp *props]]]))))
