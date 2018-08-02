(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.subs
  (:require
    [re-frame.core :as rf]))

(rf/reg-sub
  :panels.radio-group-input-widget
  :<- [:panels]
  (fn [panels _]
    (:radio-group-input-widget panels)))

(rf/reg-sub
  :panels.radio-group-input-widget.example010
  :<- [:panels.radio-group-input-widget]
  (fn [panel _]
    (:example010 panel)))

(rf/reg-sub
  :panels.radio-group-input-widget.example020
  :<- [:panels.radio-group-input-widget]
  (fn [panel _]
    (:example020 panel)))

(rf/reg-sub
  :panels.radio-group-input-widget.example030
  :<- [:panels.radio-group-input-widget]
  (fn [panel _]
    (:example030 panel)))

(rf/reg-sub
  :panels.radio-group-input-widget.example040
  :<- [:panels.radio-group-input-widget]
  (fn [panel _]
    (:example040 panel)))
