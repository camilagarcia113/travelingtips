app.service('userService', function($http) {

	this.getID = function() {
		return sessionStorage.getItem('userID');
	}

	this.getUser = function(userId) {
	  $http({
        method: 'GET',
        url: 'http://localhost:8080/user/' + userId
      }).then(function(result) {
        return result.data;
      });
	}
});