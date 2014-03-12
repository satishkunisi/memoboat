Memoboat.Views.TaggedMemosList = Backbone.View.extend({

  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "add remove reset", this.render);
  
  },

  events: {
    "click .memo-item": "showMemo"
  },

  template: JST['tagged_memos'],

  className: "col-xs-4",

  id: "tagged-memos-list",

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
      tagTitle: this.model.get('name')
    });

    this.$el.html(renderedContent);

    this.makeMemosDraggable();

    return this;
  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})