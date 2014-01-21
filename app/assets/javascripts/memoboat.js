window.Memoboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  Vents: {},
  initialize: function (userId) {
    Memoboat.Data.userId = userId;
    Memoboat.Vents.vent = _.extend({}, Backbone.Events);

    Memoboat.Routers.router = new Memoboat.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
}; 