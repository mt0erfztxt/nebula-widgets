(ns nebula-widgets.kitchen-sink.panels.button-widget.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.widgets.button.core :as button]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let [href (routes/resolve :widgets/button)]
    [:div.buttonWidgetPanel
     [man-page/widget {:title "Button widget"}
      [markdown/widget
       (str (-> #'button/widget meta :doc)
            "\n\n## Examples")]
      [example/widget {:cid "010", :title "default button"}
       [:<>
        [button/widget {:cid "010", :text "Normal"}]
        [button/widget {:cid "020", :disabled true, :text "Disabled"}]
        [button/widget {:cid "030", :href href, :text "Link"}]]
       "```clojure
         [button/widget {}]
         ```"]
      [example/widget {:cid "020", :title "flat button"}
       [:<>
        [button/widget {:cid "010", :flat true, :text "Normal"}]
        [button/widget {:cid "020", :disabled true, :flat true, :text "Disabled"}]
        [button/widget {:cid "030", :flat true, :href href, :text "Link"}]]
       "```clojure
         [button/widget {:flat true}]
         ```"]
      [example/widget {:cid "030", :title "primary button"}
       [:<>
        [button/widget {:cid "010", :primary true, :text "Normal"}]
        [button/widget {:cid "020", :disabled true, :primary true, :text "Disabled"}]
        [button/widget {:cid "030", :href href, :primary true, :text "Link"}]
        [button/widget {:cid "040", :primary true, :secondary true, :text "Primary+Secondary"}]]
       "```clojure
         [button/widget {:primary true}]
         ```"]
      [example/widget {:cid "040", :title "secondary button"}
       [:<>
        [button/widget {:cid "010", :secondary true, :text "Normal"}]
        [button/widget {:cid "020", :disabled true, :secondary true, :text "Disabled"}]
        [button/widget {:cid "030", :href href, :secondary true, :text "Link"}]]
       "```clojure
         [button/widget {:secondary true}]
         ```"]]]))
