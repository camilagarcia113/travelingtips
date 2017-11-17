'use strict';

app.controller('HomeController', function($scope, $http, alertService, mapAction) {

  $scope.input = {};
  $scope.titleInput = "";
  $scope.friendsInput = "";
  $scope.foundTravels = {};
  $scope.foundFriends = {};
  $scope.mapMarked = false;
  $scope.markers = [];
  $scope.user = sessionStorage.getItem('userID');

  $scope.oneAccordionAtATime = true;
  $scope.status = {
    isFirstOpen: false,
  };

  //Creates clearmap button on map
  function CenterControl(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '8px';
    controlUI.style.marginRight = '12px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Limpia el mapa para buscar otro punto';
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('div');
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '32px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function() {
      $scope.clearMap()
    });
  }

  $scope.map = mapAction.newMap('map');

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, $scope.map);

  centerControlDiv.index = 1;
  $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

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
    if($scope.input.title !== undefined && $scope.input.title !== "") {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/findTravels/' + $scope.user + '/' + $scope.input.title
      }).then(function(result) {
        if(result.data.length > 0) {
          $scope.foundTravels = result.data;
          $scope.titleInput = $scope.input.title;
          $scope.input.title = "";
        } else {
          alertService.showWarningAlert('No existe un viaje que tenga en el titulo esas palabras. Proba otro!');
        }
      });
    } else {
      alertService.showDangerAlert('Proba escribir un lugar para poder buscarlo');
    }
  }

  var decodePhotoUrlsFrom = function(listOfFriends) {
    listOfFriends.map(function(f) {
      f.photoUrl = decodeURIComponent(f.photoUrl);
    });
    return listOfFriends;
  }

  $scope.findFriendFromInput = function() {
    if($scope.input.friend !== undefined && $scope.input.friend !== "") {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/findFriends/' + $scope.input.friend + '/' + $scope.user
      }).then(function(result) {
        if(result.data.length > 0) {
          $scope.foundFriends = decodePhotoUrlsFrom(result.data);
          $scope.friendsInput = $scope.input.friend;
          $scope.input.friend = "";
        } else {
          alertService.showWarningAlert('No se encontro un viajero con ese nombre. Proba otro!');
        }
      });
    } else {
      alertService.showDangerAlert('Proba escribir un nombre para poder buscarlo');
    }
  }

  $scope.findTravelsFromMap = function(location) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/findTravelsMap/' + $scope.user,
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
      $scope.markers.push(marker);
      $scope.mapMarked = true;
    }
  });

  $scope.clearMap = function() {
    $scope.foundTravels = {};
    $scope.markers[0].setMap(null);
    $scope.markers = [];
    $scope.mapMarked = false;
    input.value = "";
  }

});
