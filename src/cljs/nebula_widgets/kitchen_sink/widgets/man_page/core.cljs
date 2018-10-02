(ns nebula-widgets.kitchen-sink.widgets.man-page.core
  (:require
    [reagent.core :as r]))

(def ^:private bem
  "manPage")

(def ^:private body-elt-bem
  (str bem "__body"))

(def ^:private title-elt-bem
  (str bem "__title"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders man page.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - :title - string, no default. Man page title.
  *  `& children` - optional, any number of child components"
  [& _args]
  (let [[{:keys [title]} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class bem}
     [:h1 {:class title-elt-bem} title]
     (into [:div {:class body-elt-bem}] children)]))
