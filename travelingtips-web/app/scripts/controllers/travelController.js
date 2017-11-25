'use strict';

app.controller('TravelController', function($scope, $http, Travel, mapAction, $stateParams, $state, alertService) {

  var labelNumber = 1;
  $scope.drawnMarkers = [];
  $scope.user = sessionStorage.getItem('userID');
  $scope.isMapMarked = false;
  $scope.isEditMode = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

  var getTravel = function(travelId, isNew) {
    if(isNew === "false") {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/travel/' + travelId
      }).then(function(result) {
        $scope.travel = result.data;
        drawMapMarkers($scope.travel.placesVisited);
        $scope.isMapMarked = true;
        $scope.isEditMode = true;
        labelNumber = $scope.travel.placesVisited.length + 1;
      });
    } else {
      $scope.travel = {};
      $scope.travel.placesVisited = [];
      $scope.travel.id = null;
    }
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

  function addDragendListener(mapMarker) {
    google.maps.event.addListener(mapMarker, 'dragend', function(event) {
      $scope.travel.placesVisited.map(function(mark) {
        if(mark.sequence === mapMarker.sequence) {
          mark.latitude = mapMarker.position.lat().toString();
          mark.longitude = mapMarker.position.lng().toString();
        }
      });
    });
  }

  function addMarker(location) {
    var mapMarker = mapAction.drawMarker($scope.map, location, labelNumber, 0, "");
    $scope.drawnMarkers.push(mapMarker);

    var marker = {
      latitude: location.lat().toString(),
      longitude: location.lng().toString(),
      comment: "",
      rating: 0,
      sequence: labelNumber
    }
    $scope.travel.placesVisited.push(marker);

    addDragendListener(mapMarker);

    labelNumber = labelNumber + 1;
    $scope.isMapMarked = true;
    $scope.$apply();
  }

  var drawMapMarkers = function(markers) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      var marker = mapAction.drawMarker(
        $scope.map,
        new google.maps.LatLng(parseFloat(markers[i].latitude), parseFloat(markers[i].longitude)),
        markers[i].sequence,
        markers[i].rating,
        markers[i].comment
      );
      $scope.drawnMarkers.push(marker);
      addDragendListener(marker);
      bounds.extend(marker.getPosition());
    }
    $scope.map.fitBounds(bounds);
  }

  function refreshMarkersInMap() {
    mapAction.removeAllMarkersFromMap($scope.drawnMarkers);
    $scope.drawnMarkers = [];
    drawMapMarkers($scope.travel.placesVisited);
  }

  $scope.deleteMarker = function(marker) {
    var markerSequence = marker.sequence;
    for (var i = 0; i < $scope.drawnMarkers.length; i++) {
      if(i+1 === markerSequence) {
        $scope.drawnMarkers[i].setMap(null);
      }
    }
    mapAction.arrangeMapMarkersSequence(markerSequence, $scope.travel.placesVisited);
    labelNumber = $scope.travel.placesVisited.length + 1;
    refreshMarkersInMap();
  }

  $scope.deleteAllMarkers = function() {
    mapAction.removeAllMarkersFromMap($scope.drawnMarkers);
    $scope.drawnMarkers = [];
    $scope.travel.placesVisited = [];
    labelNumber = 1;
    $scope.isMapMarked = false;
  }

  $scope.saveTravel = function() {
    Travel.validate($scope.travel);
    if(Travel.hasErrors()) {
      var errors = Travel.getErrors();
      for(var e in errors) {
        alertService.showDangerAlert(errors[e]);
      }
      Travel.removeErrors();
    } else {
      $http({
        method: "POST",
        url: "http://localhost:8080/travels",
        data: {
          id: $scope.travel.id,
          user: $scope.user,
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
      $state.go('userProfile', {token: $scope.user, friend: false});
    }
  }

  getTravel($stateParams.id, $stateParams.isNew);

});