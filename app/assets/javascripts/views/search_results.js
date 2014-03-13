Memoboat.Views.SearchResults = Backbone.View.extend({
  template: JST['search_results'],
  
  render: function () {
    var renderedContent = this.template({
      memos: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
})