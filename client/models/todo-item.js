var TodoModel = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    hidden: false
  },

  urlRoot: '/api/todos/',

  toggle: function(completed) {
    completed = completed || !this.get('completed');

    this.set('completed', completed);
    this.save({
      completed: completed
    });
  }
});

module.exports = TodoModel;
