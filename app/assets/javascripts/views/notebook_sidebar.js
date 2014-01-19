Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove reset sync", this.render);
  },

  events: {
    "click span.close": "deleteNotebook",
    "click .list-group-item": "showMemos"
  },

  template: JST["notebook-sidebar"],

  showMemos: function (event) {
    event.preventDefault();

    if ($(event.target) === this._ActiveNotebook) {
      return;
    }

    this._swapActiveNotebook($(event.target));

    var notebookId = $(event.target).data('id')
    Backbone.history.navigate("notebooks/" + notebookId, { trigger: true})
  },

  deleteNotebook: function (event) {
    event.preventDefault();
    var that = this;

    var notebookId = $(event.target).data('id');
    var notebook = this.collection.get(notebookId);

    notebook.destroy({
      success: function () {
        // how to redirect to first item in this collection?
        if ( notebook.id === $(that._ActiveNotebook).data('id')) {
          var newNotebookId = $('.list-group-item').first().data('id');
          that._swapActiveNotebook($('.list-group-item').first());
        }
      }
    });
  },

  className: "col-xs-2",

  id: "notebook-sidebar",

  render: function () {

    var notebooksList = this.template({
      notebooks: Memoboat.notebooks
    });

    this.$el.html(notebooksList);

    var newNotebook = new Memoboat.Models.Notebook();

    var view = new Memoboat.Views.AddNotebook({
      model: newNotebook,
      collection: this.collection
    });

    this.$el.prepend(view.render().$el);

    return this;
  },

   _swapActiveNotebook: function ($li) {
     this._ActiveNotebook && this._ActiveNotebook.removeClass('active');
     this._ActiveNotebook = $li;
     $li.addClass('active');
  },

  _restoreActiveNotebook: function () {
    this._ActiveNotebook && this._ActiveNotebook.addClass('active');
  }

})