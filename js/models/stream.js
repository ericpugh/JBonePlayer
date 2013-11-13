var Stream = Backbone.Model.extend({

	urlRoot: 'js/app.config.json',

	defaults: {
		url: '',
		dataUrl: '',
		appUrl: '',
		format: '',
		title: 'Unable to load stream details',
		description: '',
		category: '',
		siteUrl: '',
		share: { 
			shareLink: '',
			facebook: {
				enabled: true
			},
			twitter: {
				enabled: true
			},
			email: {
				enabled: true,
				subject: 'Live Radio',
				body: 'I wanted to share this online radio station with you.'
			}
		},
		playerConfig: {}
	},

	initialize: function() {
		this.set('appUrl', document.URL);
	},
	
	parse: function(data, options) {
		if('streams' in data){
			//update model with defaults from app.config.json
			defaults = data.streams[0];
			defaults.playerConfig = data.playerConfig;
			defaults.share = data.channel.share;
			return defaults;
		} else if('metadata' in data){
			updated = _.clone(this.attributes);
			//update model with remote "metadata" values
			updated.title = data.metadata.station;
			updated.description = data.metadata.streamtitle;
			updated.category = data.metadata.genre;
			return updated;
		}
		return data;
	}


});