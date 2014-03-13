Memoboat.Views.MemoTagList = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "change sync", this.render)
  },
  
  events: {
    "click .delete-tag": "deleteTagging",
    "click .memo-tag-btn": "showTags"
  },

  id: "memo-tag-list",

  className: "list-inline",

  tagName: "ul",

  template: JST["tags/memo_tag_list"],

  deleteTagging: function (event) {
    event.preventDefault();

    var tagName = $(event.currentTarget).data('name');
    var memoId = this.model.id;
    var that = this;

    var tag = this.model.get('tags').where({name: tagName})[0]
    var taggingId = tag.get('tagging').id
    
    var tagging = new Memoboat.Models.Tagging({
      id: taggingId
    })

    tagging.destroy({
      success: function () {
        that.model.get('tags').remove(tag);
        that.model.fetch();
      }
    })
    
  },

  showTags: function (event) {
    var tagName = $(event.target).data('name');
    Memoboat.Routers.router.tagView(tagName);
  },

  installTagsListener: function () {
    if (!this.model.isNew()) {
      this.listenTo(this.model.get('tags'), "add remove change reset sync", this.render);    
    }
  },

  installTagForm: function () {
    var addTagForm = new Memoboat.Views.AddTagForm({
      model: this.model
    });

    this.$el.find('li:last').after(addTagForm.render().$el);
  },

  render: function () {

    this.installTagsListener();

    var renderedContent = this.template({
      tags: this.model.get('tags')
    });

    this.$el.html(renderedContent);

    this.installTagForm();

    return this;
  }


})