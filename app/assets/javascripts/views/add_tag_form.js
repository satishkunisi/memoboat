Memoboat.Views.AddTagForm = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["tags/add_tag_form"],
  
  id: "create-tag-form",

  tagName: "li",
  
  events: {
    "keydown #add-tag-input": "tagMemo"
  },

  tagMemo: function (event) {

    if (event.which !== 13) {
      return;
    }

    event.preventDefault();
    var that = this;

    var formData = $(event.target.form).serializeJSON();
    var tagName = formData["new_tag"]["name"];

    var matchingTag = Memoboat.userTags.where({name: tagName})[0];

    if (matchingTag) {
      this.addTagging(matchingTag)
    } else {
      this.createTag(tagName)
    }
  },

  createTag: function (tagName) {
    var that = this;

    var tag = new Memoboat.Models.Tag({
      name: tagName 
    })

    tag.save({}, {
      success: function () {
        that.addTagging(tag);
        Memoboat.userTags.add(tag);
      }
    })
    
  },

  addTagging: function (tag) {
    var that = this;

    var tagging = new Memoboat.Models.Tagging({
      memo_id: this.model.id,
      tag_id: tag.id
    });

    tagging.save({}, {
      success: function () {
        that.model.get('tags').add(tag);
        that.model.fetch();
      }
    });
  },


  render: function () {
    var disabled = this.model.isNew();
    var renderedContent = this.template({
      model: this.model,
      disabled: disabled
    });

    var tags = new Bloodhound({
     datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
     queryTokenizer: Bloodhound.tokenizers.whitespace,
     local: Memoboat.userTags.allNames()
    });
 
    tags.initialize();
     
    this.$el.html(renderedContent);

    this.$el.find('.twitter-typeahead')
            .typeahead(null, {
              displayKey: 'name',
              source: tags.ttAdapter()
            })

    return this;
  }
})