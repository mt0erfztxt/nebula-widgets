(ns nebula-widgets.kitchen-sink.panels.card-widget.subs
  (:require
    [re-frame.core :as rf]))

(rf/reg-sub
  :card-widget-panel
  :<- [:panels]
  (fn [panels _]
    (:card-widget panels)))

(rf/reg-sub
  :card-widget-panel/bottom-bar
  :<- [:card-widget-panel]
  (fn [panel _]
    (-> panel :bar :bottom)))

(rf/reg-sub
  :card-widget-panel/top-bar
  :<- [:card-widget-panel]
  (fn [panel _]
    (-> panel :bar :top)))
