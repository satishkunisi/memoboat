Memoboat.Views.TagList = Backbone.View.extend({

  template: JST["tag_list"],

  render: function () {
    var renderedContent = this.template({
      tags: this.collection
    });

    this.$el.html(renderedContent);

    return this
  }
})