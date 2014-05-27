goog.provide('myproject.start');

goog.require('goog.dom');

myproject.start = function () {
  var newHeader = goog.dom.createDom('h1', {'style': 'background_color: #EEE'},
    'Hello World');
  goog.dom.appendChild(document.body, newHeader);
}
