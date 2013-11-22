var PodcastDetails = Backbone.View.extend({

	template:  Handlebars.getTemplate('podcastdetails'),

	events: {'click .podcast-resume': 'playPodcast'},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model));
		this.delegateEvents();
		return this;
	},

	playPodcast: function(e){
		e.preventDefault();
		console.log('playing ' + this.model.attributes.title + this.model.attributes.url);
		$("#jp-player").jPlayer("clearMedia");
		$('#jp-player').jPlayer("setMedia", {mp3: this.model.attributes.url});
		$('#jp-player').jPlayer("play");

		//alert('play podcast');
	}

});