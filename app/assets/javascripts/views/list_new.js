Trellino.Views.ListNew = Backbone.View.extend({
  template: JST["list/new"],
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});