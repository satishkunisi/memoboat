window.Memoboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    new Memoboat.Routers.Router();
    Backbone.history.start();
  }
}; 