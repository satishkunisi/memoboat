Memoboat.Views.MemoTagForm = Backbone.View.extend({
  initialize: function () {
  },
  id: "memo-tag",
  
  template: JST["memo_tag_form"],

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

    tagging.save({},{
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
    
    if (this.model.isNew()) {
      return this;
    }

    this.installAddTagForm();
    this.installMemoTagList();
    return this;
  },

  installAddTagForm: function () {
    var view = new Memoboat.Views.AddTagForm({
      model: this.model
    });

    this.$el.prepend(view.render().$el);
  },

  installMemoTagList: function () {
    var view = new Memoboat.Views.MemoTagList({
      model: this.model
    });

    this.$el.append(view.render().$el);
  }
})


// $(this.$el.find('.typeahead')).typeahead({
    //   name: "hi",
    //   local: ["yo", "yourself", "meow"]
    // });