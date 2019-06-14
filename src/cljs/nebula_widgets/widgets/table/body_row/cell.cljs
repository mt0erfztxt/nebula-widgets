(ns nebula-widgets.widgets.table.body-row.cell
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem "nw-table-bodyRow-cell")
(def ^:private content-elt-bem (str bem "__content"))

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

(defn- content-elt-cmp [content]
  [:span {:class content-elt-bem} content])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [column content]
  [:div {:class (build-class column)}
   [content-elt-cmp content]])
