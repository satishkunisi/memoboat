Memoboat.Collections.Tags = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.memoId = options.memoId;
  },

  model: Memoboat.Models.Tag,

  url: function () {
    return "/api/memos/" + this.memoId + "/tags/"
  }
})