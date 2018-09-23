(ns nebula-widgets.widgets.app-panel.core
  (:require
    [nebula-widgets.widgets.app-panel.bar :as app-panel-bar]
    [nebula-widgets.widgets.app-panel.head :as app-panel-head]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "nw-appPanel")

(def ^:private body-elt-bem
  (str bem "__body"))

(def ^:private footer-elt-bem
  (str bem "__footer"))

(def ^:private header-elt-bem
  (str bem "__header"))

(def ^:private header-inner-elt-bem
  (str header-elt-bem "-inner"))

(def ^:private main-elt-bem
  (str bem "__main"))

(def ^:private sidebar-elt-bem
  (str bem "__sidebar"))

(defn- build-bar-modifiers [{:keys [placement separated] :as bar-props}]
  (when (and (map? bar-props) (seq bar-props))
    (let [prefix (-> placement name (str "Bar"))]
      [prefix
       [(str prefix "-separated") separated]])))

(defn- build-header-modifiers [{:keys [pinned] :as header-props}]
  (when (and (map? header-props) (seq header-props))
    (let [prefix "header"]
      [prefix
       [(str prefix "-pinned") pinned]])))

(defn- build-sidebar-modifiers [{:keys [collapsed gutter placement size] :as sidebar-props}]
  (when (and (map? sidebar-props) (seq sidebar-props))
    (let [prefix (-> placement name (str "Sidebar"))]
      [prefix
       [(str prefix "-collapsed") collapsed]
       [(str prefix "-gutter") gutter]
       [(str prefix "-size") size]])))

(defn- build-class [{:keys [cid cns header]} bar-mapping sidebar-mapping]
  (bem-utils/build-class
    bem
    (apply concat
           [["cns" cns] ["cid" cid]]
           (build-header-modifiers header)
           (concat (->> bar-mapping (map #(-> % second :props)) (map build-bar-modifiers))
                   (->> sidebar-mapping (map #(-> % second :props)) (map build-sidebar-modifiers))))))

(defn- get-bar-mapping [bars]
  (->> bars
       (map
         (fn [{:keys [placement separated] :as bar-props}]
           (let [placement (-> placement keyword #{:bottom :top} (or :top))
                 bar-props (assoc bar-props :placement placement
                                            :separated (-> separated boolean #{false true} (or false)))]
             [placement
              {:hcp [app-panel-bar/widget bar-props]
               :props bar-props}])))
       (into {})))

(defn- get-sidebar-mapping [sidebars]
  (->> sidebars
       (map
         (fn [{:keys [content collapsed gutter placement size] :as sidebar-props}]
           (let [placement (-> placement keyword #{:left :right} (or :left))
                 sidebar-props
                 (assoc sidebar-props
                   :gutter (utils/calculate-prop-value gutter #{false :large :normal :small} false)
                   :placement placement
                   :size (utils/calculate-size-like-prop-value size))]
             [placement
              {:hcp
               [:div {:class (bem-utils/build-class sidebar-elt-bem [["collapsed" collapsed] ["placement" placement]])}
                [:div {:class (str sidebar-elt-bem "-backdrop")}]
                [:div {:class (str sidebar-elt-bem "-inner")} content]]
               :props sidebar-props}])))
       (into {})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders app panel. Accepts optional props map and any number of child components.
  Supported props:
  * :bars - seq of maps. Each item in deq is a props for app-panel-bar widget with :placement prop set to :top
    by default, and :separated set to false by default.
  * :header - any, no default. Props for app header (container for head and top bar). No header when false or map:
    - :pinned - boolean, no default. Whether header is pinned (sticky header) or not.
  * :head - renderable, no default. App panel's head.
  * :sidebars - seq of maps, where map is:
    - :content - renderable, no default. Sidebar content.
    - :collapsed - logical true/false, no default. Whether sidebar is collapse or not.
    - :gutter - enum, one of false (default), :large, :normal, :small or their string/symbol equivalents. Sidebar's
      gutter size.
    - :placement - enum, one of :left (default), :right or their string/symbol equivalents. Sidebar placement.
    - :size - enum, one of :large, :normal (default), :small or their string/symbol equivalents. Sidebar size."
  [& _args]
  (let [[{:keys [bars head header sidebars] :as props} children] ((juxt r/props r/children) (r/current-component))
        {{left-sidebar :hcp} :left {right-sidebar :hcp} :right :as sidebar-mapping} (get-sidebar-mapping sidebars)
        {{bottom-bar :hcp} :bottom {top-bar :hcp} :top :as bar-mapping} (get-bar-mapping bars)]
    [:div {:class (build-class props bar-mapping sidebar-mapping)}
     left-sidebar
     right-sidebar
     [:div {:class main-elt-bem}
      (when-not (false? header)
        [:div {:class header-elt-bem}
         [:div {:class header-inner-elt-bem} [app-panel-head/widget head] top-bar]])
      (into [:div {:class body-elt-bem}] children)]
     [:div {:class footer-elt-bem}
      bottom-bar]]))
