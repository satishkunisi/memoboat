Memoboat.Views.BodyInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "add change remove reset", this.render)
  },

  events: {
    "change textarea": "saveNote"
  },

  saveNote: function (event) {
    event.preventDefault();

    var bodyData = $(event.target).serializeJSON();

    if (this.model.isNew()) {
      this.collection.create(bodyData["memo"])
    } else {
      this.model.save(bodyData["memo"]);
    }
  },

  template: JST['editor/body_input'],

  render: function () {
    var renderedContent = this.template({
      memo: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
})