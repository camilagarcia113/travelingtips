app.service('viewMapService', ['$http', function ($http) {

  var data;

  this.getTravel = function(title, userID) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel?user=' + userID + '&title=' + title
    }).then(function(result) {
      data = result.data;
    });
  }

  this.travel = function() {
    return data;
  }

}]);