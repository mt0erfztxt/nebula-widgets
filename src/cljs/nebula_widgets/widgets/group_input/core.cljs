(ns nebula-widgets.widgets.group-input.core
  (:require [nebula-widgets.utils.bem :as bem-utils]
            [reagent.core :as r]))

(def ^:private bem "nw-groupInput")
(def ^:private bem-inner (str bem "__inner"))
(def ^:private bem-item (str bem "__item"))

(defn- build-class [{:keys [cid columns cns disabled equidistant inline size stacked-on-mobile widget]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["equidistant" equidistant]
     ["inline" (or inline (pos? columns))]
     ["size" (-> size keyword #{:large :normal :small} (or :normal))]
     ["stacked-on-mobile" stacked-on-mobile]
     ["widget" (-> widget keyword #{:button :icon :native} (or :icon))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props   - optional, map:
    :cid               - optional, any, no default, component id
    :columns           - optional, integer, no default, number of items per row
    :cns               - optional, any, no default, component namespace
    :disabled          - optional, logical true/false, no default
    :equidistant       - optional, logical true/false, no default, whether items have same width
    :stacked           - optional, logical true/false, no default, whether items grouped stacked or inline
    :item-props        - optional, map, no default, common props for all items in group, for example, event handlers
    :size              - optional, one of :large, :normal (default), :small or their string/symbol equivalents
    :soft-columns      - optional, logical true/false, no default, when logical true and :columns is also set then
                         'min-width' style is used instead of 'width'
    :stacked-on-mobile - optional, logical true/false, no default, whether items forcibly stacked on mobile screens
    :value             - optional, any, no default, used as values for items, for example, in checkbox group input it
                         used to determine which items are checked
    :widget            - optional, any, item widget, see concrete group input implementation for details
  children - optional, seq of renderables"
  [& _args]
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (into [:div {:class bem-inner}]
           (for [{:keys [checked columns soft-columns?] :as item} children]
             [:div (cond-> (assoc {} :class (bem-utils/build-class bem-item [["checked" checked]]))
                           (and (integer? columns) (pos? columns))
                           (update :style assoc (if soft-columns? :min-width :width) (str (/ 100 columns) "%")))
              item]))]))
