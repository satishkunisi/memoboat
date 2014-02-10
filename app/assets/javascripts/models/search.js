Memoboat.Models.Search = Backbone.Model.extend({
  urlRoot: "api/search",

  parse: function (attributes) {
    var memos = new Memoboat.Collections.SearchMemos(attributes.memos);
    attributes.memos = memos;
    return attributes;
  },

  toJSON: function () {
    var attributes = _.clone(this.attributes);
    delete attributes.memos;
    return attributes;
  }

})