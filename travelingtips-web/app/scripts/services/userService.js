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

});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  //sessionStorage.setItem('user', JSON.stringify(profile));
  sessionStorage.setItem('userID', profile.getId()); // Do not send to your backend! Use an ID token instead.
  sessionStorage.setItem('userName', profile.getName());
  sessionStorage.setItem('userImgURL', profile.getImageUrl());
  sessionStorage.setItem('userEmail', profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    sessionStorage.clear();
  });
}