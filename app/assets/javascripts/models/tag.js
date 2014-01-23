Memoboat.Models.Tag = Backbone.Model.extend({
  urlRoot: "api/tags",

  label: function () {
    return this.get("name");
  }
})