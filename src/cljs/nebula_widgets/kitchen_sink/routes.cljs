(ns nebula-widgets.kitchen-sink.routes
  (:refer-clojure :exclude [resolve])
  (:require
    [bide.core :as bide]))

(def router
  (bide/router
    [["" :home]
     ["/widgets/app-panel" :widgets/app-panel]
     ["/widgets/card" :widgets/card]
     ["/widgets/radio-group-input" :widgets/radio-group-input]
     ["/widgets/text-input" :widgets/text-input]]))

(defn match [url]
  (bide/match router url))

(defn navigate! [& args]
  (apply bide/navigate! router args))

(defn resolve [& args]
  (apply bide/resolve router args))
