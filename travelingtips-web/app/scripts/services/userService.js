app.service('userService', function() {

	this.getID = function() {
		return sessionStorage.getItem('userID');
	}

	this.getPhotoUrl = function() {
		return sessionStorage.getItem('userImgURL');
	}

	this.getName = function() {
		return sessionStorage.getItem('userName');
	}

	this.getEmail = function() {
		return sessionStorage.getItem('userEmail');
	}

	this.isUserLoggedIn = function() {
		return sessionStorage.getItem('userLoggedIn')
	}

});