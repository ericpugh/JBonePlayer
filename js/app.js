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
					 console.log('polling...'); 
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


		},

		listen: function(){


		},

		podcasts: function () {
			//fetch podcasts model
			//render
			alert('the podcasts page');
		},

		about: function () {
			//alert(this.channelModel.get('description'));
		},

		help: function () {
			alert('the help page');
		},

		help: function () {
			alert('the help page');
		},

	});

	var app = new AppRouter();

	Backbone.history.start();

})(jQuery);
