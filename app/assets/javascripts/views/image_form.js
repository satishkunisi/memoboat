Memoboat.Views.ImageForm = Backbone.View.extend({
  template: JST['editor/image_form'],

  id: 'image-form',

  events: {
    "click #attach-image-icon": "triggerAttachment",
    "change #attach-image": "attachImage"
  }, 

  render: function () {
    var renderedContent = this.template({
      memo: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  triggerAttachment: function (event) {
    event.preventDefault()
    $('#attach-image').click();
  },

  attachImage: function (event) {
    var that = this;

    var file = $('#attach-image').get(0).files[0]
    var reader = new FileReader();
    var imageURL;

    reader.onload = function () {
      that.saveNote(event, this.result);
    }

    reader.readAsDataURL(file);
  },

  saveNote: function (event, imageData) {
    
    if (event) { 
      event.preventDefault(); 
    }

    var that = this;
    var memoData = {memo: {}};

    memoData["memo"]["title"] = $('#memo_title').val();
    memoData["memo"]["body"] = $.trim($('#memo_body').text());
    memoData["memo"]["notebook_id"] = $("#memo-notebook-id").val();
    memoData["memo"]["image"] = imageData;

    function triggerSort () {
      Memoboat.Vents.vent.trigger("memoList:reRender");
    }

    this.model.set(memoData["memo"])

    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: triggerSort
      });
    } else {
      this.model.save({}, {
        success: triggerSort
      });
    }
  },

})