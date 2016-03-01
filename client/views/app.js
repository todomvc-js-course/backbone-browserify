var HeaderView = require('app/views/header.js');
var FooterView = require('app/views/footer.js');
var TodoListView = require('app/views/todo-list.js');

var AppView = Backbone.View.extend({
  el: '[data-view="app"]',

  initialize: function() {
    this.headerView = new HeaderView();
    this.footerView = new FooterView();
    this.todoListView = new TodoListView();
  }
});

module.exports = AppView;
