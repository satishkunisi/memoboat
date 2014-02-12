Memoboat.Views.ImageForm = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, "change:image_big_url", this.render)
  },

  template: JST['editor/image_form'],

  id: 'image-form',

  events: {
    "click .attach-image": "triggerAttachment",
    "change #attach-image": "attachImage",
    "mouseenter #img-form-content": "imageControls",
    "mouseleave #img-form-content": "removeImgControls",
    "click #img-form-content button.close": "removeAttachment",
    "click #img-form-content img": "openImage"
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

    $('.progress').show();

    var file = $('#attach-image').get(0).files[0]
    var reader = new FileReader();
    var imageURL;

    reader.onloadstart = function () {
    }

    reader.onloadend = function () {
      
    }

    reader.onprogress = function (data) {
      if (data.lengthComputable) {
        var progress = (data.loaded / data.total) * 100;
        var progress_perc = "width: " + parseInt(progress) + "%";

        $('.progress div.progress-bar').attr('aria-valuenow', progress);
        $('.progress div.progress-bar').attr('style', progress_perc);
      }
      
    }

    reader.onload = function () {
      that.saveNote(event, this.result);
    }

    reader.readAsDataURL(file);
  },

  imageControls: function (event) {
    if (this.model.hasImage()) {
      var closeBtn = '<button type="button" class="close" aria-hidden="true">&times;</button>';
      $(event.currentTarget).append(closeBtn);
    }
  },

  openImage: function () {
    window.open(this.model.get('image_url'));
  },

  removeImgControls: function (event) {
    if (this.model.hasImage()) {
      $('#img-form-content button.close').remove();
    }
  },

  removeAttachment: function (event) {
    this.saveNote(event, null);
  },

  saveNote: function (event, imageData) {
    
    if (event) { 
      event.preventDefault(); 
    }

    var that = this;
    var memoData = {memo: {}};

    memoData["memo"]["title"] = $('#memo_title').val();
    memoData["memo"]["body"] = $('#memo_body').val();
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