(ns nebula-widgets.runner
  (:require
    [doo.runner :refer-macros [doo-tests]]
    ;[nebula-widgets.widgets.app-panel.core-test]
    [nebula-widgets.utils-test]
    [nebula-widgets.utils.bem-test]))

(doo-tests
  ;'nebula-widgets.widgets.app-panel.core-test ; FIXME: cause error in phantom
  'nebula-widgets.utils-test
  'nebula-widgets.utils.bem-test)