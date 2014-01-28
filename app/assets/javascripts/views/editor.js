Memoboat.Views.Editor = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  className: "col-xs-6 well well-lg",

  id: "editor",

  template: JST['editor/main'],

  render: function () {

    var mainContent = this.template({
      memo: this.model
    });

    var tag_controls = new Memoboat.Views.TagControls({
      model: this.model
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

    var bodyInput = new Memoboat.Views.BodyInput({
      model: this.model,
      collection: this.collection
    });

    if (!this.model.isNew()) {
      var memoTagList = new Memoboat.Views.MemoTagList({
        model: this.model
      });
    }
                 
    this.$el.html(mainContent)

    this.$el.append(tag_controls.render().$el)
            .append(timeData.render().$el)
            .append(titleInput.render().$el)
            .append(bodyInput.render().$el)
            .prepend(controls.render().$el);

    if (!this.model.isNew()) {
       this.$el.find('#time-data').before(memoTagList.render().$el);
    }

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