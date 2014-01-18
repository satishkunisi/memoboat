Memoboat.Views.TitleInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "all", this.render)
  },

  events: {
    "change input": "saveNote"
  },

  saveNote: function (event) {
    event.preventDefault();

    var titleData = $(event.target).serializeJSON();

    if (this.model.isNew()) {
      this.model.set(titleData["memo"])
      this.collection.create(this.model)
    } else {
      this.model.save(titleData["memo"]);
    }
  },

  template: JST['editor/title_input'],

  render: function () {
    var renderedContent = this.template({
      memo: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
})