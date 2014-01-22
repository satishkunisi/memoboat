Memoboat.Views.TagSidebar = Backbone.View.extend({
  initialize: function () {

  },

  template: JST["tag_sidebar"],

  id: "tag-sidebar",

  render: function () {
    var renderedContent = this.template({
      tags: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
})