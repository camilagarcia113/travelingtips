app.service('viewMapService', ['$http', function ($http) {

  this.getTravel = function(travelId) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel/' + travelId
    }).then(function(result) {
      return result.data;
    });
  }

}]);