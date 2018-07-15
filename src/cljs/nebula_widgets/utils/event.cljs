(ns nebula-widgets.utils.event)

(defn- make-setter-event-handler [& ks]
  "Accepts path in app db to set/update and returns handler (for re-frame's db event) that accepts new value.
  When new value is a function it would receive old value and must return new one."
  (fn [db [_ value]]
    ((if (fn? value) update-in assoc-in)
      db ks value)))
