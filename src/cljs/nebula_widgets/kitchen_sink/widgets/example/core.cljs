(ns nebula-widgets.kitchen-sink.widgets.example.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.card.core :as card]
    [nebula-widgets.widgets.title.core :as title]))

(def ^:private bem "example")
(def ^:private bem-body (str bem "__body"))

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [{:keys [title] :as props} & children]
  [:div {:class (build-class props)}
   [card/widget
    [title/widget title]
    (into [:div {:class bem-body}] children)]])
