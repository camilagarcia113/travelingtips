'use strict';

app.controller('ViewMapController', function($scope, $http, mapAction, $stateParams, alertService) {

  $scope.drawnMarkers = [];
  $scope.loggedId = sessionStorage.getItem('userID');
  $scope.isOwnerOfProfile = false;
  $scope.isFavouriteView = false;

  $scope.mapView = mapAction.newMap('mapView');

  var drawRatingStars = function(rating) {
    return Array(rating + 1).join('<span class="glyphicon glyphicon-star"></span>');
  }

  var addInfoWindow = function(marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: '<h4>' + drawRatingStars(marker.rating) + '</h4><br>' +
        '<h4>' + marker.comment + '</h4>'
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.mapView, marker);
    });
  }

  var drawMapMarkers = function() {
    var markers = $scope.travel.placesVisited;
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(markers[i].latitude), parseFloat(markers[i].longitude)),
        label: markers[i].sequence.toString(),
        map: $scope.mapView,
        rating: markers[i].rating,
        comment: markers[i].comment
      });
      addInfoWindow(marker);
      bounds.extend(marker.getPosition());
    }
    $scope.mapView.fitBounds(bounds);

  }

  var getTravel = function(travelId, isFavourite) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel/' + travelId
    }).then(function(result) {
      $scope.travel = result.data;
      if($scope.travel.user == $scope.loggedId) {
        $scope.isOwnerOfProfile = true;
      }
      if(isFavourite == "true") {
        $scope.isFavouriteView = true;
      }
      drawMapMarkers();
    });
  }

  $scope.addToFavourites = function(travelId) {
    var loggedUser = sessionStorage.getItem('userID');
    $http({
      method: 'POST',
      url: 'http://localhost:8080/addToFavourites/' + travelId + '/' + loggedUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      $scope.isFavouriteView = true;
      alertService.showSuccessAlert('Agregado!');
    });
  }

  getTravel($stateParams.id, $stateParams.favourite);

});