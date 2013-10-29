var ChannelBranding = Backbone.View.extend({

	template:  Handlebars.getTemplate('branding'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			title: this.model.attributes.channel.brandingTitle,
			link: this.model.attributes.channel.brandingLink,
			location: this.model.attributes.channel.location,
			image: this.model.attributes.channel.brandingImage,
		};
		this.$el.html(this.template(data));
		return this;
	}
});