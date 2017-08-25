var sampleApp = angular.module('travelingTips', []);
sampleApp.controller('MapController', function ($scope) {

  var infoWindow;
  var labelNumber = 1;
  var labelIndex = 0;
  var markers= [];

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.397, lng: 150.644},
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
       draggable: true
     });
     markers.push({id: labelNumber, lat: location.lat(), long: location.lng()})
     labelNumber = labelNumber + 1;
     //console.log("lat: " + location.lat() + "/ lng: " + location.lng());
   }

   function saveMarkers() {
     console.log(markers.length);
     console.log(markers);
   }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser does not support geolocation.');
    infoWindow.open($scope.map);
  }

});

