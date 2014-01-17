Memoboat.Views.NotebookSidebar = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove reset sync", this.render);
  },

  events: {
    "mouseenter .caret": "showDropdown",
    "mouseleave .caret": "hideDropdown"
  },

  template: JST["notebook-sidebar"],

  className: "col-xs-2",

  id: "notebook-sidebar",

  showDropdown: function (event) {
    console.log('hi')
  },

  hideDropdown: function (event) {
    console.log("bye");
  },

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