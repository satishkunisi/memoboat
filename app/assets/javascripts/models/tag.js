Memoboat.Models.Tag = Backbone.Model.extend({
  urlRoot: "api/tags",
  
  parse: function (attributes) {
    attributes.memos = new Memoboat.Collections.TaggedMemos(attributes.memos);
    return attributes;
  },

  toJSON: function () {
    var attributes = _.clone(this.attributes);
    delete attributes. memos;
    return attributes;
  }
})