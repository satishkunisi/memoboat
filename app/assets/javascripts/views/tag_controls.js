Memoboat.Views.TagControls = Backbone.View.extend({
  initialize: function () {
  
  },

  id: "tag-controls",

  className: "list-inline",

  tagName: "ul",


  render: function () {
    
    if (this.model.isNew()) {
      return this;
    }

    this.installTagMemoForm();
    this.installAddTagForm();
    return this;
  },

  installTagMemoForm: function () {
    var view = new Memoboat.Views.TagMemoForm({
      model: this.model
    });

    this.$el.append(view.render().$el);
  },

  installAddTagForm: function () {
    var view = new Memoboat.Views.AddTagForm({
      model: this.model
    });

    this.$el.append(view.render().$el);
  }
})