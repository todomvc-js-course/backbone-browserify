var AppView = require('app/views/app.js');
var AppRouter = require('app/router.js');

$(function() {
  new AppRouter();
  new AppView();
  Backbone.history.start();
});
