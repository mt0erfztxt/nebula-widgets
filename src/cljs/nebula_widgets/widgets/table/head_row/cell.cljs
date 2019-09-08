(ns nebula-widgets.widgets.table.head-row.cell
  (:require
    [goog.events :as gevents]
    [goog.events.EventType :as EventType]
    [nebula-widgets.utils.bem :as bem-utils]
    [oops.core :as oops]
    [reagent.core :as r]))

(def ^:private bem "nw-table-headRow-cell")
(def ^:private resize-handle-elt-bem (str bem "__resizeHandle"))

(defn- build-class
  [{:keys [cid resizing?]}]
  (bem-utils/build-class
    bem
    [["cid" cid]
     ["resizing" resizing?]]))

(defn- resize-handle-cmp
  [resize-handle-node cid on-end-resizing on-start-resizing]
  (let [listener-keys (atom nil)]
    (r/create-class
      {:display-name "nebula-widgets.widgets.table.head-row.cell.resize-handle-cmp"
       :reagent-render
       (fn [_ _ _ _]
         [:span {:class resize-handle-elt-bem}])
       :component-did-mount
       (fn [this]
         (let [node (r/dom-node this)]
           (reset! resize-handle-node node)
           (reset!
             listener-keys
             [(gevents/listen
                node
                EventType/MOUSEDOWN
                (fn [_]
                  (gevents/listenOnce
                    js/document
                    EventType/MOUSEUP
                    (fn [_]
                      (oops/oset! node "style.!left" nil)   ; TODO Does we really need that?
                      (on-end-resizing cid)))
                  (on-start-resizing cid node)))])))
       :component-will-unmount
       (fn [_]
         (doseq [k @listener-keys]
           (when k
             (gevents/unlistenByKey k))))})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [_column _on-end-resizing _on-start-resizing resize-handle-node]
  (r/create-class
    {:display-name "nebula-widgets.widgets.table.head-row.cell"
     :reagent-render
     (fn [{:keys [cid title width] :as column} on-end-resizing on-start-resizing]
       [:div
        {:class (build-class column)
         :style (when (and width (pos? width)) {:width width})}
        title
        [resize-handle-cmp resize-handle-node cid on-end-resizing on-start-resizing]])}))
