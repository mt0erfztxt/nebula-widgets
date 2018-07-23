(ns nebula-widgets.utils)

(defn calculate-prop-value
  "Returns keyword from coll of supported keywords when keyword made from value found in it or default value otherwise.
  Default value is optional and is nil by default."
  ([value supported-keywords] (calculate-prop-value value supported-keywords nil))
  ([value supported-keywords default-value] (-> value keyword ((set supported-keywords)) (or default-value))))

(defn calculate-size-like-prop-value [value]
  (calculate-prop-value value #{:large :normal :small}))

(defn event->checked [event]
  (-> event .-target .-checked))
