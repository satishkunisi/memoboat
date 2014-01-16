Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function () {
    //this.listenTo();
  },

  template: JST["notebook-sidebar"],

  className: "list-group col-xs-2",

  id: "notebook-sidebar",

  render: function () {

    var renderedContent = this.template({
      notebooks: Memoboat.notebooks
    });

    this.$el.html(renderedContent);
    return this;
  }

})