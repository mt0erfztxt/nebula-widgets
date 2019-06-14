(ns nebula-widgets.widgets.table.core
  (:require
    [goog.dom :as gdom]
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.table.body-row.core :as body-row]
    [nebula-widgets.widgets.table.head-row.core :as head-row]
    [oops.core :as oops]
    [reagent.core :as r]))

(def ^:private bem "nw-table")
(def ^:private body-elt-bem (str bem "__body"))
(def ^:private head-elt-bem (str bem "__head"))

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

(defn- body-elt-cmp [{:keys [columns rows]}]
  [:div {:class body-elt-bem}
   (for [{:keys [cid] :as row} rows]
     ^{:key cid}
     [body-row/widget columns row])])

(defn- head-elt-cmp [props table-width]
  [:div {:class head-elt-bem}
   [head-row/widget props table-width]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders table.

  Arguments:
  * `:props` - map:
    - `:cid` - required, keyword. Component id.
    - `:columns` - seq of maps:
      * `:cid` - required, keyword. Component id.
    - `:rows` - seq of maps:
      * `:cid` - required, keyword. Component id.

  TODO:
  * add `ready?` prop"
  [props]
  (let [{:keys [on-resize]} props]
    (r/create-class
      {:reagent-render
       (fn [{:keys [width] :as props}]
         [:div {:class (build-class props)}
          [head-elt-cmp
           (select-keys props [:columns :column-resizing :on-end-column-resizing :on-start-column-resizing])
           width]
          [body-elt-cmp (select-keys props [:columns :rows])]])
       :component-did-mount
       (fn [this]
         (on-resize (-> this r/dom-node gdom/getParentElement (oops/oget "clientWidth"))))})))
