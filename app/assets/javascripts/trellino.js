window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function ($rootEl) {
    Trellino.Collections.boards.fetch();
		
    Trellino.Routers.router = new Trellino.Routers.Router({
      $rootEl: $rootEl
    });
    
    Backbone.history.start();
  }
};