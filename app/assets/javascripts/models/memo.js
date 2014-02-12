Memoboat.Models.Memo = Backbone.Model.extend({

  urlRoot: "/api/memos",

  preview: function () {
    var bodyText = this.get('body');

    if (!bodyText) {
      return;
    } else if (bodyText.length > 70) {
      return (bodyText.slice(0, 70) + "...");
    } else {
      return bodyText;
    }
  },

  shortTitle: function () {
    if (this.get('title').length < 16) {
      return this.get('title');
    } else {
      return this.get('title').slice(0, 16) + "...";
    }
  },

  hasImage: function () {
    var title = this.get('image_small_url');

    return !(!title || (title === "/images/small/missing.png"))
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

    ["updated_at_as_date", "image_small_url", "image_big_url"].forEach(function (attr) {
      delete attributes[attr];
    });

    return attributes;
  }
})