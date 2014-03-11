Memoboat.Models.Notebook = Backbone.Model.extend({
  shortTitle: function () {
    if (this.get('title').length > 10) {
      return this.get('title').slice(0, 7) + "...";
    } else {
      return this.get('title');
    }
  }
})