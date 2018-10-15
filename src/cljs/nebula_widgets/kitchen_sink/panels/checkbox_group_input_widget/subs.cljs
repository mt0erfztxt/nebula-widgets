(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.subs
  (:require
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.common :as common]
    [re-frame.core :as rf]))

(def ^:private panel-subscription-key
  (common/panel-path->keyword))

(rf/reg-sub
  panel-subscription-key
  :<- [:panels]
  (fn [panels _]
    (get panels common/panel-key)))

(doseq [s ["010" "020" "025" "030" "040"] :let [example (keyword (str "example" s))]]
  (rf/reg-sub
    (common/panel-path->keyword example)
    :<- [panel-subscription-key]
    (fn [panel _]
      (get panel example))))
