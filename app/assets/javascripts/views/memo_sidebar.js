Memoboat.Views.MemoSidebar = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add change remove reset", this.render)
  },

  events: {
    "click .list-group-item": "showMemo"
  },

  showMemo: function (event) {
    event.preventDefault();

    var memoId = $(event.currentTarget).data('id');
    var notebookId = this.collection.notebookId;
    console.log(this._activeMemo);
    this._swapActiveMemo($(event.currentTarget));
    Backbone.history.navigate("notebooks/" + notebookId + "/memos/" + memoId, { trigger: true});
    
  },

  template: JST['memo_sidebar'],

  className: "col-xs-3",

  id: "memo-sidebar",

  render: function () {
    var renderedContent = this.template({
      memos: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})