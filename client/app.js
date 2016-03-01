var AppView = require('views/app.js');
var AppRouter = require('./router.js');

$(function() {
  new AppRouter();
  new AppView();
  Backbone.history.start();
});
