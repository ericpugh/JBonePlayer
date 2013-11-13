var Podcast = Backbone.Model.extend({

	urlRoot: '',

	defaults: {
		id: '',
		title: '',
		description: '',
		duration: '',
		url: '',
		published: '',
		month: '',
		year: ''
	},

	initialize: function() {
		_.bindAll(this, 'getMonthName');
	},

	getMonthName: function(num){
		//given a month number, return the human readable month name
		//TODO make sure the num param isn't less than one or greater than 12
		numericMonth = parseInt(num) - 1;
		var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return names[numericMonth];
	}
	
});