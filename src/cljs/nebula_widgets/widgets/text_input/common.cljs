(ns nebula-widgets.widgets.text-input.common)

(def ^:private placement-prop-set
  #{:after :before})

(def ^:private size-prop-set
  #{:large :normal :small})

(defn get-placement-prop [placement]
  (-> placement keyword placement-prop-set (or :after)))

(defn get-size-prop [size]
  (-> size keyword size-prop-set (or :normal)))
