Memoboat.Collections.Memos = Backbone.Collection.extend({
  
  // TODO: models, options
  initialize: function (models, options) {
    this.notebookId = options.notebookId;
  },

  model: Memoboat.Models.Memo,

  url: function () {
    return "/api/notebooks/" + this.notebookId + "/memos"
  },

  comparator: function (memo) {
    return -memo.get('updated_at_as_date');
  }
  
})