Memoboat.Views.BodyInput = Backbone.View.extend({
  initialize: function () {
    //this.listenTo(this.model, "change remove sync", this.render)
  },

  template: JST['editor/body_input'],

  events: {
    "keyup #memo_body": "autoSave",
    "click button#memo-save": "autoSave"
  },

  autoSave: _.debounce(function () {
      console.log("here")
      var newBody = $('#memo_body').text();
      var oldBody = this.model.get('body');

      if (newBody !== oldBody) {
        this.saveNote();
      }

    }, 500),

  saveNote: function (event) {
    if (event) { 
      event.preventDefault(); 
    }

    var that = this;
    var bodyData = {memo: {}};

    bodyData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    bodyData["memo"]["title"] = $('#memo_title').val();
    bodyData["memo"]["body"] = $('#memo_body').text();

    function triggerSort () {
      Memoboat.Vents.vent.trigger("memoList:reRender");
    }

    if (this.model.isNew()) {
      this.model.set(bodyData["memo"])
      this.collection.create(this.model, {
        success: triggerSort
      });
    } else {
      this.model.save(bodyData["memo"], {
        success: triggerSort
      });
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