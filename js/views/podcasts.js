var PodcastsView = Backbone.View.extend({

	template:  Handlebars.getTemplate('podcasts'),

	initialize: function  () {
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "add", this.render);
		this.listenTo(this.collection, "remove", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.collection));
		return this;
	}

});
