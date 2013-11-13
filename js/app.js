(function($){

	var AppRouter = Backbone.Router.extend({
		routes: {
			"schedule": "schedule",
			"podcasts": "podcasts",
			"about": "about",
			"help": "help",
			"error": "error",
			"*listen": "listen"
		},

		initialize: function(){
			console.log('initalize app');

			//Models
			this.channelModel = new Channel();			
			this.channelModel.fetch({
				success: function(channel){
					//TODO hide loader?
					//initialize jPlayer
					channel.initPlayer();
		        }
			})

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


			/*console.log("Channel Model:");
			console.log(this.channelModel);

			console.log("Stream Model:");
			console.log(this.streamModel);*/


	        //Render Views 
	        this.channelBrandingView = new ChannelBranding({
				model: this.channelModel
			});
			$('#branding').html(this.channelBrandingView.render().el);
	        
	        this.channelMenuView = new ChannelMenu({
				model: this.channelModel
			});
			$('#menu').html(this.channelMenuView.render().el);
			
			this.streamDetailsView = new StreamDetails({
				model: this.streamModel
			});
			$('#main-content').html(this.streamDetailsView.render().el);

			this.podcasts = new Podcasts();
			this.podcasts.fetch();
			this.PodcastsView = new PodcastsView({collection: this.podcasts});
			console.log(this.podcasts);


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
			//fetch podcasts model
			//render
			$('#main-content').html(this.PodcastsView.render().el);
		},

		about: function () {
			$('#main-content').html(this.channelModel.get('description'));
			//console.log(this.channelModel);
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
