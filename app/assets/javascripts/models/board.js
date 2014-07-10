Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',
  
  parse: function (respJSON) {
    if (respJSON.lists) {
      this.lists().set(respJSON.lists, { parse: true });
      delete respJSON.lists;
    }
    
    return respJSON;
  },
  
  lists: function () {
    if (!this._lists) {
      this._lists = new Trellino.Collections.List([], {
        board: this
      });
    }
    
    return this._lists;
  }
  
  
});