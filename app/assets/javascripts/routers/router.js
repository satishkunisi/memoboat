Memoboat.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Memoboat.notebooks = new Memoboat.Collections.Notebooks();
    Memoboat.userTags = new Memoboat.Collections.UserTags();
  },

  routes: {
    "": "mainView",
    "notebooks/:id": "switchNotebook",
    "notebooks/:notebookId/memos/:id": "switchMemo",
    "tags/:id": "tagView",
    "tags/:tag_id/memo/:id" : "switchTaggedMemoEditor"
  },

  mainView: function () {
    var that = this;

    this.installNotebooksSidebar(function () {
      var firstNbId = Memoboat.notebooks.first().id;
      that.switchNotebook(firstNbId);
    });
  },

  tagView: function (id) {

    var that = this;

    function createTagView () {
      tag = new Memoboat.Models.Tag({
        id: id
      })

      tag.fetch({
        success: function () {
          var memos = tag.get('memos');
          var tagMemosView = new Memoboat.Views.TaggedMemosList({
            model: tag,
            collection: memos
          });

          that._swapMemoList(tagMemosView);
          that.switchTaggedMemoEditor(memos, memos.first().id);
        }
      })
    }
    

    if ($('#notebook-sidebar').length === 0) {
      this.installNotebooksSidebar(createTagView, id);
    } else {
      createTagView();
    }
  },

  switchTaggedMemoEditor: function (memos, memoId) {
    var that = this;

    var memo = new Memoboat.Models.Memo({
      id: memoId
    })

    memo.fetch({
      success: function () {
        var editor = new Memoboat.Views.Editor({
          model: memo,
          collection: memos
        });

      that._swapEditor(editor);
      }
    });
    
  },

  installNotebooksSidebar: function (callback, activeNotebook) {

    var that = this;

    Memoboat.notebooks.fetch({
      success: function () {
        var nbSidebar = new Memoboat.Views.NotebookSidebar({
          collection: Memoboat.notebooks,
          activeNotebook: activeNotebook,
        });

        that.$rootEl.append(nbSidebar.render().$el);

        if (callback) {
          callback();
        }

      }
    });
  },

  switchNotebook: function (id, memoId) {
    var that = this;

    function createMemoSidebar () {
      var memos = new Memoboat.Collections.Memos({},{
        notebookId: id
      });

      memos.fetch({
        success: function () {
          var memoList = new Memoboat.Views.MemoSidebar({
            collection: memos,
            notebookTitle: Memoboat.notebooks.get(memos.notebookId).get('title')
          });
          that._swapMemoList(memoList);
          that.switchEditor(memos, memoId); 
        }
      })

    }

    if ($('#notebook-sidebar').length === 0) {
      this.installNotebooksSidebar(createMemoSidebar, id);
    } else {
      createMemoSidebar();
    }

  },

  switchMemo: function (notebookId, id) {
    if ($('#memo-sidebar').length === 0) {
      this.switchNotebook(notebookId, id);
    } else if (this._currentMemoList.collection.notebookId === notebookId) {
      this.switchEditor(this._currentMemoList.collection, id);
    } else {
      this.switchNotebook(notebookId, id)
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
    this.$rootEl.append(view.render().$el);

  }
})