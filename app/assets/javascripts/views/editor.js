Memoboat.Views.Editor = Backbone.View.extend({
  initialize: function () {
    var that = this;
  },

  className: "col-xs-6 well well-lg",

  id: "editor",

  template: JST['editor/main'],

  setFocus: function () {
    $(this.focusEl).focus();
    var inputData = $(this.focusEl).val();
    $(this.focusEl).val('');
    $(this.focusEl).val(inputData);
  },

  render: function () {
    var mainContent = this.template({
      memo: this.model
    });

    var controls = new Memoboat.Views.EditorControls({
      model: this.model,
      collection: this.collection
    })

    var timeData = new Memoboat.Views.TimeData({
      model: this.model
    });

    var titleInput = new Memoboat.Views.TitleInput({
      model: this.model,
      collection: this.collection
    });

    var imageForm = new Memoboat.Views.ImageForm({
      model: this.model,
      collection: this.collection
    })

    var bodyInput = new Memoboat.Views.BodyInput({
      model: this.model,
      collection: this.collection
    });

    var memoTagList = new Memoboat.Views.MemoTagList({
      model: this.model
    });

                 
    this.$el.html(mainContent)

    this.$el.append(memoTagList.render().$el)
            .append(imageForm.render().$el)
            .append(titleInput.render().$el)
            .append(bodyInput.render().$el)
            .prepend(controls.render().$el)
            .prepend(timeData.render().$el);

    this.makeMemoListDroppable();

    return this;
  },

  makeMemoListDroppable: function () {
    var that = this;

    this.$el.droppable({
      accept: ".tag-list-item",
      hoverClass: "active",
      drop: function (event, ui) {
        var tagId = ui.draggable.data('id');
        var tag = Memoboat.userTags.get(tagId)

        var tagging = new Memoboat.Models.Tagging({
          memo_id: that.model.id,
          tag_id: tagId
        });

        tagging.save({}, {
          success: function () {
            that.model.get('tags').add(tag);
            that.model.fetch();
          }
        });
      }
    });
  },
})