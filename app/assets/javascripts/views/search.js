Memoboat.Views.SearchView = Backbone.View.extend({
  initialize: function () {
    //
  },

  className: "col-xs-6",

  events: {
    "keydown #search-box": "submitSearch"
  },

  template: JST["search"],

  submitSearch: function (event) {

    if (event.which !== 13) {
      return;
    }

    var queryString = $(event.target).val();
    
    console.log(queryString)
    //Memoboat.Routers.router.searchView(q)

  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

})