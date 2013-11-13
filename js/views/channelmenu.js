var ChannelMenu = Backbone.View.extend({

	template:  Handlebars.getTemplate('menu'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		var data = {
			menu: this.model.attributes.channel.menu,
			social: this.model.attributes.channel.social
		};
		this.$el.html(this.template(data));
		return this;
	}
});