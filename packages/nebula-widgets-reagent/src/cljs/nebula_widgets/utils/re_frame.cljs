(ns nebula-widgets.utils.re-frame
  (:require
    [nebula-widgets.utils :as utils]))

(defn make-setter-event-handler
  "Accepts event as keyword and returns function to be used as re-frame's db handler."
  [event]
  (let [path (utils/keyword->path event {:event-name? true})]
    (fn [db [_ value]]
      ((if (fn? value) update-in assoc-in)
        db path value))))
