'use strict';

app.controller('HomeController', function($scope, $http, alertService, mapAction) {

  $scope.wordsInTitle = "";
  $scope.titleInput = "";
  $scope.foundTravels = {};
  $scope.mapMarked = false;

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

  $scope.findTravelsFromInput = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/findTravels/' + $scope.wordsInTitle
    }).then(function(result) {
      if(result.data.length > 0) {
        $scope.foundTravels = result.data;
        $scope.titleInput = $scope.wordsInTitle;
        $scope.wordsInTitle = "";
      } else {
        alertService.showWarningAlert('No existe un viaje que tenga en el titulo esas palabras. Proba otro!');
      }
    });
  }

  $scope.findTravelsFromMap = function(location) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/findTravelsMap',
      data: {
        latitude: location.lat().toString(),
        longitude: location.lng().toString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      if(result.data.length > 0) {
        $scope.foundTravels = result.data;
      } else {
        alertService.showWarningAlert('No existe un viaje que pase por ese lugar. Proba otro!');
      }
    }, function errorCallback(response) {
      alertService.showWarningAlert('No se encontro el viaje');
    });
  }

  google.maps.event.addListener($scope.map, 'click', function(event) {
    if(! $scope.mapMarked) {
      var marker = mapAction.drawMarker($scope.map, event.latLng, "");
      $scope.findTravelsFromMap(event.latLng);
      $scope.mapMarked = true;
    }
  });

});
