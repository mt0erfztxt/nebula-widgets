(ns nebula-widgets.kitchen-sink.widgets.man-page.core
  (:require
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "manPage")

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders man page.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - :cid - any, no default. Component id.
  * `& children` - optional, any number of child components. Strings are rendered as markdown."
  [& _args]
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    (into
      [:div {:class (build-class props)}]
      (map #(if (string? %) [markdown/widget %] %) children))))
