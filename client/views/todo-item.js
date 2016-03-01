module.exports = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#tmpl-todo-item').html()),

  events: {
    'change .js-toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  destroy: function() {
    this.remove();
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
