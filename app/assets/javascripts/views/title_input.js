Memoboat.Views.TitleInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change remove sync", this.render)
  },

  events: {
    "change input": "saveNote"
  },

  saveNote: function (event) {
    event.preventDefault();

    var titleData = $(event.target).serializeJSON();
    var notebookId = $("#memo_notebook_id").val();
    titleData["memo"]["notebook_id"] = notebookId;

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