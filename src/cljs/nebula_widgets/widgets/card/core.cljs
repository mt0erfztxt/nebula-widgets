(ns nebula-widgets.widgets.card.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "nw-card")
(def ^:private bem-bar "nw-card__bar")
(def ^:private bem-bar-inner "nw-card__bar-inner")
(def ^:private bem-body "nw-card__body")

(defn- build-class [{:keys [adjustable? cid cns flat?]}]
  (bem-utils/build-class bem [["cns" cns] ["cid" cid] ["adjustable" adjustable?] ["flat" flat?]]))

(defn- bar-elt-cmp [{:keys [content placement separated?]}]
  [:div {:class (bem-utils/build-class bem-bar [["placement" placement] ["separated" separated?]])}
   [:div {:class bem-bar-inner} content]])

(defn- get-bar-mapping [bars]
  (->> bars
       (map
         (fn [{:keys [placement separated?] :as bar-props}]
           (let [placement (-> placement keyword #{:bottom :top} (or :bottom))
                 bar-props (assoc bar-props :placement placement
                                            :separated? (-> separated? boolean #{false true} (or true)))]
             [placement
              {:props bar-props
               :hcp   [bar-elt-cmp bar-props]}])))
       (into {})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props   - optional, map:
    :adjustable? - optional, boolean, false by default, whether card must adjust to its parent size or not
    :bars        - optional, seq of maps, a definition of card bars, each item is a map:
      :content     - optional, renderable, no default, bar content
      :placement   - optional, one of :bottom (default), :top or their string/symbol equivalents, bar placement
      :separated?  - optional, boolean, true by default, whether bar separated from card body or not
    :flat?       - optional, boolean, false by default, when true card doesn't drop shadow
  children - optional, seq of renderables, no default"
  [& _args]
  (let [[{:keys [bars] :as props} children] ((juxt r/props r/children) (r/current-component))
        {{bottom-bar :hcp} :bottom {top-bar :hcp} :top} (get-bar-mapping bars)]
    [:div {:class (build-class props)}
     top-bar
     (into [:div {:class bem-body}] children)
     bottom-bar]))
