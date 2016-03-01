module.exports = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#tmpl-todo-item').html()),

  events: {
    'change .js-toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.$el.data('model-id', this.model.id);
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  destroy: function() {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
