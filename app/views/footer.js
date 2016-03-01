var todoCollection = require('app/models/todo-list.js');
var state = require('app/models/state.js');

module.exports = Backbone.View.extend({
  el: '[data-view="footer"]',

  template: _.template($('#tmpl-footer').html()),

  events: {
    'click .js-clear-completed': 'removeCompleted'
  },

  initialize: function() {
    this.listenTo(todoCollection, 'add', this.render);
    this.listenTo(todoCollection, 'update', this.render);
    this.listenTo(todoCollection, 'reset', this.render);
    this.listenTo(todoCollection, 'change:completed', this.render);
    this.listenTo(state, 'change:filter', this.render);
  },

  removeCompleted: function() {
    var completed = todoCollection.filter(function(model) {
      return model.get('completed');
    });
    completed.forEach(function(model) {
      model.destroy();
    });
    todoCollection.remove(completed);
  },

  render: function() {
    var data = {
      remaining: todoCollection.remaining().length,
      completed: todoCollection.completed().length,
      filter: state.get('filter')
    };
    this.$el.html(this.template(data));
    return this;
  }
});
