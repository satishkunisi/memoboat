Memoboat.Collections.UserTags = Backbone.Collection.extend({
  url: "/api/user_tags",
  model: Memoboat.Models.Tag,
  allNames: function () {
    return this.map(function (tag) {
      return {name: tag.get('name')}
    });
  }
})