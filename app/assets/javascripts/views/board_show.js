Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST["board/show"],
  className: "board",
  events: {
    "submit #new-list-form": "createList"
  },
  
  createList: function (event) {
    var that = this;
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.lists().create(params, {wait: true});
  },
  
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync add remove", this.render);
    this.subviews = [];
  },
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    this.masonry();
    this.sorting();
    this.randomizeColors();
    
    return this;
  },
  
  renderSubviews: function () {
    var that = this;
    this.removeSubviews();
    
    var $tiles = this.$('.tiles');
    this.model.lists().each(function(list){
      var showListsView = new Trellino.Views.ListShow({
        model: list
      });
      that.subviews.push(showListsView);
      
      $tiles.append(showListsView.render().$el);
    });
    this.$el.append($tiles);
  },
  
  removeSubviews: function(){
    this.subviews.forEach(function(subview){
      subview.remove();
    });
  },
  masonry: function(){
    var container = document.querySelector('.tiles');
    var msnry = new Masonry( container, {
      columnWidth: 290,
      itemSelector: '.list'
    });
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
  randomizeColors: function(){
    var colors = [
      "#16a085",
      "#f1c40f",
      "#f39c12",
      "#27ae60",
      "#e67e22",
      "#d35400",
      "#3498db",
      "#2980b9",
      "#e74c3c",
      "#c0392b",
      "#8e44ad",
      "#2c3e50",
      "#7f8c8d"
    ];
    _(this.subviews).each(function(subview){
      subview.$el.css("background-color", _.sample(colors));
    });
  }
});