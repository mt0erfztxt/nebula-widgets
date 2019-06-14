(ns nebula-widgets.widgets.table.head-row.cell
  (:require
    [goog.events :as gevents]
    [goog.events.EventType :as EventType]
    [goog.style :as gstyle]
    [nebula-widgets.utils.bem :as bem-utils]
    [oops.core :as oops]
    [reagent.core :as r]))

(def ^:private bem "nw-table-headRow-cell")
(def ^:private resize-handle-elt-bem (str bem "__resizeHandle"))

(defn- build-class [{:keys [cid resizing?]}]
  (bem-utils/build-class
    bem
    [["cid" cid]
     ["resizing" resizing?]]))

(defn- resize-handle-cmp [resize-handle-node cid on-end-resizing on-start-resizing]
  (let [listener-keys (atom [])]
    (r/create-class
      {:display-name resize-handle-elt-bem
       :reagent-render
       (fn [_ _ _ _]
         [:span {:class resize-handle-elt-bem}])
       :component-did-mount
       (fn [this]
         (let [node (r/dom-node this)]
           (reset! resize-handle-node node)
           (reset! listener-keys
                   [(gevents/listen node
                                    EventType/MOUSEDOWN
                                    (fn [_]
                                      (gevents/listenOnce
                                        js/document
                                        EventType/MOUSEUP
                                        (fn [_]
                                          (oops/oset! node "style.!left" nil) ; TODO Does we really need that?
                                          (on-end-resizing cid)))
                                      (on-start-resizing cid)))])))
       :component-will-unmount
       (fn [_]
         (doseq [k (seq @listener-keys)]
           (when k
             (gevents/unlistenByKey k))))})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget [column _on-end-resizing _on-start-resizing]
  (let [listener-keys (atom [])
        resizing? (atom (:resizing? column))
        resize-handle-node (atom nil)]
    (r/create-class
      {:display-name bem
       :reagent-render
       (fn [{:keys [cid title width] :as column} on-end-resizing on-start-resizing]
         [:div
          {:class (build-class column)
           :style (when (and width (pos? width)) {:width width})}
          title
          [resize-handle-cmp resize-handle-node cid on-end-resizing on-start-resizing]])
       :component-did-mount
       (fn [this]
         (let [node (r/dom-node this)]
           (reset! listener-keys
                   [(gevents/listen node
                                    EventType/MOUSEMOVE
                                    (fn [event]
                                      (let [resize-handle-node @resize-handle-node]
                                        (when (and resize-handle-node @resizing?)
                                          (let [bounds (->> node gstyle/getBounds)
                                                max-x (-> bounds (oops/oget "width") (- 2)) ; 2 from cell's left and right 1px borders
                                                x (-> bounds
                                                    (oops/oget "left")
                                                    (- (oops/oget event "clientX"))
                                                    (Math/abs)
                                                    (Math/floor)
                                                    (#(if (> % max-x) max-x %)))]
                                            (gstyle/setPosition resize-handle-node x))))))])))
       :component-did-update
       (fn [this old-argv]
         (let [[old-resizing? new-resizing?] (map #(-> % second :resizing?) [old-argv (r/argv this)])]
           (when (not= new-resizing? old-resizing?)
             (reset! resizing? new-resizing?))))
       :component-will-unmount
       (fn [_]
         (doseq [k (seq @listener-keys)]
           (when k
             (gevents/unlistenByKey k))))})))
