Memoboat.Views.TitleInput = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change remove sync", this.render)
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

  }, 1000),

  saveNote: function (event) {
    if (event) { 
      event.preventDefault(); 
    }

    var that = this;
    var titleData = {memo: {}};

    titleData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    titleData["memo"]["title"] = $('#memo_title').val();
    titleData["memo"]["body"] = $('#memo_body').val();

    console.log(titleData);

    if (this.model.isNew()) {
      this.model.set(titleData["memo"])
      this.collection.create(this.model, {
        success: function () {
          that.collection.sort();
        }
      })
    } else {
      this.model.set(titleData["memo"])
      console.log(this.model)
      this.model.save({}, {
        success: function () {
          that.collection.sort();
        }
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