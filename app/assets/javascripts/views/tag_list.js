Memoboat.Views.TagList = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove sync", this.render)
  },

  events: {
    "click a.tag-list-item": "showTaggedMemos"
  },

  id: "tag-list",

  template: JST["tag_list"],

  showTaggedMemos: function (event) {
    event.preventDefault();
    var tagId = $(event.currentTarget).data('id');
    Memoboat.Routers.router.tagView(tagId);
  },

  render: function () {
    var renderedContent = this.template({
      tags: this.collection
    });

    this.$el.html(renderedContent);
    this.makeTagsDraggable();
    return this;
  },

  makeTagsDraggable: function () {
    this.$el.find('.tag-list-item').draggable({
      revert: "invalid",
      revertDuration: 200,
      scroll: false,
      opacity: 0.35,
      helper: 'clone'
    });
  }
})