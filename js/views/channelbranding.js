var ChannelBranding = Backbone.View.extend({

	template:  Handlebars.getTemplate('branding'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			title: this.model.attributes.channel.title,
			link: this.model.attributes.channel.link,
			location: this.model.attributes.channel.location,
			image: this.model.attributes.channel.image,
		};
		this.$el.html(this.template(data));
		return this;
	}
});