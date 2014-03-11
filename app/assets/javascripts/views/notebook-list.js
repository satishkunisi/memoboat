Memoboat.Views.NotebookList = Backbone.View.extend({

  initialize: function (options) {

    if (!options.activeNotebook) {
      this.startNotebook = this.collection.first().id
    } else {
      this.startNotebook = options.activeNotebook;
    }
  
  },

  id: "notebook-list",

  events: {
    "click span.close": "deleteNotebook",
    "click .notebook-item": "showMemos"
  },

  template: JST["notebook-list"],

  

  showMemos: function (event) {
    event.preventDefault();

    if ($(event.currentTarget) === this._activeNotebook) {
      return;
    }

    this._swapActiveNotebook($(event.currentTarget));

    var notebookId = $(event.currentTarget).data('id')
    Backbone.history.navigate("notebooks/" + notebookId, { trigger: true})
  },

  deleteNotebook: function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var that = this;

    var notebookId = $(event.target).data('id');
    var notebook = this.collection.get(notebookId);

    notebook.destroy({
      success: function () {
        if ( notebook.id === $(that._activeNotebook).data('id')) {
          var newNotebookId = $('.list-group-item').first().data('id');
          that._swapActiveNotebook($('.list-group-item').first());
        }
      }
    });
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

          var oldCollection = new Memoboat.Collections.Memos({}, {
            notebookId: currentNotebookId
          })

          function removeFromOldCollection () {
            setTimeout(function() {
              Memoboat.Vents.vent.trigger("memo:changeNotebook", {
                memoId: memoId
              });
            }, 200);
            
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

  render: function () {
    var renderedContent = this.template({
      notebooks: Memoboat.notebooks,
      startNotebook: this.startNotebook
    });

    this.$el.html(renderedContent);

    this._activeNotebook = this.$el.find("a.active");

    this.makeNotebooksDroppable();

    return this;
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
