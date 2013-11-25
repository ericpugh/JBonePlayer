(function($){

	var AppRouter = Backbone.Router.extend({
		routes: {
			"schedule": "schedule",
			"podcasts": "podcasts",
			"podcasts/:cid": "podcast",
			"about": "about",
			"help": "help",
			"error": "error",
			"*listen": "listen"
		},

		initialize: function(){

			console.log('initalize app');

			//TODO should I make all other Models nested under Channel model??

			//Channel
			this.channelModel = new Channel();			
			this.channelModel.fetch({
				success: function(channel){
					//initialize jPlayer
					channel.initPlayer();
		        }
			})

	        this.channelBrandingView = new ChannelBranding({
				model: this.channelModel
			});
			$('#branding').html(this.channelBrandingView.render().el);
	        
	        this.channelMenuView = new ChannelMenu({
				model: this.channelModel
			});
			$('#menu').html(this.channelMenuView.render().el);


			//Stream
			this.streamModel = new Stream();
			this.streamModel.fetch({
				success: function(stream){
					//start polling the stream's remote metadata
					var poller = Backbone.Poller.get(stream, {
					    delay: 5000, 
					    url: stream.get('playerConfig').metadataRemoteService + '?l=' + stream.get('streamUrl')
					});
					poller.on('success', function(){
					 //console.log('polling...'); 
					});
					poller.start();


				}
			});

			this.streamDetailsView = new StreamDetails({
				model: this.streamModel
			});
			$('#main-content').html(this.streamDetailsView.render().el);

			//TODO how to get this from config??
			this.podcastUrl = 'http://apps.innovation-series.com/streamreader/remote.feedparser.php?l=http://www.npr.org/rss/podcast.php?id=510299';

			//Podcasts
			this.podcasts = new Podcasts({
				url: this.podcastUrl
			});
			this.podcasts.fetch();
			this.PodcastsView = new PodcastsView({
				collection: this.podcasts
			});
			this.podcastDetails = new Podcast();
			this.podcastDetailsView = new PodcastDetails({
				model: this.podcastDetails
			});

			/*console.log("Channel Model:");
			console.log(this.channelModel);
			console.log("Stream Model:");
			console.log(this.streamModel);*/

			//hide loading
			$('#loading').fadeOut("slow");

		},

		listen: function(){
			this.streamDetailsView = new StreamDetails({
				model: this.streamModel
			});
			$('#main-content').html(this.streamDetailsView.render().el);
		},

		schedule: function () {
			$('#main-content').html('<p>TODO Schedule Page</p>');
		},

		podcasts: function () {
			//display podcasts collection
			$('#main-content').html(this.PodcastsView.render().el);
		},

		podcast: function (cid) {
			//display specific podcast 
			this.podcastDetailsView.model = this.podcasts.get(cid);
			$('#main-content').html(this.podcastDetailsView.render().el);
		},

		about: function () {
			//TODO template the about page?
			var about = Handlebars.getTemplate('about');
			var channelAttrs = this.channelModel.get('channel');
			$('#main-content').html(about(channelAttrs));
			//$('#main-content').html(channelAttrs.description);
		},

		help: function () {
			//output the static help.handlebars tempalte
			var help = Handlebars.getTemplate('help');
			$('#main-content').html(help);
		},

	});

	var app = new AppRouter();

	Backbone.history.start();

})(jQuery);
