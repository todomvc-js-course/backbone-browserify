var TodoModel = Backbone.Model.extend({
  urlRoot: '/api/todos/',

  defaults: function() {
    return {
      id: Date.now(),
      hidden: false
    };
  },

  toggle: function() {
    this.setCompleted(!this.get('completed'));
  },

  setCompleted: function(completed) {
    this.set('completed', completed);
    this.save({
      completed: completed
    });
  }
});

module.exports = TodoModel;
