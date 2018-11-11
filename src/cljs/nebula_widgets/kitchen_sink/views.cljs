(ns nebula-widgets.kitchen-sink.views
  (:require
    [nebula-widgets.kitchen-sink.panels.home.views :as home-panel-views]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.views :as app-panel-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-widget.views :as button-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-group-widget.views :as button-group-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.views :as button-group-set-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.card-widget.views :as card-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.views :as checkbox-group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-item-widget.views :as checkbox-group-input-item-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.views :as form-field-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.group-input-widget.views :as group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.group-input-item-widget.views :as group-input-item-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.views :as radio-group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-item-widget.views :as radio-group-input-item-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.views :as text-input-widget-panel-views]
    [oops.core :as oops]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(defn- root-view []
  (let [*route (rf/subscribe [:app/route])]
    (fn []
      (case (:id @*route)
        :home [home-panel-views/widget]
        :widgets/app-panel [app-panel-widget-panel-views/widget]
        :widgets/button [button-widget-panel-views/widget]
        :widgets/button-group [button-group-widget-panel-views/widget]
        :widgets/button-group-set [button-group-set-widget-panel-views/widget]
        :widgets/card [card-widget-panel-views/widget]
        :widgets/checkbox-group-input [checkbox-group-input-widget-panel-views/widget]
        :widgets/checkbox-group-input-item [checkbox-group-input-item-widget-panel-views/widget]
        :widgets/form-field [form-field-widget-panel-views/widget]
        :widgets/group-input [group-input-widget-panel-views/widget]
        :widgets/group-input-item [group-input-item-widget-panel-views/widget]
        :widgets/radio-group-input [radio-group-input-widget-panel-views/widget]
        :widgets/radio-group-input-item [radio-group-input-item-widget-panel-views/widget]
        :widgets/text-input [text-input-widget-panel-views/widget]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn mount-root-view []
  (r/render [root-view] (oops/ocall js/document "getElementById" "app")))
