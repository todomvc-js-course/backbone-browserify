var TodoModel = require('models/todo-item.js')

var TodoCollection = Backbone.Collection.extend({
  model: TodoModel,

  url: '/api/todos/',

  comparator: 'id',

  completed: function () {
    return this.where({
      completed: true
    });
  },

  remaining: function () {
    return this.where({
      completed: false
    });
  },

  changeFilter: function(filter) {
    todoCollection.each(function(model) {
      var isCompleted = model.get('completed');

      switch (filter) {
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

  toggleAll: function() {
    var hasAllCompleted = this.every(function(model) {
      return model.get('completed');
    });

    this.each(function(model) {
      model.setCompleted(!hasAllCompleted);
    });
  }
});

module.exports = new TodoCollection();
