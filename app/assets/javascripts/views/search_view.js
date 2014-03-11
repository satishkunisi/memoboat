Memoboat.Views.SearchView = Backbone.View.extend({
  initialize: function () {
    var that = this;
  },

  className: "col-xs-4 col-md-6",

  id: "search-container",

  events: {
    "keypress #search-box": "autoSearch"
  },

  template: JST["search"],

  autoSearch: function (event) {
    var that = this;

    _.debounce(function () {
      that.submitSearch(event)
    }, 2000)();
  },

  submitSearch: function (event) {

    var queryString = $(event.target).val();
    Memoboat.Routers.router.searchView(queryString);


  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }


})