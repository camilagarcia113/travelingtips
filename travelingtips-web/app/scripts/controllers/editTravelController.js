'use strict';

app.controller('EditTravelController', function($scope, $http, mapAction, userService, $stateParams) {

  var labelNumber = 1;
  $scope.mapMarkers = [];
  $scope.user = userService.getName();

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

  var getTravel = function(travelId) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel/' + travelId
    }).then(function(result) {
      $scope.travel = result.data;
      drawMapMarkers();
    });
  }

  $scope.map = mapAction.newMap('map');

  var drawMapMarkers = function() {
    var markers = $scope.travel.placesVisited;
    for (var i = 0; i < markers.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(markers[i].latitude), parseFloat(markers[i].longitude)),
        label: markers[i].sequence.toString(),
        map: $scope.mapView,
        rating: markers[i].rating,
        comment: markers[i].comment
      });
    }
    mapAction.setMapCenter($scope.map, markers[0]);
  }

  getTravel($stateParams.id);

});