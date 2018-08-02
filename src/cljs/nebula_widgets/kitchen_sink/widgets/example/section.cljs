(ns nebula-widgets.kitchen-sink.widgets.example.section
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "example-section")
(def ^:private bem-body (str bem "__body"))
(def ^:private bem-title (str bem "__title"))

(defn- build-class [{:keys [separated]}]
  (bem-utils/build-class bem [["separated" separated]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [& _args]
  (let [[{:keys [title] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (when title [:div {:class bem-title} title])
     (into [:div {:class bem-body}] children)]))
