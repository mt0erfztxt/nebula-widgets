(ns nebula-widgets.kitchen-sink.widgets.man-page.example.core
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.example.view :as view]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "manPage-example")

(def ^:private code-elt-bem
  (str bem "__code"))

(def ^:private title-elt-bem
  (str bem "__title"))

(def ^:private title-text-elt-bem
  (str title-elt-bem "-text"))

(def ^:private views-elt-bem
  (str bem "__views"))

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders man page's example.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - :cid - any, no default. Component id, it would be rendered as example's number when provided.
    - :title - string, no default. Example title.
  *  `& children` - optional, any number of child components. Strings rendered as Markdown, other as-is."
  [& _args]
  (let [[{:keys [cid title] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     [:h4 {:class title-elt-bem}
      (str "Example" (when cid (str " # " cid)) " - ")
      [:span {:class title-text-elt-bem} title]]
     (into [:div {:class views-elt-bem}]
           (for [child children]
             (if (string? child)
               [markdown/widget child]
               [view/widget child])))]))
