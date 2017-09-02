var sampleApp = angular.module('travelingTips', []);
sampleApp.controller('MapController', function($scope, $http) {

  var infoWindow;
  var labelNumber = 1;
  var labelIndex = 0;
  var markers = [];
  var mapMarkers = [];

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.397,
      lng: 150.644
    },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $scope.map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, $scope.map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, $scope.map.getCenter());
  }

  
  google.maps.event.addListener($scope.map, 'click', function(event) {
    addMarker(event.latLng);
  });

  document.getElementById('saveMap').addEventListener('click', saveMarkers);

  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      label: labelNumber.toString(),
      map: $scope.map,
      draggable: true,
      sequence: labelNumber
    });
    mapMarkers.push(marker);
    markers.push({
      latitude: location.lat().toString(),
      longitude: location.lng().toString(),
      sequence: labelNumber
    })
    labelNumber = labelNumber + 1;

    google.maps.event.addListener(marker, 'click', function(event) {
      var markerSequence = marker.sequence;
      marker.setMap(null);
      markers = [];
      arrangeMapMarkersSequence(markerSequence);
      labelNumber = 1;
      refreshMarkersInMap(markerSequence);
    });
  }

  function arrangeMapMarkersSequence(sequenceNumber) {
    mapMarkers.splice((sequenceNumber - 1), 1);
    for (var marker in mapMarkers) {
      if (mapMarkers[marker].label > sequenceNumber) {
        mapMarkers[marker].label -= 1;
      }
    };
  }

  function refreshMarkersInMap() {
    var marks = mapMarkers;
    for (var marker in mapMarkers) {
      mapMarkers[marker].setMap(null);
    }
    mapMarkers = [];
    for(var marker in marks) {
      addMarker(marks[marker].position);
    }
  }

  function saveMarkers() {
    console.log(markers.length);
    console.log(markers);
    $http({
      method: "POST",
      url: "travels",
      data: markers,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser does not support geolocation.');
    infoWindow.open($scope.map);
  }

});