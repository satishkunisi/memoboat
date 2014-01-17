Memoboat.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Memoboat.notebooks = new Memoboat.Collections.Notebooks();
    this.$rootEl = options.$rootEl;
    this.installNotebooks();
  },

  routes: {
    "": "mainView",
    "notebooks/:id" : "switchNotebook" //render list of memos
  },

  mainView: function () {
    
  },

  switchNotebook: function (id) {
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
        that._currentMemoList = memoList;
      }
    })
  },

  installNotebooks: function () {
    var that = this;

    Memoboat.notebooks.fetch({
      success: function () {
        var nbSidebar = new Memoboat.Views.NotebookSidebar({
          collection: Memoboat.notebooks
        })

        that.$rootEl.append(nbSidebar.render().$el);

        var notebookId = Memoboat.notebooks.first().id;
        that.installMemos(notebookId);
      }
    })
    
  },

  installMemos: function (notebookId) {
    var that = this;

    var memos = new Memoboat.Collections.Memos({
      notebookId: notebookId
    });

    memos.fetch({
      success: function () {
        var memosSidebar = new Memoboat.Views.MemoSidebar({
          collection: memos
        });

        that.$rootEl.append(memosSidebar.render().$el);
        that._currentMemoList = memosSidebar;
        //this.installEditor();
      }
    });
  },

  installEditor: function () {
    
  },


   _swapMemoList: function (view) {
    this._currentMemoList.remove();
    this._currentMemoList = view;
    $('#notebook-sidebar').after(view.render().$el)
  },
})