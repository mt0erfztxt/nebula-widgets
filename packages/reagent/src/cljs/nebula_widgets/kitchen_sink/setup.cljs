(ns nebula-widgets.kitchen-sink.setup
  (:import
    [goog Uri]
    [goog.events EventType]
    [goog.history Html5History])
  (:require
    [bide.core :as bide]
    [goog.events :as gevents]
    [nebula-widgets.kitchen-sink.routes :as routes]
    [oops.core :as oops]
    [re-frame.core :as rf]))

(defn- init-navigation!-build-html5history-transformer
  "Returns token custom transformer for `goog.history.Html5History`. Needed
  because default one causes browser URL to have query string duplicated each
  time page is reloaded."
  []
  (let [transformer (Html5History.TokenTransformer.)]
    (set!
      (.. transformer -retrieveToken)
      (fn [_ location]
        (str (.-pathname location) (.-search location))))
    (set!
      (.. transformer -createUrl)
      (fn [token path-prefix _]
        (str path-prefix token)))
    transformer))

(defn- init-navigation!-find-href-node
  "Given a DOM element that may or may not be a link, traverse up the DOM tree
  to see if any of its parents are links. If so, return the node."
  [elem]
  (if (oops/oget elem "?href")
    elem
    (when-let [parent (oops/oget elem "parentNode")]
      (recur parent))))

(defn- init-navigation!-href-to-external-resource? [href-node]
  (re-find #"^(?:\w+\:|)//"
           (oops/oget href-node "attributes.href.nodeValue")))

(defn init-navigation!
  "Setups navigation to use HTML5 History API. Also prevents page reload when
  user clicks on links that lead to other parts of application, external links
  work as usual."
  [router options]
  (let [html5history-transformer (init-navigation!-build-html5history-transformer)
        html5history (fn [] (Html5History. js/window html5history-transformer))]
    ;; Prevent navigation on "A" elements that have 'href' attribute matching
    ;; route registered in application router.
    (gevents/listen
      js/window
      EventType.CLICK
      (fn [event]
        (when-let [href-node (init-navigation!-find-href-node (oops/oget event "target"))]
          ;; We handle only internal links and don't augment behavior of external
          ;; links. Internal link is a relative link, e.g. '/', '/ru-ru',
          ;; 'assets/icon.png'. External link is a link with scheme, e.g.
          ;; 'http://a.bc', '//a.bc'.
          (when-not (init-navigation!-href-to-external-resource? href-node)
            (let [uri (Uri. (oops/oget href-node "href"))
                  uri-path (.getPath uri)
                  uri-query (.getQuery uri)
                  tok (str uri-path
                           (when (not-empty uri-query) (str "?" uri-query)))]
              (when-let [[id params query] (bide/match routes/router tok)]
                (oops/ocall event "preventDefault")
                (bide/navigate! routes/router id params query)))))))
    ;; Start listen to history events.
    (bide/start!
      router
      {:default (:default options)
       :html5? true
       :html5history html5history
       :on-navigate #(rf/dispatch [:app/set-route {:id %1 :params %2 :query %3}])})))
