Memoboat.Collections.SearchMemos = Backbone.Collection.extend({
  url: "api/memos",
  model: Memoboat.Models.Memo
})