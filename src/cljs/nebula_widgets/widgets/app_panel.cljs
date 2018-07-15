(ns nebula-widgets.widgets.app-panel
  (:require
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "nw-appPanel")
(def ^:private bem-body "nw-appPanel__body")
(def ^:private bem-main "nw-appPanel__main")
(def ^:private bem-sidebar "nw-appPanel__sidebar")

(defn- build-sidebar-modifiers [{:keys [collapsed? gutter placement size] :as sidebar-props}]
  (when (and (map? sidebar-props) (seq sidebar-props))
    (let [prefix (-> placement name (str "Sidebar"))]
      [prefix
       [(str prefix "-collapsed") collapsed?]
       [(str prefix "-gutter") (utils/calculate-prop-value gutter #{false :large :normal :small} false)]
       [(str prefix "-size") (utils/calculate-size-like-prop-value size)]])))

(defn- build-class [{:keys [cid cns]} sidebar-mapping]
  (->> sidebar-mapping
       (map #(-> % second :props))
       (map build-sidebar-modifiers)
       (apply concat [["cns" cns] ["cid" cid]])
       (bem-utils/build-class bem)))

(defn- get-sidebar-mapping [sidebars]
  (->> sidebars
       (map
         (fn [{:keys [content collapsed? placement] :as sidebar-props}]
           (let [placement (-> placement keyword #{:left :right} (or :left))]
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

(defn widget [& _args]
  (let [[{:keys [sidebars] :as props} children] ((juxt r/props r/children) (r/current-component))
        {{left-sidebar :hcp} :left {right-sidebar :hcp} :right :as sidebar-mapping} (get-sidebar-mapping sidebars)]
    [:div {:class (build-class props sidebar-mapping)}
     left-sidebar
     [:div {:class bem-main} (into [:div {:class bem-body}] children)]
     right-sidebar]))
