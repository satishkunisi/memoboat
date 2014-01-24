Memoboat.Views.AddNotebook = Backbone.View.extend({
  
  events: {
    "click button": "submit"
  },

  id: "add-notebook-form",

  tagName: "form",

  className: "form-inline",

  template: JST["add_notebook"],

  render: function () {
    var renderedContent = this.template({
      notebook: this.model
    })

    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    var that = this; 

    event.preventDefault();
    var formData = $(event.target.form).serializeJSON();
    this.model.set(formData["notebook"]);
    
    $('#memo-notebook-id').trigger('chosen:updated');
    this.collection.create(this.model, {wait: true});
  }


})