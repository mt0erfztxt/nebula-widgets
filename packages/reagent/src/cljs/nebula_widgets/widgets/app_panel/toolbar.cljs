(ns nebula-widgets.widgets.app-panel.toolbar
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-appPanel-toolbar")

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders toolbar of application panel.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:content` - map or renderable, no default. When a map it's same as a `props` in action-bar.
    - `:placement` - required, one of :bottom, :top or their string/symbol equivalents. Toolbar placement."
  [{:keys [content placement]}]
  [:div {:class (bem-utils/build-class bem [["placement" placement]])}
   (if (map? content) "Not implemented" content)])
