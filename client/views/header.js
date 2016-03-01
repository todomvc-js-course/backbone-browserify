var todoCollection = require('models/todo-list.js');
var TodoModel = require('models/todo-item.js');

module.exports = Backbone.View.extend({
  el: '[data-view="header"]',

  events: {
    'submit': 'onSubmit'
  },

  initialize: function() {
    this.$input = this.$('.js-input');
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.addTodo(this.$input.val());
  },

  addTodo: function(title) {
    if (!title) {
      return;
    }
    var data = {
      title: title.trim(),
      completed: false
    };
    todoCollection.addTodo(new TodoModel(data));
    this.$input.val('');
  }
});
