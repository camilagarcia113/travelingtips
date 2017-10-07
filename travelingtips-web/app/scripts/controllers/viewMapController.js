'use strict';

app.controller('ViewMapController', function($scope, viewMapService, mapAction, userService) {

  $scope.travel = {};
  $scope.user = userService.getName();
  $scope.drawnMarkers = [];

  $scope.init = function() {
    $scope.travel = viewMapService.travel();
    drawMapMarkers();
  }

  $scope.mapView = mapAction.newMap('mapView');

  var addInfoWindow = function(marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: 'Rating: ' + marker.rating + '<br>' +
        'Comment: ' + marker.comment
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


});