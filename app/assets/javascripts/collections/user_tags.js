Memoboat.Collections.UserTags = Backbone.Collection.extend({
  url: "/api/tags",
  model: Memoboat.Models.Tag
})