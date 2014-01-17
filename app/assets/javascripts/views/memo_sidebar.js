Memoboat.Views.MemoSidebar = Backbone.View.extend({

  template: JST['memo_sidebar'],

  className: "col-xs-3",

  id: "memo-sidebar",

  render: function () {

    var renderedContent = this.template({
      memos: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
})