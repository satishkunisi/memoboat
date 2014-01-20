Memoboat.Views.BodyInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "add change remove reset", this.render)
  },

  template: JST['editor/body_input'],

  events: {
    "change textarea": "saveNote"
  },

  saveNote: function (event) {
    event.preventDefault();

    var that = this;
    var bodyData = $(event.target).serializeJSON();

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