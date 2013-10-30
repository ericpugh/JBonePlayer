var StreamDetails = Backbone.View.extend({

	template:  Handlebars.getTemplate('streamdetails'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			title: (typeof this.model.attributes.title != 'undefined') ? this.model.attributes.title : "Stream information unavailable",
			category: (typeof this.model.attributes.category != 'undefined') ? this.model.attributes.category : "",
			description: (typeof this.model.attributes.description != 'undefined') ? this.model.attributes.description : "",
			share: (typeof this.model.attributes.share != 'undefined') ? this.model.attributes.share : ""
		};
		console.log('metadata render updated: ');
		console.log(data);
		this.$el.html(this.template(data));
		return this;
	}
});