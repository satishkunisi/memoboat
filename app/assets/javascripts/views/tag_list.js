Memoboat.Views.TagList = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove sync", this.render)
  },

  template: JST["tag_list"],

  render: function () {
    var renderedContent = this.template({
      tags: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
})