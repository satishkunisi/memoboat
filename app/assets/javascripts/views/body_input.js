Memoboat.Views.BodyInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change remove sync", this.render)
  },

  template: JST['editor/body_input'],

  events: {
    "change textarea": "saveNote"
  },

  saveNote: function (event) {
    event.preventDefault();

    var that = this;
    var bodyData = $(event.target).serializeJSON();
    var notebookId = $("#memo_notebook_id").val();
    bodyData["memo"]["notebook_id"] = notebookId;

    if (this.model.isNew()) {
      this.model.set(bodyData["memo"])
      this.collection.create(this.model);
    } else {
      this.model.save(bodyData["memo"]);
    }
  },

  render: function () {
    var renderedContent = this.template({
      memo: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
})