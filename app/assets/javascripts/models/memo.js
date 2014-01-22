Memoboat.Models.Memo = Backbone.Model.extend({

  urlRoot: "/api/memos",

  preview: function () {
    if (this.get('body')) {
      return this.get('body').slice(0, 65);
    } else {
      return;
    }
    
  },

  parse : function (attributes) {
    if (attributes.tags) {
      Memoboat.userTags.add(attributes.tags)
      attributes.tags = new Memoboat.Collections.Tags(attributes.tags, {
        memoId: attributes.id
      })
    }

    return attributes;
  }
})