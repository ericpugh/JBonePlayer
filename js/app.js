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
			console.log('init app');
			//Models
			this.channelModel = new Channel();
			this.channelModel.fetch({
				success: function(model){
					//TODO hide loader?
					//initialize jPlayer
					model.initPlayer();
		        }
			});
			console.log("Channel Model:");
			console.log(this.channelModel);

			//TODO use poller to start polling remote metadata
			this.streamModel = new Stream();
			//this.streamModel.url = 'http://apps.innovation-series.com/streamreader/remote.streaminfo.php?l=';
			//this.streamModel.fetch();
			console.log("Stream Model:");
			console.log(this.streamModel);


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

			$('#stream').html(this.streamDetailsView.render().el);

			//this.streamModel.sync();

		},

		listen: function(){

		},

		podcasts: function () {
			//fetch podcasts model
			//render
			alert('the podcasts page');
		},

		about: function () {
			alert('the about page');
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
