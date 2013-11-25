var StreamDetails = Backbone.View.extend({

	template:  Handlebars.getTemplate('streamdetails'),
	events: {
		'click #btnPlay': 'playLiveStream',
		'click .jp-station': 'playLiveStream',
		'click #btnPause': 'pauseLiveStream',
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		var data = {
			url: (typeof this.model.attributes.url != 'undefined') ? this.model.attributes.url : "",
			title: (typeof this.model.attributes.title != 'undefined') ? this.model.attributes.title : "Stream information unavailable",
			category: (typeof this.model.attributes.category != 'undefined') ? this.model.attributes.category : "",
			description: (typeof this.model.attributes.description != 'undefined') ? this.model.attributes.description : "",
			appUrl: (typeof this.model.attributes.appUrl != 'undefined') ? this.model.attributes.appUrl : document.URL,
			share: (_.isObject(this.model.attributes.share)) ? this.model.attributes.share : ""
		};
		this.$el.html(this.template(data));
		this.delegateEvents();
		return this;
	},

	playLiveStream: function(e){
		e.preventDefault();
		if($("#jp-player").data("jPlayer").status.paused && ){
			//play the paused player
			$('#jp-player').jPlayer("play");
		} else {
			//set the livestream url
			$("#jp-player").jPlayer("clearMedia");
			$('#jp-player').jPlayer("setMedia", {mp3: this.model.attributes.streamUrl});
			$('#jp-player').jPlayer("play");
		}
		$('.stream-details .play').hide();
		$('.stream-details .pause').show();
	},

	pauseLiveStream: function(){
		$('#jp-player').jPlayer("pause");
		$('.stream-details .pause').hide();
		$('.stream-details .play').show();
	}

});