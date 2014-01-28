Memoboat.Views.BodyInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change remove sync", this.render)
  },

  template: JST['editor/body_input'],

  events: {
    "keyup textarea": "autoSave",
    "click button#memo-save": "autoSave"
  },

  autoSave: _.debounce(function () {
      console.log("in here");
      var newBody = $('#memo_body').val();
      var oldBody = this.model.get('body');

      if (newBody !== oldBody) {
        this.saveNote();
      }

    }, 3000),

  saveNote: function (event) {
    if (event) { 
      event.preventDefault(); 
    }

    var that = this;
    var bodyData = {memo: {}};

    bodyData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    bodyData["memo"]["title"] = $('#memo_title').val();
    bodyData["memo"]["body"] = $('#memo_body').val();

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