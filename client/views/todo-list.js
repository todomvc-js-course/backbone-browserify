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

    this.listenTo(todoCollection, 'add', this.appendOne);
    this.listenTo(todoCollection, 'remove', this.removeOne);
    this.listenTo(todoCollection, 'reset', this.replaceAll);
    this.listenTo(state, 'change:filter', this.changeFilter);

    todoCollection.fetch({
      reset: true
    });
  },

  toggleAll: function() {
    var hasAllCompleted = todoCollection.every(function(model) {
      return model.get('completed');
    });

    todoCollection.each(function(model) {
      model.toggle(!hasAllCompleted);
    });
  },

  changeFilter: function() {
    var id = state.get('filter');

    todoCollection.each(function(model) {
      var isCompleted = model.get('completed');

      switch (id) {
        case 'all':
          model.set('hidden', false);
          break;
        case 'active':
          model.set('hidden', isCompleted);
          break;
        case 'completed':
          model.set('hidden', !isCompleted);
          break;
      }
    });
  },

  appendOne: function(todo) {
    var view = new TodoView({
      model: todo
    });
    this.$container.append(view.render().el);
  },

  replaceAll: function() {
    this.$container.empty();
    todoCollection.each(this.appendOne, this);
  },

  removeOne: function(model) {
    this.$container.find('li').each(function() {
      var $todo = $(this);

      if ($todo.data('model-id') === model.id) {
        $todo.remove();
      }
    });
  }
});
