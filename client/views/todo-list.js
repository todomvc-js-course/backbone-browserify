var todoCollection = require('models/todo-list.js');
var state = require('models/state.js');
var TodoView = require('views/todo-item.js');

module.exports = Backbone.View.extend({
  el: '[data-view="todo-list"]',

  events: {
    'change .js-toggle-all': 'toggleAll'
  },

  initialize: function() {
    this.$container = this.$('.js-container');

    this.listenTo(todoCollection, 'add', this.append);
    this.listenTo(state, 'change:filter', this.changeFilter);

    todoCollection.fetch();
  },

  toggleAll: function() {
    todoCollection.toggleAll();
  },

  changeFilter: function() {
    var id = state.get('filter');
    todoCollection.changeFilter(id);
  },

  append: function(todo) {
    var view = new TodoView({
      model: todo
    });
    this.$container.append(view.render().el);
  }
});
