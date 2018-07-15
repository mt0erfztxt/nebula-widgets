(ns nebula-widgets.widgets.app-panel.core
  (:require
    [nebula-widgets.widgets.app-panel.bar :as app-panel-bar]
    [nebula-widgets.widgets.app-panel.head :as app-panel-head]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "nw-appPanel")
(def ^:private bem-body (str bem "__body"))
(def ^:private bem-footer (str bem "__footer"))
(def ^:private bem-header (str bem "__header"))
(def ^:private bem-header-inner (str bem-header "-inner"))
(def ^:private bem-main (str bem "__main"))
(def ^:private bem-sidebar (str bem "__sidebar"))

(defn- build-bar-modifiers [{:keys [placement separated?] :as bar-props}]
  (when (and (map? bar-props) (seq bar-props))
    (let [prefix (-> placement name (str "Bar"))]
      [prefix
       [(str prefix "-separated") separated?]])))

(defn- build-header-modifiers [{:keys [pinned?] :as header-props}]
  (when (and (map? header-props) (seq header-props))
    (let [prefix "header"]
      [prefix
       [(str prefix "-pinned") pinned?]])))

(defn- build-sidebar-modifiers [{:keys [collapsed? gutter placement size] :as sidebar-props}]
  (when (and (map? sidebar-props) (seq sidebar-props))
    (let [prefix (-> placement name (str "Sidebar"))]
      [prefix
       [(str prefix "-collapsed") collapsed?]
       [(str prefix "-gutter") gutter]
       [(str prefix "-size") size]])))

(defn- build-class [{:keys [cid cns header]} bar-mapping sidebar-mapping]
  (let [bar-modifiers (->> bar-mapping (map #(-> % second :props)) (map build-bar-modifiers))
        header-modifiers (build-header-modifiers header)
        sidebar-modifiers (->> sidebar-mapping (map #(-> % second :props)) (map build-sidebar-modifiers))]
    (->> (apply concat
                [["cns" cns] ["cid" cid]]
                header-modifiers
                (concat bar-modifiers sidebar-modifiers))
         (bem-utils/build-class bem))))

(defn- get-bar-mapping [bars]
  (->> bars
       (map
         (fn [{:keys [placement separated?] :as bar-props}]
           (let [placement (-> placement keyword #{:bottom :top} (or :top))
                 bar-props (assoc bar-props :placement placement
                                            :separated? (-> separated? boolean #{false true} (or false)))]
             [placement
              {:props bar-props
               :hcp   [app-panel-bar/widget bar-props]}])))
       (into {})))

(defn- get-sidebar-mapping [sidebars]
  (->> sidebars
       (map
         (fn [{:keys [content collapsed? gutter placement size] :as sidebar-props}]
           (let [placement (-> placement keyword #{:left :right} (or :left))
                 sidebar-props (assoc sidebar-props
                                 :placement placement
                                 :gutter (utils/calculate-prop-value gutter #{false :large :normal :small} false)
                                 :size (utils/calculate-size-like-prop-value size))]
             [placement
              {:props sidebar-props
               :hcp   [:div
                       {:class (bem-utils/build-class bem-sidebar [["collapsed" collapsed?] ["placement" placement]])}
                       [:div {:class (str bem-sidebar "-backdrop")}]
                       [:div {:class (str bem-sidebar "-inner")} content]]}])))
       (into {})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props   - optional, map:
    :bars     - optional, seq of maps, where each map is a props for app panel `bar` widget with :placement prop set
                to :top by default, and :separated? set to false by default
    :header   - any, no default, props for app header (container for head and top bar). No header when false or map of:
      :pinned? - boolean, no default, whether header is pinned (sticky header) or not
    :head     - renderable, no default, panel's head
    :sidebars - seq of maps:
      :content    - renderable, no default
      :collapsed? - boolean, no default
      :gutter     - enum, one of false (default), :large, :normal, :small or their string/symbol equivalents
      :placement  - enum, one of :left (default), :right or their string/symbol equivalents
      :size       - enum, one of :large, :normal (default), :small or their string/symbol equivalents
  children - optional, seq of renderables"
  [& _args]
  (let [[{:keys [bars head header sidebars] :as props} children] ((juxt r/props r/children) (r/current-component))
        {{left-sidebar :hcp} :left {right-sidebar :hcp} :right :as sidebar-mapping} (get-sidebar-mapping sidebars)
        {{bottom-bar :hcp} :bottom {top-bar :hcp} :top :as bar-mapping} (get-bar-mapping bars)]
    [:div {:class (build-class props bar-mapping sidebar-mapping)}
     left-sidebar
     right-sidebar
     [:div {:class bem-main}
      (when-not (false? header)
        [:div {:class bem-header}
         [:div {:class bem-header-inner} [app-panel-head/widget head] top-bar]])
      (into [:div {:class bem-body}] children)]
     [:div {:class bem-footer}
      bottom-bar]]))
