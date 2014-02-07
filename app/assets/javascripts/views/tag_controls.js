Memoboat.Views.TagControls = Backbone.View.extend({
  initialize: function () {

  },

  id: "tag-controls",

  className: "list-inline",

  tagName: "ul",


  render: function () {
    this.installAddTagForm();
    return this;
  },

  installAddTagForm: function () {
    var view = new Memoboat.Views.AddTagForm({
      model: this.model
    });

    this.$el.append(view.render().$el);
  }
})