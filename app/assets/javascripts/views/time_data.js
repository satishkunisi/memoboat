Memoboat.Views.TimeData = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, "change sync", this.render)
  },

  tagName: "ul",

  id: "time-data",

  className: "list-inline",

  template: JST["time_data"],

  render: function () {
    var renderedContent = this.template({
      memoCreated: moment(this.model.get('created_at')).format('MMMM Do YYYY, h:mm a'),
      memoUpdated: moment(this.model.get('updated_at')).fromNow()
    });

    this.$el.html(renderedContent);


    return this;
  }


})
