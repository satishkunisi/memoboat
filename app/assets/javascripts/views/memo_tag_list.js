Memoboat.Views.MemoTagList = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model.get('tags'), "add remove change reset sync", this.render)
  },
  
  events: {
    "click .delete-tag": "deleteTagging",
    "click .memo-tag-btn": "showTags"
  },

  id: "memo-tag-list",

  template: JST["tags/memo_tag_list"],

  deleteTagging: function (event) {
    event.preventDefault();

    var tagId = $(event.currentTarget).data('id');
    var memoId = this.model.id;
    var that = this;

    var taggingId = this.model.get('tags').get(tagId).get('tagging').id
    
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

  showTags: function (event) {
    var tagId = $(event.target).data('id');

    Backbone.history.navigate('tags/' + tagId, {trigger: true});
  },

  makeMemoListDroppable: function () {
    var that = this;

    this.$el.droppable({
      accept: ".tag-list-item",
      hoverClass: "active",
      drop: function (event, ui) {
        var tagId = ui.draggable.data('id');
        var tag = Memoboat.userTags.get(tagId)

        var tagging = new Memoboat.Models.Tagging({
          memo_id: that.model.id,
          tag_id: tagId
        });

        tagging.save({}, {
          success: function () {
            that.model.get('tags').add(tag);
            that.model.fetch();
          }
        });
      }
    });
  },

  render: function () {

    var renderedContent = this.template({
      tags: this.model.get('tags')
    });

    this.$el.html(renderedContent);

    this.makeMemoListDroppable();
    return this;
  }


})