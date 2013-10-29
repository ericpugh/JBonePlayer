var ChannelMenu = Backbone.View.extend({

	template:  Handlebars.getTemplate('menu'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			share: this.model.attributes.channel.share,
			menu: this.model.attributes.channel.menu,
		};
		this.$el.html(this.template(data));
		return this;
	}
});