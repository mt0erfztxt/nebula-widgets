(ns nebula-widgets.kitchen-sink.routes
  (:refer-clojure :exclude [resolve])
  (:require
    [bide.core :as bide]))

(def router
  (bide/router
    [["/" :home]
     ["/widgets/app-panel" :widgets/app-panel]
     ["/widgets/button" :widgets/button]
     ["/widgets/button-group" :widgets/button-group]
     ["/widgets/button-group-set" :widgets/button-group-set]
     ["/widgets/card" :widgets/card]
     ["/widgets/checkable-group-input-form-field" :widgets/checkable-group-input-form-field]
     ["/widgets/checkable-group-input" :widgets/checkable-group-input]
     ["/widgets/checkable-input" :widgets/checkable-input]
     ["/widgets/form" :widgets/form]
     ["/widgets/form-field" :widgets/form-field]
     ["/widgets/group-input" :widgets/group-input]
     ["/widgets/text-group-input-form-field" :widgets/text-group-input-form-field]
     ["/widgets/text-group-input" :widgets/text-group-input]
     ["/widgets/text-input" :widgets/text-input]]))

(defn match [url]
  (bide/match router url))

(defn navigate! [& args]
  (apply bide/navigate! router args))

(defn resolve [& args]
  (apply bide/resolve router args))
