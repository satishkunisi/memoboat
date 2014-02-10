Memoboat.Views.SearchMemosList = Backbone.View.extend({

  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "add change remove reset", this.render);
  
  },

  events: {
    "click .memo-item": "showMemo"
  },

  template: JST['search_memos'],

  className: "col-xs-3",

  id: "search-memos-list",

  removeMemo: function (options) {
    var memo = this.collection.get(options.memoId);
    this.collection.remove(memo);
  },  

  showMemo: function (event) {
    event.preventDefault();

    var memoId = $(event.currentTarget).data('id');
    var notebookId = this.collection.notebookId;
    this._swapActiveMemo($(event.currentTarget));
    Memoboat.Routers.router.switchTaggedMemoEditor(this.collection, memoId);
  },

  makeMemosDraggable: function () {
    this.$el.find('.list-group-item').draggable({
      revert: "invalid",
      revertDuration: 200,
      opacity: 0.35,
      scroll: true,
      helper: 'clone'
    });
  },

  searchAndHighlight: function (searchTerm) {
    if (searchTerm) {
        var wholeWordOnly = new RegExp("\\b"+searchTerm+"\\b","ig"); //matches whole word only
        //var anyCharacter = new RegExp("\\g["+searchTerm+"]\\g","ig"); //matches any word with any of search chars characters
                                 //default selector is body if none provided
        //var searchTermRegEx = new RegExp(searchTerm,"ig");
        var matches = this.$el.text().match(wholeWordOnly);
        console.log(matches)
        if(matches) {
          console.log(matches)
          this.$el.html(this.$el.html()
                                .replace(wholeWordOnly, "<span class='highlight'>"+searchTerm+"</span>"));
          return true;
        }
    }
    return false;
  },

  render: function () {
    var renderedContent = this.template({
      memos: this.collection,
      queryString: this.model.id
    });

    this.$el.html(renderedContent);

    this.searchAndHighlight(this.model.id);
    this.makeMemosDraggable();

    return this;
  },

  _swapActiveMemo: function ($memo) {
    this._activeMemo && this._activeMemo.removeClass('active');
    this._activeMemo = $memo
    $memo.addClass('active');
  }
})