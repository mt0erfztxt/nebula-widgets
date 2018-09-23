(ns nebula-widgets.widgets.title.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private default-bem
  "nw-title")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-class [{:keys [bem cid size]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cid" cid]
     ["size" (-> size keyword #{:large :normal :small} (or :normal))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [& _args]
  "Renders title. Accepts optional props map and any number of child components.
  Supported props:
  * :bem  - string, nw-title by default. Would be used as widget's BEM.
  * :cid  - any, no default. Component id.
  * :size - one of :large, :normal (default), :small or their string/symbol equivalents. Title size."
  (let [this (r/current-component)]
    (into [:div {:class (-> this r/props build-class)}]
          (r/children this))))
