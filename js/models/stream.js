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
		//this.attributes.appUrl = document.URL;
		this.set('appUrl', document.URL);
	},
	
	parse: function(data, options) {
		if('streams' in data){
			//update model with first item in channel streams array
			defaults = data.streams[0];
			defaults.playerConfig = data.playerConfig;
			return defaults;
		} else if('metadata' in data){
			updated = _.clone(this.attributes);
			//update model with remote "metadata" values
			updated.title = data.metadata.streamtitle;
			updated.description = data.metadata.station;
			updated.category = data.metadata.genre;
			return updated;
		}
		return data;
	}


});