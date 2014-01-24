Memoboat.Models.TaggedMemo = Backbone.Model.extend({

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

    return attributes;
  },

  toJSON: function () {
    var attributes = _.clone(this.attributes);
    delete attributes.tags;
    return attributes;
  }
})