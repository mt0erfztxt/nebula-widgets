(ns nebula-widgets.widgets.title.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem "nw-title")

(defn- build-class [{:keys [size]}]
  (bem-utils/build-class bem [["size" (-> size keyword #{:large :normal :small} (or :normal))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [& _args]
  (let [[props children] ((juxt r/props r/children) (r/current-component))]
    (into [:div {:class (build-class props)}] children)))
