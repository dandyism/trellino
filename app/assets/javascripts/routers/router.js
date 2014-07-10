Trellino.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
  },
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },
  boardsIndex: function(){
    var boardIndexView = new Trellino.Views.BoardIndex({
      collection: Trellino.Collections.boards
    });
    this._swapView(boardIndexView);
  },
  boardsNew: function(){

  },
  boardsShow: function(id){
    var board = Trellino.Collections.boards.getOrFetch(id);
    
    var boardShowView = new Trellino.Views.BoardShow({
      model: board
    });
    
    this._swapView(boardShowView);
  },
  _swapView: function(view){
    if(this._currentView) this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});