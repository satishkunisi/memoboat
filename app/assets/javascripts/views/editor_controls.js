Memoboat.Views.EditorControls = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "destroy change sync", this.render)
  },

  events: {
    "click button#memo-new": "newMemo",
    "click button#memo-trash": "trashMemo",
    "click button#memo-save": "saveMemo"
  },

  template: JST['editor/controls'],

  className: "col-xs-6",

  newMemo: function (event) {
    event.preventDefault();
    var notebookId = this.collection.notebookId;
    Memoboat.Routers.router.switchEditor(this.collection);
  },

  trashMemo: function (event) {
    event.preventDefault();
    var that = this;

    this.model.collection = this.collection;
    this.model.destroy({
      success: function () {
        var notebookId = that.collection.notebookId;
        Memoboat.Routers.router.switchNotebook(notebookId);
      }
    });
  },

  saveMemo: function (event) {
    event.preventDefault();
  },

  render: function () {
    var isNewMemo =  this.model.isNew()
    var renderedContent = this.template({
      isNewMemo: isNewMemo
    });
    this.$el.html(renderedContent)
    return this;
  }
})