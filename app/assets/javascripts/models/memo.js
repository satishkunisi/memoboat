Memoboat.Models.Memo = Backbone.Model.extend({
  
  preview: function () {
    return this.get('body').slice(0, 65);
  }
})