Memoboat.Models.Memo = Backbone.Model.extend({

  urlRoot: "/api/memos",

  preview: function () {
    if (this.get('body')) {
      return this.get('body').slice(0, 65);
    } else {
      return;
    }
    
  },

  parse: function (attributes) {
    Memoboat.userTags.add(attributes.tags)
    attributes.tags = new Memoboat.Collections.Tags(attributes.tags, {
      memoId: attributes.id
    });

    attributes.updated_at_as_date = Date.parse(attributes.updated_at);

    return attributes;
  },

  toJSON: function () {
    var attributes = _.clone(this.attributes);
    delete attributes.tags;
    delete attributes.updated_at_as_date;
    return attributes;
  }
})