var hljs = require('highlight.js/lib/highlight');
var hljsClojure = require('highlight.js/lib/languages/clojure');
var marked = require('marked');

window.hljs = hljs;
window.marked = marked;

hljs.registerLanguage('clojure', hljsClojure);
