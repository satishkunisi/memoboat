Memoboat.Models.Tag = Backbone.Model.extend({

  initialize: function (attributes) {
    this.name = attributes.name;
  },

  methodToURL: function (method) {
    if (method === 'read') {
      return '/api/user_tags/' + this.get('name');
    } else if (method === 'create') {
      return '/api/tags';
    }
  },

  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL(method.toLowerCase());

    return Backbone.sync.apply(this, arguments);
  },

  parse: function (attributes) {
    attributes.memos = new Memoboat.Collections.TaggedMemos(attributes.memos);
    return attributes;
  },

  toJSON: function () {
    var attributes = _.clone(this.attributes);
    delete attributes.memos;
    return attributes;
  }
})