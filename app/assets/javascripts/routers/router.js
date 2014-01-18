Memoboat.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Memoboat.notebooks = new Memoboat.Collections.Notebooks();
  },

  routes: {
    "": "mainView",
    "notebooks/:id": "switchNotebook",
    "notebooks/:id/memos/new": "newMemo",
    "notebooks/:notebookId/memos/:id": "switchMemo"
  },

  mainView: function () {
    var that = this;
    
    Memoboat.notebooks.fetch({
      success: function () {
        var nbSidebar = new Memoboat.Views.NotebookSidebar({
          collection: Memoboat.notebooks
        });

        that.$rootEl.append(nbSidebar.render().$el);
        var firstNbId = Memoboat.notebooks.first().id;

        Backbone.history.navigate("notebooks/" + firstNbId, {trigger: true})
      }
    });
  },

  newMemo: function (id) {
    var memos = new Memoboat.Collections.Memos({
      notebookId: id
    });

    this.switchEditor(memos);
  },

  switchNotebook: function (id, memoId) {
    var that = this;

    var memos = new Memoboat.Collections.Memos({
      notebookId: id
    });

    memos.fetch({
      success: function () {
        var memoList = new Memoboat.Views.MemoSidebar({
          collection: memos
        });

        that._swapMemoList(memoList);
        that.switchEditor(memos, memoId); 
      }
    })
  },

  switchMemo: function (notebookId, id) {
    if (this._currentMemoList.collection.notebookId === notebookId) {
      this.switchEditor(this._currentMemoList.collection, id);
    } else {
      switchNotebook(notebookId)
    }
  },

  switchEditor: function (memos, memoId) {
    var that = this;

    var memo = memos.get(memoId);

    function callback(memo) {
      
      var editor = new Memoboat.Views.Editor({
        model: memo,
        collection: memos
      });

      that._swapEditor(editor);
    }

    if (memo) {
      memo.fetch({
        success: callback(memo)
      });
    } else {
      memo = new Memoboat.Models.Memo();
      callback(memo);
    }
    
  },


   _swapMemoList: function (view) {
    this._currentMemoList && this._currentMemoList.remove();
    this._currentMemoList = view;
    $('#notebook-sidebar').after(view.render().$el)
  },

   _swapEditor: function (view) {
    this._currentEditor && this._currentEditor.remove();
    this._currentEditor = view;
    $('#memo-sidebar').after(view.render().$el)
  }
})