Memoboat.Views.NotebookSidebar = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add change remove reset", this.render);
    this._childViews = [];
  },

  template: JST["notebook-sidebar"],

  className: "col-xs-2",

  id: "notebook-sidebar",

  render: function () {

    var renderedContent = this.template();

    this.$el.html(renderedContent);

    this.installAddNotebookForm();
    this.installNotebookList();
    this.installUserTagsList();

    return this;
  },

  installAddNotebookForm: function () {
    var newNotebook = new Memoboat.Models.Notebook();
    var addNotebookView = new Memoboat.Views.AddNotebook({
      model: newNotebook,
      collection: this.collection
    });

    this._childViews.push(addNotebookView);

    this.$el.append(addNotebookView.render().$el);
  },


  installNotebookList: function () {
    var notebooksList = new Memoboat.Views.NotebookList({
      collection: Memoboat.notebooks,
      startNotebook: this.startNotebook
    });

    this._childViews.push(notebooksList);

    this.$el.append(notebooksList.render().$el);
  },

  installUserTagsList: function () {
    var that = this;

    Memoboat.userTags.fetch({
      success: function () {
        var tagList = new Memoboat.Views.TagList({
          collection: Memoboat.userTags
        });

        that._childViews.push(tagList);

        that.$el.find('#notebook-list').after(tagList.render().$el);
      }
    });
  },

  removeChildViews: function () {

    if (this._childViews.length === 0) {
      return;
    }

    var childView = this._childViews.pop();

     if (childView.removeChildViews) {
        childView.removeChildViews();
     } else {
       childView.remove();
     }
  }

})