'use strict';

app.controller('EditTravelController', function($scope, $http, Travel, mapAction, userService, $stateParams, $state, alertService) {

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
        map: $scope.map,
        rating: markers[i].rating,
        comment: markers[i].comment
      });
    }
    mapAction.setMapCenter($scope.map, markers[0]);
  }

  $scope.saveTravel = function() {
    $http({
      method: "POST",
      url: "http://localhost:8080/travels",
      data: {
        id: $scope.travel.id,
        user: userService.getID(),
        title: $scope.travel.title,
        summary: $scope.travel.summary,
        markers: $scope.travel.markers,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      alertService.showSuccessAlert('Viaje guardado!');
    });
      $state.go('home');
    }

  getTravel($stateParams.id);

});