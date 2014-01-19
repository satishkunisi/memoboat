Memoboat.Views.NotebookMenu = Backbone.View.extend({

  template: JST['notebook_menu'],

  events: {
    "click #notebook-delete": "deleteNotebook",
    "click #menu-close": "closeMenu"  
  },

  render: function () {
    var renderedContent = this.template({
      notebook: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  deleteNotebook: function () {
    event.preventDefault();
    var that = this;

    var notebookId = $(event.target).data('id');

    var notebook = this.model.destroy();

    var dropdown = $(event.target).closest('.dropdown-menu');
  }

})


