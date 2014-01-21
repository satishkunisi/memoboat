Memoboat.Views.MemoSidebar = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add change remove reset", this.render);
    var that = this;

    Memoboat.Vents.vent.on("memo:changeNotebook", function (memoId) {
      that.removeMemo(memoId);
    })
  },

  events: {
    "click .list-group-item": "showMemo"
  },

  template: JST['memo_sidebar'],

  className: "col-xs-3",

  id: "memo-sidebar",

  removeMemo: function (memoId) {
    var memo = this.collection.get(memoId);
    this.collection.remove(memo).fetch();
  },  

  showMemo: function (event) {
    event.preventDefault();

    var memoId = $(event.currentTarget).data('id');
    var notebookId = this.collection.notebookId;
    console.log(this._activeMemo);
    this._swapActiveMemo($(event.currentTarget));
    Backbone.history.navigate("notebooks/" + notebookId + "/memos/" + memoId, { trigger: true});
    
  },

  render: function () {
    console.log("rendering")
    var renderedContent = this.template({
      memos: this.collection
    });

    this.$el.html(renderedContent);

    this.makeMemosDraggable();

    return this;
  },

  makeMemosDraggable: function () {
    this.$el.find('.list-group-item').draggable({
      revert: true,
      revertDuration: 200 
    });

  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})