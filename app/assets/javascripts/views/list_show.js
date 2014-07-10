Trellino.Views.ListShow = Backbone.View.extend({
  className: "list",
  tagName: "li",
  events: {
    "click .close-x": "deleteList",
    "submit #new-card-form": "createCard"
  },
  deleteList: function(){
    this.model.destroy();
  },
  attributes: function () {
    return { id: "list-" + this.model.id };
  },
  
  template: JST["list/show"],
    
  createCard: function (event) {
    var that = this;
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.cards().create(params, {wait: true});
  },
  
  initialize: function(){
    this.subviews = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "sync add remove", this.render);
  },
  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    this.sorting();
    return this;
  },
  renderSubviews: function () {
    var that = this;
    this.removeSubviews();
    
    var $ul = this.$(".cards");
    this.model.cards().each(function(card){
      var showCardsView = new Trellino.Views.CardShow({
        model: card
      });
      that.subviews.push(showCardsView);
      
      $ul.append(showCardsView.render().$el);
    });
    this.$el.append($ul);
  },
  sorting: function(){
    $('ul.cards').sortable({
        axis: 'y',
        stop: function (event, ui) {
	        var data = $(this).sortable('serialize');
          $.ajax({
            data: data,
            type: 'POST',
            url: '/api/cards/swapranks'
          });
	      }
    });
  },
  removeSubviews: function(){
    this.subviews.forEach(function(subview){
      subview.remove();
    });
  }
  
});