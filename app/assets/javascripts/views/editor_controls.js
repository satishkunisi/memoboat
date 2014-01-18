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
    event.preventDefault();

    var notebookId = this.collection.notebookId;
    Backbone.history.navigate("notebooks/" + notebookId + "/memos/new", {trigger: true});
  },

  trashMemo: function (event) {
    event.preventDefault();

    this.model.collection = this.collection;
    this.model.destroy();
  },

  saveMemo: function (event) {
    event.preventDefault();

    this.model.save();
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent)
    return this;
  }
})