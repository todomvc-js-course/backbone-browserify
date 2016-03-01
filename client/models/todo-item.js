var TodoModel = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    hidden: false
  },

  urlRoot: '/api/todos/',

  toggle: function () {
    var isCompleted = this.get('completed');

    this.set('completed', !isCompleted);
    this.save({
      completed: !isCompleted
    });
  }
});

module.exports = TodoModel;
