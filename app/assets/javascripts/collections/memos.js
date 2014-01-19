Memoboat.Collections.Memos = Backbone.Collection.extend({
  
  initialize: function (options) {
    this.notebookId = options.notebookId;
  },

  model: Memoboat.Models.Memo,

  url: function () {
    return "/api/notebooks/" + this.notebookId + "/memos"
  },

  comparator: function (memo) {
    return memo.updatedAt;
  }
  
})