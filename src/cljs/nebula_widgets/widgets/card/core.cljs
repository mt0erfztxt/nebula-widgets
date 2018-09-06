(ns nebula-widgets.widgets.card.core
  (:require
    [nebula-widgets.widgets.title.core :as title]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private default-bem
  "nw-card")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-bar-elt-bem [bem]
  (-> bem build-bem (str "__bar")))

(defn- build-bar-inner-elt-bem [bem]
  (-> bem build-bem (str "__bar-inner")))

(defn- build-body-elt-bem [bem]
  (-> bem build-bem (str "__body")))

(defn- build-class [{:keys [adjustable bem cid cns flat]}]
  "Returns string - CSS class for widget."
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["adjustable" adjustable]
     ["flat" flat]]))

(defn- bar-elt-cmp [{:keys [bem content placement separated]}]
  "Component that renders bar. Accepts props map."
  [:div {:class (-> bem build-bar-elt-bem (bem-utils/build-class [["placement" placement] ["separated" separated]]))}
   [:div {:class (build-bar-inner-elt-bem bem)} content]])

(defn- build-bar-mapping [bars]
  "Accepts seq of bar props maps and returns map where keys are :top and/or :bottom and values are maps of bar props
  under :props key and bar content as hiccup under :hcp key."
  (->> bars
       (map (fn [{:keys [placement separated] :as bar-props}]
              (let [placement (-> placement keyword #{:bottom :top} (or :bottom))
                    bar-props (assoc bar-props :placement placement
                                               :separated (-> separated boolean #{false true} (or true)))]
                [placement {:hcp [bar-elt-cmp bar-props], :props bar-props}])))
       (into {})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props   - optional, map:
    :adjustable  - optional, boolean, false by default, whether card must adjust to its parent size or not
    :bem         - optional, string, nw-card by default, would be used as widget's BEM
    :bars        - optional, seq of maps, a definition of card bars, each item is a map:
      :content   - optional, renderable, no default, bar content
      :placement - optional, one of :bottom (default), :top or their string/symbol equivalents, bar placement
      :separated - optional, logical true/false, true by default, whether bar separated from card body or not
    :flat        - optional, boolean, false by default, when true card doesn't drop shadow
    :title       - optional, vector
  children - optional, seq of renderables, no default"
  [& _args]
  (let [[{:keys [bars bem title] :as props} children] ((juxt r/props r/children) (r/current-component))
        {{bottom-bar :hcp} :bottom {top-bar :hcp} :top} (build-bar-mapping bars)]
    [:div {:class (build-class props)}
     top-bar
     (when title (into [title/widget] title))
     (into [:div {:class (build-body-elt-bem bem)}] children)
     bottom-bar]))
