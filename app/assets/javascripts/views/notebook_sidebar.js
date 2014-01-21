Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "add change remove reset sync", this.render);

    if (!options.activeNotebook) {
      this.startNotebook = this.collection.first().id
    } else {
      this.startNotebook = options.activeNotebook;
    }
  
  },

  events: {
    "click span.close": "deleteNotebook",
    "click .list-group-item": "showMemos"
  },

  template: JST["notebook-sidebar"],

  showMemos: function (event) {
    event.preventDefault();

    if ($(event.target) === this._activeNotebook) {
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
        if ( notebook.id === $(that._activeNotebook).data('id')) {
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
      notebooks: Memoboat.notebooks,
      startNotebook: this.startNotebook
    });

    this.$el.html(notebooksList);

    this._activeNotebook = this.$el.find("a.active");

    var newNotebook = new Memoboat.Models.Notebook();
    var view = new Memoboat.Views.AddNotebook({
      model: newNotebook,
      collection: this.collection
    });
    this.$el.prepend(view.render().$el);

    this.makeNotebooksDroppable();

    return this;
  },

  makeNotebooksDroppable: function () {
    this.$el.find('.notebook-item').droppable({
      accept: ".memo-item",
      hoverClass: "active",
      drop: function (event, ui) {
        var currentNotebookId = ui.draggable.data('nb-id');
        var targetNotebookId = $(event.target).data('id')

        if (currentNotebookId !== targetNotebookId) {
          var memoId = ui.draggable.data('id');

          var oldCollection = new Memoboat.Collections.Memos({
            notebookId: currentNotebookId
          })

          function removeFromOldCollection () {
            Memoboat.Vents.vent.trigger("memo:changeNotebook", {
              memoId: memoId
            });
          }

          function changeNotebook () {
            var memo = oldCollection.get(memoId);
            memo.set({notebook_id: targetNotebookId})
            memo.save({notebook_id: targetNotebookId}, {
              success: removeFromOldCollection
            })
          }

          oldCollection.fetch({
            success: changeNotebook
          });
        } 
      }
    });
  },

   _swapActiveNotebook: function ($li) {
     this._activeNotebook && this._activeNotebook.removeClass('active');
     this._activeNotebook = $li;
     $li.addClass('active');
  },

  _restoreActiveNotebook: function () {
    this._activeNotebook && this._activeNotebook.addClass('active');
  }

})