Memoboat.Views.EditorControls = Backbone.View.extend({
  initialize: function () {
    //..listenTo
  },

  events: {
    "click button#memo-new": "newMemo",
    "click button#memo-trash": "trashMemo",
    "click button#memo-save": "saveMemo"
  },

  template: JST['editor/controls'],


  newMemo: function (event) {
    Backbone.history.navigate("notebooks/" + this.collection.notebookId + "/memos/new")
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent)
    return this;
  }
})