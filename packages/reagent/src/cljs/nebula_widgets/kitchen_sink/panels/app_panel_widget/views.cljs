(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.app-panel.core :as app-panel]
    [re-frame.core :as rf]))

(defn- build-sidebar-props [sidebars placement]
  (let [{:keys [collapsed gutter size]} (get sidebars placement)]
    {:collapsed collapsed
     :content
     [:h1 {:class (bem-utils/build-class "appPanelWidget-sidebar" [[placement]])}
      (str (-> placement name str/capitalize) " sidebar")]
     :gutter gutter
     :placement placement
     :size size}))

(defn- build-sidebars-prop [sidebars]
  (cond-> []
    (-> sidebars :left :exists) (conj (build-sidebar-props sidebars :left))
    (-> sidebars :right :exists) (conj (build-sidebar-props sidebars :right))))

(defn- build-toolbar-props [placement idx]
  {:content [:div.appPanelWidget-toolbar (str "Content of toolbar " (inc idx))]
   :placement placement})

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
       (map-indexed #(build-toolbar-props %2 %1))))

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
             :footer
             :header
             [:layout (ie-cgi-knob/gen-items "adjusted" "pinned" "pinned-footer" "pinned-header" "static")]
             [:toolbars (ie-cgi-knob/gen-items "no" "top2" "bottom2" "top2+bottom2")]
             [:- "left sidebar props"]
             :sidebars.left.collapsed
             :sidebars.left.exists
             [:sidebars.left.gutter (ie-cgi-knob/gen-items "none" "normal")]
             [:sidebars.left.size (ie-cgi-knob/gen-items "normal")]
             [:- "right sidebar props"]
             :sidebars.right.collapsed
             :sidebars.right.exists
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
      (let [{:keys [footer header sidebars toolbars] :as props} @*props]
        [app-panel/widget
         (-> props
           (select-keys [:layout])
           (merge
             {:cid "appPanelWidget"
              :footer (when footer [:h1.appPanelWidget-footer "Footer"])
              :header (when header [:h1.appPanelWidget-header "Header"])
              :sidebars (build-sidebars-prop sidebars)
              :toolbars (build-toolbars-prop toolbars)}))
         [man-page/widget
          "# Application panel widget (app-panel)"
          (-> #'app-panel/widget meta :doc)
          "## Interactive example"
          [interactive-example-cmp *props]]]))))
