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
  "props - optional map:
    :bem  - optional, string, nw-title by default, would be used as widget's BEM
    :cid  - optional, any, no default, component id
    :size - optional, one of :large, :normal (default), :small or their string/symbol equivalents
  children - optional, seq of renderables, no default"
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    (into [:div {:class (build-class props)}] children)))
