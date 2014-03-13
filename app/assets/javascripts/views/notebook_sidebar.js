Memoboat.Views.NotebookSidebar = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add change remove reset", this.render);
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

  feedLink: function () {
    console.log("fired");
    Backbone.Routers.router.feedLink();
  },

  installAddNotebookForm: function () {
    var newNotebook = new Memoboat.Models.Notebook();
    var addNotebookView = new Memoboat.Views.AddNotebook({
      model: newNotebook,
      collection: this.collection
    });

    this.$el.append(addNotebookView.render().$el);
  },


  installNotebookList: function () {
    var notebooksList = new Memoboat.Views.NotebookList({
      collection: Memoboat.notebooks,
      startNotebook: this.startNotebook
    });

    this.$el.append(notebooksList.render().$el);
  },

  installUserTagsList: function () {
    var that = this;

    Memoboat.userTags.fetch({
      success: function () {
        var tagList = new Memoboat.Views.TagList({
          collection: Memoboat.userTags
        });

        that.$el.find('#notebook-list').after(tagList.render().$el);
      }
    });
  }

})