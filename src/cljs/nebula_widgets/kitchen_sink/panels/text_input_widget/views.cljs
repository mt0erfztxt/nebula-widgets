(ns nebula-widgets.kitchen-sink.panels.text-input-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.text-input-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input :as ie-rgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget
   {:cid "010"
    :title "busy widget"}
   [text-input/widget
    {:busy true
     :on-change identity
     :value "Doing something..."}]
   "```clj
     [text-input/widget
      {:busy true
       :value \"Doing something...\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget
   {:cid "020"
    :title "disabled widget"}
   [text-input/widget
    {:disabled true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:disabled true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [example/widget
   {:cid "030"
    :title "invalid widget with errors"}
   [text-input/widget
    {:errors #{"error 1" "error 2"}
     :invalid true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:errors #{\"error 1\" \"error 2\"}
       :invalid true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 040
;;------------------------------------------------------------------------------

(defn- example040-cmp []
  [example/widget
   {:cid "040"
    :title "multi-line widget"}
   [text-input/widget
    {:multi-line true
     :on-change identity
     :value "Some text"}]
   "```clj
     [text-input/widget
      {:multi-line true
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 050
;;------------------------------------------------------------------------------

(defn- example050-cmp []
  [example/widget
   {:cid "050"
    :title "widget of different sizes"}
   [text-input/widget
    {:on-change identity
     :size "large"
     :value "Large size"}]
   [text-input/widget
    {:on-change identity
     :size "normal"
     :value "Normal size"}]
   [text-input/widget
    {:on-change identity
     :size "small"
     :value "Small size"}]
   "```clj
     [text-input/widget
      {:size \"large\"
       :value \"Some text\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 060
;;------------------------------------------------------------------------------

(defn- example060-cmp []
  [example/widget
   {:cid "060"
    :title "widget of text alignment"}
   [text-input/widget
    {:on-change identity
     :text-alignment "left"
     :value "Left"}]
   [text-input/widget
    {:on-change identity
     :text-alignment "center"
     :value "Center"}]
   [text-input/widget
    {:on-change identity
     :text-alignment "right"
     :value "Right"}]
   "```clj
     [text-input/widget
      {:text-alignment \"left\"
       :value \"Some text\"}]
     ```"])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.textInputWidgetPanel
   [man-page/widget
    "# Text input widget"
    (-> #'text-input/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]
    [example050-cmp]
    [example060-cmp]
    "## Interactive example"]])
