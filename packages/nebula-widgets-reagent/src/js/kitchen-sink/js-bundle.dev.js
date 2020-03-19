const hljs = require("highlight.js/lib/highlight");
const hljsClojure = require("highlight.js/lib/languages/clojure");
const marked = require("marked");

window.hljs = hljs;
window.marked = marked;

hljs.registerLanguage("clojure", hljsClojure);
