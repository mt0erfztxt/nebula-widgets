(ns nebula-widgets.kitchen-sink.views
  (:require
    [nebula-widgets.kitchen-sink.panels.action-group-widget.views :as action-group-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.action-group-action-widget.views :as action-group-action-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.views :as app-panel-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.views :as button-group-set-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-group-widget.views :as button-group-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.button-widget.views :as button-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.card-widget.views :as card-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.views :as checkable-group-input-form-field-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.views :as checkable-group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.checkable-input-widget.views :as checkable-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.views :as form-field-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.form-widget.views :as form-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.group-input-widget.views :as group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.home.views :as home-panel-views]
    [nebula-widgets.kitchen-sink.panels.tab-group-widget.views :as tab-group-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.views :as text-group-input-form-field-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.views :as text-group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.views :as text-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.table-widget.views :as table-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.toolbar-widget.views :as toolbar-widget-panel-views]
    [oops.core :as oops]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(defn- root-view []
  (let [*route (rf/subscribe [:app/route])]
    (fn []
      (case (:id @*route)
        :home [home-panel-views/widget]
        :widgets/action-group [action-group-widget-panel-views/widget]
        :widgets/action-group-action [action-group-action-widget-panel-views/widget]
        :widgets/app-panel [app-panel-widget-panel-views/widget]
        :widgets/button [button-widget-panel-views/widget]
        :widgets/button-group [button-group-widget-panel-views/widget]
        :widgets/button-group-set [button-group-set-widget-panel-views/widget]
        :widgets/card [card-widget-panel-views/widget]
        :widgets/checkable-group-input-form-field [checkable-group-input-form-field-widget-panel-views/widget]
        :widgets/checkable-group-input [checkable-group-input-widget-panel-views/widget]
        :widgets/checkable-input [checkable-input-widget-panel-views/widget]
        :widgets/form [form-widget-panel-views/widget]
        :widgets/form-field [form-field-widget-panel-views/widget]
        :widgets/group-input [group-input-widget-panel-views/widget]
        :widgets/text-group-input-form-field [text-group-input-form-field-widget-panel-views/widget]
        :widgets/text-group-input [text-group-input-widget-panel-views/widget]
        :widgets/text-input [text-input-widget-panel-views/widget]
        :widgets/tab-group [tab-group-widget-panel-views/widget]
        :widgets/table [table-widget-panel-views/widget]
        :widgets/toolbar [toolbar-widget-panel-views/widget]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn mount-root-view []
  (r/render [root-view] (oops/ocall js/document "getElementById" "app")))
