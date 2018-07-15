(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.db)

(def default-db
  {:app-panel-widget {:bar           {:bottom {}
                                      :top    {:separated? true}}
                      :header        {:absent? false
                                      :pinned? false}
                      :left-sidebar  {:collapsed? false
                                      :gutter     "normal"
                                      :size       "normal"}
                      :right-sidebar {:collapsed? false
                                      :gutter     "normal"
                                      :size       "normal"}}})
