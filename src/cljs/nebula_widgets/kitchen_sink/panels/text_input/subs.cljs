(ns nebula-widgets.kitchen-sink.panels.text-input.subs
  (:require
    [re-frame.core :as rf]))

(rf/reg-sub
  :text-input-panel/value
  :<- [:get-panels-text-input]
  (fn [panel _]
    (:value panel)))
