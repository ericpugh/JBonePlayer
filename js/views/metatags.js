var Metatags = Backbone.View.extend({

	template:  Handlebars.getTemplate('metatags'),

	initialize: function() {
		this.listenToOnce(this.model, "change", this.render);
		}
	},

	render: function () {
		var data = {
			title: this.model.attributes.title,
			link: this.model.attributes.link,
			location: this.model.attributes.location,
			image: this.model.attributes.image,
		};
		this.$el.html(this.template(data));
		return this;
	}
});