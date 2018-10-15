(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.db)

(def default-db
  {:checkbox-group-input-widget
   {:example010 {:value #{}}
    :example020 {:value #{:option1 :option3}}
    :example025 {:value {:option1 true, :option3 true}}
    :example030 {:value #{:option1 :option3 :option4}}
    :example040 {:value #{:option1 :option2}}
    :example900
    {:disabled false
     :invalid false
     :label-shrinked false
     :value #{:option1 :option3 :option4}
     :widget "icon"}}})
