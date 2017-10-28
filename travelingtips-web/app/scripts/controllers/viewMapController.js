'use strict';

app.controller('ViewMapController', function($scope, $http, mapAction, userService, $stateParams) {

  $scope.user = userService.getName();
  $scope.drawnMarkers = [];
  
  $scope.mapView = mapAction.newMap('mapView');

  var addInfoWindow = function(marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: '<h5> <b>Rating:</b> ' + marker.rating + ' <span class="glyphicon glyphicon-star"></span></h5> <br>' +
        '<h5> <b>Comment:</b> ' + marker.comment + '</h5>'
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.mapView, marker);
    });
  }

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
      addInfoWindow(marker);
    }
    mapAction.setMapCenter($scope.mapView, markers[0]);

  }

  var getTravel = function(travelId) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel/' + travelId
    }).then(function(result) {
      $scope.travel = result.data;
      drawMapMarkers();
    });
  }

  getTravel($stateParams.id);

});