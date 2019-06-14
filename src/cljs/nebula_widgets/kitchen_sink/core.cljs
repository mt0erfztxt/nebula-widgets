(ns nebula-widgets.kitchen-sink.core
  (:require
    [js-bundle]
    [nebula-widgets.kitchen-sink.events]
    [nebula-widgets.kitchen-sink.routes :as routes]
    [nebula-widgets.kitchen-sink.setup :as setup]
    [nebula-widgets.kitchen-sink.subs]
    [nebula-widgets.kitchen-sink.views :as views]
    [nebula-widgets.widgets.table.re-frame.core :as table]
    [re-frame.core :as rf]))

(defn ^:export main []
  (table/register)
  (rf/dispatch-sync [:app/initialize])
  (setup/init-navigation! routes/router {:default :home})
  (views/mount-root-view))
