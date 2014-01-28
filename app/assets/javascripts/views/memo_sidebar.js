Memoboat.Views.MemoSidebar = Backbone.View.extend({

  initialize: function (options) {
    var that = this;
    this.notebookTitle = options.notebookTitle;

    this.listenTo(this.collection, "add change remove reset sort", this.render);
   
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

  removeMemo: function (options) {
    var memo = this.collection.get(options.memoId);
    this.collection.remove(memo);
  },  

  showMemo: function (event) {
    event.preventDefault();

    var memoId = $(event.currentTarget).data('id');
    var notebookId = this.collection.notebookId;
    this._swapActiveMemo($(event.currentTarget));
    Memoboat.Routers.router.switchMemo(notebookId, memoId);
    Backbone.history.navigate("notebooks/" + notebookId + "/memos/" + memoId);
    
  },

  render: function () {
    var renderedContent = this.template({
      memos: this.collection,
      notebookTitle: this.notebookTitle
    });

    this.$el.html(renderedContent);

    this.makeMemosDraggable();

    return this;
  },

  makeMemosDraggable: function () {
    this.$el.find('.list-group-item').draggable({
      revert: "invalid",
      revertDuration: 200,
      opacity: 0.35,
      scroll: true,
      helper: 'clone',
      start: function(){ //hide original when showing clone
          $(this).hide();             
      },
      stop: function(){ //show original when hiding clone
          $(this).show();
      }
    });
  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})