Memoboat.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Memoboat.notebooks = new Memoboat.Collections.Notebooks();
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "mainView",
    "notebooks/:id" : "switchNotebook" //render list of memos
  },

  mainView: function () {
    this.installNotebooks();
    //this.installMemos();
    //this.installEditor();
  },

 

  installNotebooks: function () {
    var that = this;

    Memoboat.notebooks.fetch({
      success: function () {
        var nbSidebar = new Memoboat.Views.NotebookSidebar({
          collection: Memoboat.notebooks
        })

        that.$rootEl.append(nbSidebar.render().$el);
      }
    })
    
  },

  installMemos: function () {

  },

  installEditor: function () {

  },


   _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  },
})