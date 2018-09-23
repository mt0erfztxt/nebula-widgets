(ns nebula-widgets.runner
  (:require
    [doo.runner :refer-macros [doo-tests]]
    [nebula-widgets.test.kitchen-sink.widgets.markdown.core-test]
    [nebula-widgets.test.widgets.app-panel.core-test]
    [nebula-widgets.test.scratch]
    [nebula-widgets.test.utils-test]
    [nebula-widgets.test.utils.bem-test]))

(doo-tests
  'nebula-widgets.test.kitchen-sink.widgets.markdown.core-test
  'nebula-widgets.test.scratch
  'nebula-widgets.test.utils-test
  'nebula-widgets.test.utils.bem-test
  'nebula-widgets.test.widgets.app-panel.core-test)         ; cause error in Phantom, but works in Karma Chrome
