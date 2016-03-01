var TodoModel = require('app/models/todo-item.js')

var TodoCollection = Backbone.Collection.extend({
  model: TodoModel,

  url: '/api/todos/',

  comparator: 'title',

  completed: function () {
    return this.where({completed: true});
  },

  remaining: function () {
    return this.where({completed: false});
  },

  nextOrder: function () {
    return this.length ? this.last().get('order') + 1 : 1;
  }
});

module.exports = new TodoCollection();
