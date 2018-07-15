(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.widgets.app-panel.core :as app-panel]
    [nebula-widgets.utils :as utils]
    [re-frame.core :as rf]))

(defn- sidebar-knobs-cmp [placement {:keys [collapsed? gutter size]}]
  [:<>
   [:h1 (-> placement name (str "Sidebar"))]
   [:ul
    [:li
     [:label
      [:input {:checked   collapsed?
               :on-change #(rf/dispatch [(common/build-sidebar-setter-event-name placement :collapsed?) (utils/event->checked %)])
               :type      "checkbox"}]
      "collapsed?"]]
    [:li
     [:h2 "gutter"]
     (for [s [false "small" "normal" "large"]]
       ^{:key s} [:label
                  [:input {:checked   (= gutter s)
                           :disabled  (#{"small" "large"} s)
                           :on-change #(rf/dispatch [(common/build-sidebar-setter-event-name placement :gutter) s])
                           :type      "radio"}]
                  (or s "none")])]
    [:li
     [:h2 "size"]
     (for [s ["small" "normal" "large"]]
       ^{:key s} [:label
                  [:input {:checked   (= size s)
                           :disabled  (#{"small" "large"} s)
                           :on-change #(rf/dispatch [(common/build-sidebar-setter-event-name placement :size) s])
                           :type      "radio"}]
                  s])]]])

(defn- build-sidebar-props [placement {:keys [collapsed? gutter size]}]
  {:collapsed? collapsed?
   :gutter     gutter
   :placement  placement
   :size       size})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let [*header (rf/subscribe [:app-panel-widget-panel/header])
        *left-sidebar (rf/subscribe [:app-panel-widget-panel/left-sidebar])
        *right-sidebar (rf/subscribe [:app-panel-widget-panel/right-sidebar])
        *top-bar (rf/subscribe [:app-panel-widget-panel/top-bar])]
    (fn []
      (let [{header-absent? :absent? header-pinned? :pinned? :as header} @*header
            left-sidebar @*left-sidebar
            right-sidebar @*right-sidebar
            top-bar @*top-bar]
        [:div.appPanelWidgetPanel
         [app-panel/widget
          {:bars     [{:content [:div "Content of top bar"] :placement "top" :separated? (:separated? top-bar)}]
           :head     [:div "Content of app panel head"]
           :header   (if (:absent? header) false header)
           :sidebars [(build-sidebar-props :left left-sidebar)
                      (build-sidebar-props :right right-sidebar)]}
          [:h1 "header"]
          [:ul
           [:li
            [:label
             [:input {:checked   header-absent?
                      :on-change #(rf/dispatch [(common/build-header-setter-event-name :absent?) (utils/event->checked %)])
                      :type      "checkbox"}]
             "absent?"]]
           [:li
            [:label
             [:input {:checked   header-pinned?
                      :on-change #(rf/dispatch [(common/build-header-setter-event-name :pinned?) (utils/event->checked %)])
                      :type      "checkbox"}]
             "pinned?"]]]
          [:h1 "topBar"]
          [:ul
           [:li
            [:label
             [:input {:checked   (:separated? top-bar)
                      :on-change #(rf/dispatch [(common/build-bar-setter-event-name :top :separated?) (utils/event->checked %)])
                      :type      "checkbox"}]
             "separated?"]]]
          [sidebar-knobs-cmp :left left-sidebar]
          [sidebar-knobs-cmp :right right-sidebar]]]))))
