Memoboat.Views.AddTagForm = Backbone.View.extend({
  template: JST["tags/add_tag_form"],
  
  tagName: "form",
  
  id: "create-tag-form",
  
  className: "form-inline col-xs-4",
  
  events: {
    "click button#create-new-tag": "createTag"
  },

  createTag: function (event) {
    
    event.preventDefault();
    var that = this;

    var formData = $(event.target.form).serializeJSON();
    var newTagName = formData["new_tag"]["name"];

    var tag = new Memoboat.Models.Tag({
      name: newTagName 
    })

    tag.save({}, {
      success: function () {
        createTagging();
        Memoboat.userTags.add(tag);
      }
    })

    function createTagging () {
      var tagging = new Memoboat.Models.Tagging({
        memo_id: that.model.id,
        tag_id: tag.id
      });

      tagging.save({},{
        success: function () {
          that.model.get('tags').add(tag);
          that.model.fetch();
        }
      });
    }
    

  },

  render: function () {
    var renderedContent = this.template({
      model: this.model
    });

    this.$el.html(renderedContent);

    return this
  }
})