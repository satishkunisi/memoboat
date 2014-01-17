Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove reset sync", this.render);
  },

  events: {
    "click .list-group button": "showDropdown",
    "click .dropdown-menu a": "dropdownAction",
    "click .list-group-item": "showMemos"
  },

  template: JST["notebook-sidebar"],

  dropdownAction: function (event) {
    var notebookId = $(event.target).data('id');
    var action = $(event.target).data('action')
    var dropdown = $(event.target).closest('.dropdown-menu');

    if (action === "delete") {
      var notebook = this.collection.get(notebookId);
      notebook.destroy();
    } else if (action === "properties") {
      //...
    }

    dropdown.toggle();

  },

  showDropdown: function (event) {
    var notebookId = $(event.target).data('id');

    console.log($('#nb-menu-' + notebookId));
    $('#nb-menu-' + notebookId).toggle();
  },

  closeDropdown: function (event) {
    console.log("hiding")
    $('.dropdown-menu').hide();
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