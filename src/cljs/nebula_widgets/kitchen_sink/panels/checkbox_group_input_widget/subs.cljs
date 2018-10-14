(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.subs
  (:require
    [re-frame.core :as rf]))

(rf/reg-sub
  :panels.checkbox-group-input-widget
  :<- [:panels]
  (fn [panels _]
    (:checkbox-group-input-widget panels)))

(rf/reg-sub
  :panels.checkbox-group-input-widget.example010
  :<- [:panels.checkbox-group-input-widget]
  (fn [panel _]
    (:example010 panel)))

(rf/reg-sub
  :panels.checkbox-group-input-widget.example020
  :<- [:panels.checkbox-group-input-widget]
  (fn [panel _]
    (:example020 panel)))

(rf/reg-sub
  :panels.checkbox-group-input-widget.example030
  :<- [:panels.checkbox-group-input-widget]
  (fn [panel _]
    (:example030 panel)))

(rf/reg-sub
  :panels.checkbox-group-input-widget.example040
  :<- [:panels.checkbox-group-input-widget]
  (fn [panel _]
    (:example040 panel)))
