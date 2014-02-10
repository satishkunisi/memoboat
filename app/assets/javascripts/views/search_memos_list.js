Memoboat.Views.SearchMemosList = Backbone.View.extend({

  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "add change remove reset", this.render);
  
  },

  events: {
    "click .memo-item": "showMemo"
  },

  template: JST['search_memos'],

  className: "col-xs-3",

  id: "search-memos-list",

  removeMemo: function (options) {
    var memo = this.collection.get(options.memoId);
    this.collection.remove(memo);
  },  

  showMemo: function (event) {
    event.preventDefault();

    var memoId = $(event.currentTarget).data('id');
    var notebookId = this.collection.notebookId;
    this._swapActiveMemo($(event.currentTarget));
    Memoboat.Routers.router.switchTaggedMemoEditor(this.collection, memoId);
  },

  makeMemosDraggable: function () {
    this.$el.find('.list-group-item').draggable({
      revert: "invalid",
      revertDuration: 200,
      opacity: 0.35,
      scroll: true,
      helper: 'clone'
    });
  },

  render: function () {
    var renderedContent = this.template({
      memos: this.collection,
      queryString: this.model.id
    });

    this.$el.html(renderedContent);

    this.$el.highlight(this.model.id, { wordsOnly: true});
    this.makeMemosDraggable();

    return this;
  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})