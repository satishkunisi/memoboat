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

  id: "editor-controls",

  template: JST['editor/controls'],

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

        that.$el.find('#memo-notebook-id').trigger('chosen:updated');
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
    this.$el.find('#memo-notebook-id').chosen({
      disable_search_threshold: 10,
      no_results_text: "Oops, nothing found!",
      width: "50%"
    });

    return this;
  }
})