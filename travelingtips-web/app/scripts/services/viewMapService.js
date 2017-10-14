app.service('viewMapService', ['$http', function ($http) {

  var data;

  this.getTravel = function(travelId) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel/' + travelId
    }).then(function(result) {
      data = result.data;
    });
  }

  this.travel = function() {
    return data;
  }

}]);