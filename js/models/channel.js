var Channel = Backbone.Model.extend({

	urlRoot: 'js/app.config.json',

	defaults: {
		streams: [],
		channel: {
			title: 'BBG Stream Player',
			description: 'This is a demo of the BBG Stream Player',
			link: '',
			image: '',
			appUrl: '',
			styles: [],
			social: {
				facebookUrl: '',
				twitterHandle: '',
				googlePlusUrl: '',
				websiteUrl: ''
			},
			location: {
				city: '',
				country: '',
				local: ''
			},
			menu: {
				listen: true,
				schedule: false,
				podcasts: false,
				about: true,
				help: true
			}
		},
		playerConfig: {
			embedPlayer: null,
			popoutPlayer: null,
			metadataRemoteService: '', 
			feedparserRemoteService: '',
			styleFolder: '',
			trackIncrement: 30,
			trackEventCategory: '',
			jplayerSwfLocation: '',
			jplayerSolution: '',
			trackingEnabled: true,
			metadataStreamEnabled: true,
			autoplay: false,
			showPosters: false
		}
	},

	initialize: function() {
		this.attributes.appUrl = document.URL;
		//bind custom functions
		_.bindAll(this, 'initPlayer');
	},

	initPlayer: function(){
		var currentStream = this.attributes.streams[0];
		var playerConfig = this.attributes.playerConfig;
		$('#jp-player').jPlayer({
				solution: playerConfig.jplayerSolution,
				swfPath: playerConfig.jplayerSwfLocation,
				supplied: 'mp3',
				preload: 'none',
				wmode: 'window',
				cssSelectorAncestor: '#jp_container_1',
				keyEnabled: true,
				warningAlerts: false,
				errorAlerts: false,
				ready: function (event) {
					console.log('jplayer ready event');
					$(this).jPlayer('setMedia', { mp3: currentStream.streamUrl });
					if(playerConfig.autoplay){
						$(this).jPlayer('play');
					}
				},
				play: function(event) {
					console.log('jplayer play event');
				},
				ended: function(event) {
				},
				pause: function(event) {
					console.log('jplayer pause event');
				},
				timeupdate: function(event) {
				},
				error: function(event) {
					console.log('jplayer error event:');
					console.log(event);
				},
		});
	}



});