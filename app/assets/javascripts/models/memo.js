Memoboat.Models.Memo = Backbone.Model.extend({
  
  preview: function () {
    if (this.get('body')) {
      return this.get('body').slice(0, 65);
    } else {
      return;
    }
    
  }
})