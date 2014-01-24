Memoboat.Views.TaggedMemosList = Backbone.View.extend({

  initialize: function () {
    var that = this;

    this.listenTo(this.collection, "add change remove reset", this.render);
   
    Memoboat.Vents.vent.on("memo:changeNotebook", function (memoId) {
      that.removeMemo(memoId);
    })
  },

  events: {
    "click .memo-item": "showMemo"
  },

  template: JST['tagged_memos'],

  className: "col-xs-3",

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

  render: function () {
    var renderedContent = this.template({
      memos: this.collection,
      tagTitle: this.model.get('name')
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