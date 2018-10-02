(ns nebula-widgets.kitchen-sink.widgets.man-page.example.view
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "manPage-example-view")

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders man page example's view.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - :cid - any, no default. Component id.
  *  `& children` - optional, any number of child components"
  [& _args]
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    (into [:div {:class (build-class props)}] children)))
