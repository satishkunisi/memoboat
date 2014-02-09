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