var StreamDetails = Backbone.View.extend({
	template: Handlebars.compile(
		'<div>' +
		'<h1>{{name}}</h1>' +
		'<p><span class="label">{{category}}</span></p>' +
		'<div>{{description}}<div>' +
		'</div>'
	),

	initialize: function() {},

	render: function () {
		this.$el.html(this.template(this.options));
		return this;
	}
});