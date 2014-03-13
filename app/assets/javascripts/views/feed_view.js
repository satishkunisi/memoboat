Memoboat.Views.FeedView = Backbone.View.extend({

  render: function () {
    var searchView = new Memoboat.Views.FeedSearchView();
    this.$el.append(searchView.render().$el)
    return this;
  }
})