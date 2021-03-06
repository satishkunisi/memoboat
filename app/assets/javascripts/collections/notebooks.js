Memoboat.Collections.Notebooks = Backbone.Collection.extend({
  model: Memoboat.Models.Notebook,
  
  url: "/api/notebooks",

  comparator: function (notebook) {
    return notebook.get('created_at');
  }
})