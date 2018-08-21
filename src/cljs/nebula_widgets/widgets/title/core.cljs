(ns nebula-widgets.widgets.title.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "nw-title")

(defn- build-class [{:keys [cid size]}]
  (bem-utils/build-class bem [["cid" cid]
                              ["size" (-> size keyword #{:large :normal :small} (or :normal))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [& _args]
  "props - optional map:
    :cid  - optional, any, no default, component id
    :size - optional, one of :large, :normal (default), :small or their string/symbol equivalents
  children - optional, seq of renderables, no default"
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    (into [:div {:class (build-class props)}] children)))
