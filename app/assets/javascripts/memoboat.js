window.Memoboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  initialize: function (userId) {
    Memoboat.Data.userId = userId;

    new Memoboat.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
}; 