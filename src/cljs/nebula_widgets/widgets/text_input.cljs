(ns nebula-widgets.widgets.text-input)

(def ^:private bem
  "nw-textInput")

(def ^:private custom-props-set
  #{:busy? :cid :cns :errors :multi-line? :size :text-align})

(def ^:private size-prop-set
  #{:large :normal :small})

(def ^:private text-align-prop-set
  #{:center :left :right})

;; TODO Use bem utils.
(defn- build-class [{:keys [busy? cid cns disabled errors multi-line? size text-align]}]
  (str bem
       (when cns (str " " bem "--cns_" cns))
       (when cid (str " " bem "--cid_" cid))
       (when busy? (str " " bem "--busy"))
       (when disabled (str " " bem "--disabled"))
       (when errors (str " " bem "--invalid"))
       (when multi-line? (str " " bem "--multi-line"))
       (str " " bem "--size_" (name (or (->> size keyword size-prop-set) :normal)))
       (str " " bem "--text-align_" (name (or (->> text-align keyword text-align-prop-set) :left)))))

(defn- busy-elt-cmp
  "Component that displays 'busy' element of widget."
  []
  [:div {:class (str bem "__busy")}
   [:i.fa.fa-circle-o-notch.fa-spin]])

(defn- input-elt-cmp
  "Component that displays 'input' element of widget. Accepts widget's `props`
  map."
  [{:keys [disabled multi-line?] :as props}]
  (let [std-props (apply dissoc props :class custom-props-set)
        all-props
        (cond-> (merge {:class (str bem "__input ")} std-props)
                disabled (assoc :disabled disabled))
        input-tag (if multi-line? :textarea :input)]
    [input-tag all-props]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Component that displays text input widget. Accepts `props` map:
  * `:busy?` - optional, boolean, no default. When evaluates to logical true
    then widget would be marked as busy. Adds '--busy' BEM modifier to widget's
    element.
  * `:cid` - optional, no default. Anything that can be used as component id.
  * `:cns` - optional, no default. Anything that can be used as component ns.
  * `:disabled` - optional, boolean, no default. When evaluates to logical true
    then text input would be disabled. Adds '--diabled' BEM modifier to widget's
    element.
  * `:errors` - optional, any, no default. When evaluates to logical true then
    input would be styled as invalid. Adds '--invalid' BEM modifier to widget's
    element.
  * `:multi-line?` - optional, boolean, no default. When evaluates to logical
    true then <TEXTAREA/> tag would be used instead of <INPUT/> to render
    widget's input element. Adds '--multi-line' BEM modifier to widget's
    element.
  * `:size` - optional, one of `:large`, `:normal`, `:small` or their
    string/symbol equivalents, `:normal` by default. Allows to set widget size.
    Adds '--size_' BEM modifier to widget's element.
  * `:text-align` - optional, one of `:center`, `:left`, `:right` or their
    string/symbol equivalents, `:left` by default. Allows to set text alignment.
    Adds '--text-align_' BEM modifier to widget's element.
  * Any other props that React supports on <INPUT/> (or <TEXTAREA/> when
    `:multi-line?`) tag."
  [props]
  [:div {:class (build-class props)}
   [input-elt-cmp props]
   [busy-elt-cmp]])
