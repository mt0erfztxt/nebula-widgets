(ns nebula-widgets.widgets.title.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private default-bem
  "nw-title")

(defn- build-bem [bem]
  (or bem default-bem))

(def ^:private size-prop-set
  #{:large :normal :small})

(defn- build-class [{:keys [bem cid cns size]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["size" (-> size keyword size-prop-set (or :normal))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [& _args]
  "Renders title.

  Arguments:
  * `props` - map:
    - `:bem` - string, 'nw-title' by default. Would be used as widget's BEM. Allows to augment widget styling.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - :size - one of :large, :normal (default), :small or their string/symbol equivalents. Size of title.
  * `& children` - any number of renderables"
  (let [this (r/current-component)]
    (into [:div {:class (-> this r/props build-class)}] (r/children this))))
