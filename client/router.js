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
