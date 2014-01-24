Memoboat.Views.TagMemoForm = Backbone.View.extend({
  initialize: function () {
  
  },

  id: "tag-memo",

  tagName: "li",
  
  template: JST["tag_memo_form"],

  events: {
    "change select": "tagForm"
  },

  tagForm: function (event) {

    event.preventDefault();
    var that = this;

    var tagId = $(event.target).find('option:selected').data('id');
    var tag = Memoboat.userTags.get(tagId)

    var tagging = new Memoboat.Models.Tagging({
      memo_id: this.model.id,
      tag_id: tagId
    });

    tagging.save({}, {
      success: function () {
        that.model.get('tags').add(tag);
        that.model.fetch();
      }
    });
    
  },

  render: function () {

    var renderedContent = this.template({
      tags: Memoboat.userTags
    });
  
    this.$el.html(renderedContent);

    this.$el.find("#tag-name").chosen({
      disable_search_threshold: 10,
      placeholder_text_multiple: "Tag this memo.",
      no_results_text: "Oops, nothing found!",
      width: "100%"
    });
    
    return this;
  },
});