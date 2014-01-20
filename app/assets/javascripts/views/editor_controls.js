Memoboat.Views.EditorControls = Backbone.View.extend({
  events: {
    "click button#memo-new": "newMemo",
    "click button#memo-trash": "trashMemo",
    "click button#memo-save": "saveMemo"
  },

  template: JST['editor/controls'],


  newMemo: function (event) {
    event.preventDefault();
    var notebookId = this.collection.notebookId;
    Memoboat.Routers.router.switchEditor(this.collection);
    Backbone.history.navigate("notebooks/" + notebookId);
  },

  trashMemo: function (event) {
    event.preventDefault();
    var that = this;

    this.model.collection = this.collection;
    this.model.destroy({
      success: function () {
        var notebookId = that.collection.notebookId;
        Backbone.history.navigate("notebooks/" + notebookId, {trigger: true});
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