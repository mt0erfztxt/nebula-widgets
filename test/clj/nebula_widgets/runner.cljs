(ns nebula-widgets.runner
  (:require
    [doo.runner :refer-macros [doo-tests]]
    [nebula-widgets.utils-test]))

(doo-tests
  'nebula-widgets.utils-test)
