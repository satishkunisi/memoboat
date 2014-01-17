Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove reset sync", this.render);
  },

  events: {
    "click .list-group button": "showDropdown",
    "click .dropdown-menu a": "dropdownAction"
  },

  template: JST["notebook-sidebar"],

  dropdownAction: function (event) {
    var notebookId = $(event.target).data('id');
    var action = $(event.target).data('action')

    if (action === "delete") {
      var notebook = this.collection.get(notebookId);
      notebook.destroy();
    } else if (action === "properties") {
      //...
    }
  },

  showDropdown: function (event) {
    var notebookId = $(event.target).data('id');

    console.log($('#nb-menu-' + notebookId));
    $('#nb-menu-' + notebookId).toggle();
  },

  className: "col-xs-2",

  id: "notebook-sidebar",

  render: function () {

    var notebooksList = this.template({
      notebooks: Memoboat.notebooks
    });

    this.$el.html(notebooksList);

    var newNotebook = new Memoboat.Models.Notebook();

    var view = new Memoboat.Views.AddNotebook({
      model: newNotebook,
      collection: this.collection
    });

    this.$el.prepend(view.render().$el);

    return this;
  }

})