Memoboat.Views.FeedSearchView = Backbone.View.extend({

  initialize: function () {
    var that = this;
  },

  className: "col-xs-12",

  id: "search-container",

  events: {
    "keypress #search-box": "submitSearch"
  },

  template: JST["search"],

  submitSearch: function (event) {
    if (event.which !== 13) {
      return;
    }

    var that = this;
    var queryString = $(event.target).val();
    Memoboat.Routers.router.feedSearch(queryString);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})