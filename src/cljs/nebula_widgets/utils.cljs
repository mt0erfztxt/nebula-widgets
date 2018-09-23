(ns nebula-widgets.utils
  (:require
    [clojure.string :as str]
    [oops.core :as oops]))

(defn calculate-prop-value
  "Returns keyword from coll of supported keywords when keyword made from value found in it or default value otherwise.
  Default value is optional and is nil by default."
  ([value supported-keywords] (calculate-prop-value value supported-keywords nil))
  ([value supported-keywords default-value]
   (-> value
       (keyword)
       ((set supported-keywords))
       (or default-value))))

(defn calculate-size-like-prop-value [value]
  (calculate-prop-value value #{:large :normal :small}))

(defn event->checked [event]
  (oops/oget event "target.checked"))

(defn path-str->segments
  "Returns lazy seq of segments (strings) obtained by splitting passed in string on dot character. Returned seq doesn't
  contain blank items and each item is whitespace-trimmed."
  [path-str]
  (->> (str/split path-str #"\.")
       (remove str/blank?)
       (map str/trim)))

(defn segments->path-str
  "Returns string of whitespace-trimmed segments joined by dot character. Empty and slash segments are ignored. Returns
  nil when result is a blank string."
  [segments]
  (->> segments
       (remove str/blank?)
       (map #(-> % name str/trim))
       (remove (partial = "/"))
       (interpose ".")
       (apply str)
       (#(when-not (str/blank? %) %))))

(defn path->keyword
  "Returns keyword which namespace obtained by dot-joining path segments from before first slash segment and name by
  dot-joining the rest of segments."
  [& segments]
  (->> segments
       (split-with #(-> % name (not= "/")))
       (map segments->path-str)
       (remove str/blank?)
       (apply keyword)))

;; TODO: Maybe rename `event-name?` options to just `event?`?
(defn keyword->path
  "Splits keyword's namespace, if any, and name by dot symbol and returns them as seq of strings. First segment of
  keyword's name would be omitted when event-name? option (false by default) is true. When keywordize? option is true
  (default) seq of keywords would be returned."
  ([k] (keyword->path k nil))
  ([k {:keys [event-name? keywordize?] :or {event-name? false keywordize? true}}]
   (let [[ns-segments name-segments] (map #(str/split % #"\.") ((juxt namespace name) k))
         concat-segments #(->> % (into ns-segments) flatten (remove empty?))]
     (cond->> name-segments
              (true? event-name?) rest                      ; event name is a first segment of keyword's name
              concat-segments concat-segments
              (true? keywordize?) (map keyword)))))

;; TODO: Unused?
;; TODO: Tests.
(defn- set-map-defaults
  "Accepts two maps and returns map which is a result of merging key-value pairs from second map into first when first
  map doesn't contain key from second or when replace-nil option is set to true."
  ([m defaults] (set-map-defaults m defaults nil))
  ([m defaults {:keys [replace-nil?] :or {replace-nil? true}}]
   (reduce
     (fn [acc [k v]]
       (if (or (not (contains? m k))
               (and (nil? (get m k)) replace-nil?))
         (assoc acc k v) acc))
     m
     defaults)))

(defn update-hcp-props
  "Accepts seq with first optional props map element and optional children elements and updates props using specified
  updater. When no props map in seq then updater would be called with empty map. Returns Hiccup vector with updated
  props map as first element and all children elements from args."
  [args updater]
  (let [[p & c :as args] (if (sequential? args) args [args])
        has-props? (map? p)
        props (updater (if has-props? p {}))]
    (into [props] (if has-props? c args))))
