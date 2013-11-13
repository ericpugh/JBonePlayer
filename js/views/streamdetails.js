var StreamDetails = Backbone.View.extend({

	template:  Handlebars.getTemplate('streamdetails'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			url: (typeof this.model.attributes.url != 'undefined') ? this.model.attributes.url : "",
			title: (typeof this.model.attributes.title != 'undefined') ? this.model.attributes.title : "Stream information unavailable",
			category: (typeof this.model.attributes.category != 'undefined') ? this.model.attributes.category : "",
			description: (typeof this.model.attributes.description != 'undefined') ? this.model.attributes.description : "",
			appUrl: (typeof this.model.attributes.appUrl != 'undefined') ? this.model.attributes.appUrl : document.URL,
			share: (_.isObject(this.model.attributes.share)) ? this.model.attributes.share : ""
		};
		this.$el.html(this.template(data));
		return this;
	}
});