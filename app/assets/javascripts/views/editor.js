Memoboat.Views.Editor = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  className: "col-xs-6",

  id: "editor",

  template: JST['editor/main'],

  render: function () {

    var mainContent = this.template({
      memo: this.model
    });

    var memoTagForm = new Memoboat.Views.MemoTagForm({
      model: this.model
    });

    var controls = new Memoboat.Views.EditorControls({
      model: this.model,
      collection: this.collection
    })

    var titleInput = new Memoboat.Views.TitleInput({
      model: this.model,
      collection: this.collection
    });

    var bodyInput = new Memoboat.Views.BodyInput({
      model: this.model,
      collection: this.collection
    });

    var editorForm = $("<form>").addClass("form-horizontal");
    $(editorForm).append(memoTagForm.render().$el)
                 .append(titleInput.render().$el)
                 .append(bodyInput.render().$el)
                 .prepend(controls.render().$el);
                 
    var renderedContent = $(mainContent).append(editorForm)
 
    this.$el.html(renderedContent);

    return this;
  }
})