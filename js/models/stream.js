var Stream = Backbone.Model.extend({

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
			},
			embed: {
				enabled: false,
				instructions: 'Copy the following to embed the player:',
				hide: 'Hide'
			}
		}
	},

	initialize: function() {
		this.attributes.appUrl = document.URL;
		
	},
	
	parse: function(data, options) {
		if('metadata' in data){
			updated = _.clone(this.attributes);
			//update model with metadata values
			updated.title = data.metadata.streamtitle;
			updated.description = data.metadata.station;
			updated.category = data.metadata.genre;
			return updated;
		} 
		return data;
	}


});