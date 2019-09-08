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

(def ^:private body-elt-cmp-props-vec
  [:column-order
   :rows])

(def ^:private head-elt-cmp-props-vec
  [:column-order
   :column-resizing
   :column-titles
   :column-widths
   :on-end-column-resizing
   :on-start-column-resizing])

(defn- build-class
  [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

(defn- body-elt-cmp
  [{:keys [column-order rows]}]
  [:div {:class body-elt-bem}
   (for [{:keys [cid] :as row} rows]
     ^{:key cid}
     [body-row/widget column-order row])])

(defn- head-elt-cmp
  [props]
  [:div {:class head-elt-bem}
   [head-row/widget props]])

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
      {:display-name "nebula-widgets.widgets.table.core.widget"
       :reagent-render
       (fn [props]
         [:div {:class (build-class props)}
          [head-elt-cmp (select-keys props head-elt-cmp-props-vec)]
          [body-elt-cmp (select-keys props body-elt-cmp-props-vec)]])
       :component-did-mount
       (fn [this]
         (on-resize (-> this r/dom-node gdom/getParentElement (oops/oget "clientWidth"))))})))
