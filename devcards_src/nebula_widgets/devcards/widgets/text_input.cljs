(ns nebula-widgets.devcards.widgets.text-input
  (:require-macros
    [devcards.core :refer [defcard defcard-rg]])
  (:require
    [nebula-widgets.widgets.text-input :as text-input]))

(defcard-rg text-input-card
  [text-input/widget {:busy? true}])
