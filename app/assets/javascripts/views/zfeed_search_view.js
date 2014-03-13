Memoboat.Views.FeedSearchView = Backbone.View.extend({

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
    var that = this;
    var queryString = $(event.target).val();

    search = new Memoboat.Models.Search({
      id: queryString
    })

    search.fetch({
      success: function () {
        var memos = search.get('memos');
        searchResults = new Memoboat.Views.SearchResults({
          collection: memos
        });

        that.removeChildViews();
        that.childViews.push(searchResults);
        that.$el.append(searchResults.render().$el);
      }
    });
  },

  removeChildViews: function () {
    if (this.childViews.count < 1)
    this.childViews.forEach(function (view) {
      view.remove();
    })
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})