'use strict';

app.controller('EditTravelController', function($scope, $http, Travel, mapAction, userService, $stateParams, $state, alertService) {

  var labelNumber = 1;
  $scope.mapMarkers = [];

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
      labelNumber = $scope.travel.placesVisited.length + 1;
    });
  }

  $scope.map = mapAction.newMap('map');

  var input = (document.getElementById('pac-input'));
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', $scope.map);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        alertService.showDangerAlert('Ingresa un lugar valido');
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        $scope.map.fitBounds(place.geometry.viewport);
      } else {
        $scope.map.setCenter(place.geometry.location);
        $scope.map.setZoom(6);
      }
      place = "";
    });


  google.maps.event.addListener($scope.map, 'click', function(event) {
    addMarker(event.latLng);
  });

  function addMarker(location) {
    var mapMarker = mapAction.drawMarker($scope.map, location, labelNumber);
    $scope.mapMarkers.push(mapMarker);
    var marker = {
      latitude: location.lat().toString(),
      longitude: location.lng().toString(),
      comment: "",
      rating: 0,
      sequence: labelNumber
    }
    $scope.travel.placesVisited.push(marker);
    $scope.$apply();
    labelNumber = labelNumber + 1;
  }

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
        markers: $scope.travel.placesVisited,
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