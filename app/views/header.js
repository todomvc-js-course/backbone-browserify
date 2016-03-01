var todoCollection = require('app/models/todo-list.js');
var TodoModel = require('app/models/todo-item.js');

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
    var model = new TodoModel({
      id: Math.random(),
      title: this.$input.val(),
      completed: false
    });
    model.save();
    todoCollection.add(model);
    this.$input.val('');
  }
});
