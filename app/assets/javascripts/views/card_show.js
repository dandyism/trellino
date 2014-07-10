Trellino.Views.CardShow = Backbone.View.extend({
  className: 'card',
  tagName: 'li',
  events: {
    "click .close-x": "deleteCard"
  },
  deleteCard: function (event) {
    this.model.destroy();
  },
  attributes: function(){
    return { id: "card-" + this.model.id };
  },
  template: JST["card/show"],
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});