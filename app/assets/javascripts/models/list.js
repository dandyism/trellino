Trellino.Models.List = Backbone.Model.extend({
  parse: function (respJSON) {
    if (respJSON.cards) {
      this.cards().set(respJSON.cards);
      delete respJSON.cards;
    }
    
    return respJSON;
  },
  
  cards: function () {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }
    
    return this._cards;
  }
});