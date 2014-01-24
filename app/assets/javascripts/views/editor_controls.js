Memoboat.Views.EditorControls = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "destroy change", this.render)
  },

  events: {
    "click button#memo-new": "newMemo",
    "click button#memo-trash": "trashMemo",
    "click button#memo-save": "saveMemo",
    "change #memo-notebook-id": "changeNotebook"
  },

  template: JST['editor/controls'],

  className: "col-xs-6",

  newMemo: function (event) {
    event.preventDefault();
    var notebookId = $("#memo-notebook-id").val();
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

  changeNotebook: function (event) {
    event.preventDefault();
    var that = this;
    var notebookId = $(event.target).val();

    this.model.set("notebook_id", notebookId);
    this.model.save({}, {
      success: function () {
        if (!that.collection.notebookId) {
          return;
        }

        that.collection.remove(that.model)
      }
    });

  },

  render: function () {
    var isNewMemo =  this.model.isNew();

    if (typeof(this.collection.notebookId) !== 'undefined') {
      var memoNotebookId = this.collection.notebookId
    } else if (this.model.get('notebook_id')) {
      var memoNotebookId = this.model.get('notebook_id')
    } else {
      var memoNotebookId = Memoboat.notebooks.first().id
    }
     
    var renderedContent = this.template({
      isNewMemo: isNewMemo,
      notebooks: Memoboat.notebooks,
      memoNotebookId: memoNotebookId
    });

    this.$el.html(renderedContent)
    return this;
  }
})