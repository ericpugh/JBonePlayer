var Podcasts = Backbone.Collection.extend({
	model: Podcast,

	initialize: function(params) {
		//set the url to get data
		this.url = params.url;
		//group podcasts by month (is this working?)
		_.groupBy(this.models, function (model){
		    model.get("month");
		})
	},

	
});