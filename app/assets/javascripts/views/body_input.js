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

    var bodyData = {memo: {}};

    bodyData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    bodyData["memo"]["title"] = $('#memo_title').val();
    bodyData["memo"]["body"] = $('#memo_body').val();

    if (this.model.isNew()) {
      this.model.set(bodyData)
      this.collection.create(this.model);
    } else {
      this.model.save(bodyData);
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