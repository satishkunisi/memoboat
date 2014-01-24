Memoboat.Views.MemoTagList = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model.get('tags'), "add remove change reset sync", this.render)
  },
  
  events: {
    "click .delete-tag": "deleteTagging"
  },

  id: "memo-tag-list",

  template: JST["tags/memo_tag_list"],

  deleteTagging: function (event) {
    event.preventDefault();

    var tagId = $(event.currentTarget).data('id');
    var memoId = this.model.id;
    var that = this;

    var taggingId = this.model.get('tags').get(tagId).get('tagging').id
    
    console.log(taggingId);

    var tagging = new Memoboat.Models.Tagging({
      id: taggingId
    })

    tagging.destroy({
      success: function () {
        that.model.get('tags').remove(tagId);
        that.model.fetch();
      }
    })
    
  },

  render: function () {

    var renderedContent = this.template({
      tags: this.model.get('tags')
    });

    this.$el.html(renderedContent);

    return this;
  }


})