app.service('travelService', function() {

	this.addTravel = function(aTravel) {
		travel = aTravel;
		localStorage.setItem('travel', travel);
	}

	this.getMarkers = function() {
		travel = localStorage.getItem('travel');
		console.log('PLACES  ' + travel.placesVisited);
	}

});