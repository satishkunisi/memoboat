Memoboat.Views.Editor = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  className: "col-xs-6 well well-lg",

  id: "editor",

  template: JST['editor/main'],

  render: function () {

    var mainContent = this.template({
      memo: this.model
    });

    var tag_controls = new Memoboat.Views.TagControls({
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

    if (!this.model.isNew()) {
      var memoTagList = new Memoboat.Views.MemoTagList({
        model: this.model
      });
    }
                 
    this.$el.html(mainContent)

    this.$el.append(tag_controls.render().$el)
            .append(titleInput.render().$el)
            .append(bodyInput.render().$el)
            .prepend(controls.render().$el);

    if (!this.model.isNew()) {
       this.$el.find('#memo_title').before(memoTagList.render().$el);
    }

    return this;
  }
})