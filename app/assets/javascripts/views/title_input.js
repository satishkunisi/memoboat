Memoboat.Views.TitleInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change remove sync", this.render)
  },

  events: {
    "change input": "saveNote"
  },

  template: JST['editor/title_input'],


  saveNote: function (event) {
    event.preventDefault();

    var titleData = {memo: {}};

    titleData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    titleData["memo"]["title"] = $('#memo_title').val();
    titleData["memo"]["body"] = $('#memo_body').val();

    if (this.model.isNew()) {
      this.model.set(titleData["memo"])
      this.collection.create(this.model)
    } else {
      this.model.save(titleData["memo"]);
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