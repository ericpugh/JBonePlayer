var Podcasts = Backbone.Collection.extend({
	model: Podcast,
	url: 'http://apps.innovation-series.com/streamreader/remote.feedparser.php?l=http://www.npr.org/rss/podcast.php?id=510299',

	initialize: function() {
		//group podcasts by month (is this working?)
		_.groupBy(this.models, function (model){
		    model.get("month");
		})
	},

	
});