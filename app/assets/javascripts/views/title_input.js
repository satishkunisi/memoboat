Memoboat.Views.TitleInput = Backbone.View.extend({
  initialize: function () {
    //this.listenTo(this.model, "change:title remove sync", this.render)
  },

  events: {
    "keyup input#memo_title": "autoSave"
  },

  template: JST['editor/title_input'],
  
  autoSave: _.debounce(function (event) {
  
    var newBody = $(event.target).val();
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
    var titleData = {memo: {}};

    titleData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    titleData["memo"]["title"] = $('#memo_title').val();
    titleData["memo"]["body"] = $('#memo_body').text();

    function triggerSort () {
      Memoboat.Vents.vent.trigger("memoList:reRender");
    }

    if (this.model.isNew()) {
      this.model.set(titleData["memo"])
      this.collection.create(this.model, {
        success: triggerSort
      })
    } else {
      this.model.set(titleData["memo"])
      this.model.save({}, {
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