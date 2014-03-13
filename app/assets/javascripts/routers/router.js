Memoboat.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Memoboat.notebooks = new Memoboat.Collections.Notebooks();
    Memoboat.userTags = new Memoboat.Collections.UserTags();
    this.allViews = [];
  },

  routes: {
    "": "mainView",
    "feed": "feedLink",
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

  feedLink: function () {
    this._removeAllViews();
    feedView = new Memoboat.Views.FeedSearchView();
    this.allViews.push(feedView);
    this.$rootEl.append(feedView.render().$el);
  },

  searchView: function (query) {

    var that = this;

    function createSearchView () {
      search = new Memoboat.Models.Search({
        id: query
      })

      search.fetch({
        success: function () {
          var memos = search.get('memos');

          console.log(memos[0]);

          var searchMemosList = new Memoboat.Views.SearchMemosList({
            model: search,
            collection: memos
          })


          that._swapMemoList(searchMemosList);
        },

        error: function () {
          var noResults = '<div class="alert alert-warning">No Results Found</div>'
          $('#search-box').before(noResults);
          $('.alert-warning').fadeOut(3000);
        }
      });
     
    }
    
    if ($('#notebook-sidebar').length === 0) {
      this.installNotebooksSidebar(createTagView, id);
    } else {
      createSearchView();
    }
  },


  tagView: function (tagName) {

    var that = this;

    function createTagView () {
      tag = new Memoboat.Models.Tag({
        name: tagName
      });

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
      this.installNotebooksSidebar(createTagView);
    } else {
      createTagView();
    }
  },

  switchTaggedMemoEditor: function (memos, memoId) {
    var that = this;

    var memo = memos.get(memoId);

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

        that.allViews.push(nbSidebar);
        that.$rootEl.append(nbSidebar.render().$el);

        if (callback) {
          callback();
        }

      }
    });
  },

  installSearchBar: function () {
    if ($('#search-box').length > 0) {
      return;
    }

    var searchBox = new Memoboat.Views.SearchView();
    this.allViews.push(searchBox);
    this.$rootEl.append(searchBox.render().$el);
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
    this.installSearchBar();

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
    this.allViews.push(view);
    $('#notebook-sidebar').after(view.render().$el)
  },

   _swapEditor: function (view) {
    this._currentEditor && this._currentEditor.remove();
    this._currentEditor = view;
    this.allViews.push(view);
    this.$rootEl.append(view.render().$el);

  },

  _removeAllViews: function () {
    this.allViews.forEach(function (view) {
      view.remove();
    });
  }
})