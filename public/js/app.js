(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppView = require('app/views/app.js');
var AppRouter = require('app/router.js');

$(function() {
  new AppRouter();
  new AppView();
  Backbone.history.start();
});

},{"app/router.js":5,"app/views/app.js":6}],2:[function(require,module,exports){
var StateModel = Backbone.Model.extend({
  defaults: {
    filter: 'all'
  }
});

module.exports = new StateModel();

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"app/models/todo-item.js":3}],5:[function(require,module,exports){
var state = require('app/models/state.js');

var AppRouter = Backbone.Router.extend({
  routes: {
    'filter/:id': 'setFilter'
  },

  setFilter: function(id) {
    state.set('filter', id);
  }
});

module.exports = AppRouter;

},{"app/models/state.js":2}],6:[function(require,module,exports){
var HeaderView = require('app/views/header.js');
var FooterView = require('app/views/footer.js');
var TodoListView = require('app/views/todo-list.js');

var AppView = Backbone.View.extend({
  el: '[data-view="app"]',

  initialize: function() {
    this.headerView = new HeaderView();
    this.footerView = new FooterView();
    this.todoListView = new TodoListView();
  }
});

module.exports = AppView;

},{"app/views/footer.js":7,"app/views/header.js":8,"app/views/todo-list.js":10}],7:[function(require,module,exports){
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

},{"app/models/state.js":2,"app/models/todo-list.js":4}],8:[function(require,module,exports){
var todoCollection = require('app/models/todo-list.js');
var TodoModel = require('app/models/todo-item.js');

module.exports = Backbone.View.extend({
  el: '[data-view="header"]',

  events: {
    'submit': 'onSubmit'
  },

  initialize: function() {
    this.$input = this.$('.js-input');
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.addTodo(this.$input.val());
  },

  addTodo: function(title) {
    var model = new TodoModel({
      id: Math.random(),
      title: this.$input.val(),
      completed: false
    });
    model.save();
    todoCollection.add(model);
    this.$input.val('');
  }
});

},{"app/models/todo-item.js":3,"app/models/todo-list.js":4}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var todoCollection = require('app/models/todo-list.js');
var state = require('app/models/state.js');
var TodoView = require('app/views/todo-item.js');

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
      model.set('completed', !hasAllCompleted);
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

},{"app/models/state.js":2,"app/models/todo-list.js":4,"app/views/todo-item.js":9}]},{},[1]);
