window.Memoboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  initialize: function (userId) {
    Memoboat.Data.userId = userId;

    Memoboat.Routers.router = new Memoboat.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
}; 