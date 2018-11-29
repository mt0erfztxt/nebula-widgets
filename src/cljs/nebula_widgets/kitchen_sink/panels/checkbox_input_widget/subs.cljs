(ns nebula-widgets.kitchen-sink.panels.checkbox-input-widget.subs
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-input-widget.common :as common]
    [re-frame.core :as rf]))

(def ^:private panel-subscription-key
  (common/panel-path->keyword))

(rf/reg-sub
  panel-subscription-key
  :<- [:panels]
  (fn [panels _]
    (get panels common/panel-key)))

(rf/reg-sub
  (common/panel-path->keyword :interactive-example)
  :<- [panel-subscription-key]
  (fn [panel _]
    (:interactive-example panel)))
