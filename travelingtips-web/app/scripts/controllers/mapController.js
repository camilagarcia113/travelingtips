'use strict';

app.controller('MapController', function($scope, $http) {

  var infoWindow;
  var labelNumber = 1;
  var labelIndex = 0;
  var markrs = [];
  $scope.alerts = [];
  $scope.mapMarkers = [];
  $scope.travelTitle = "";
  $scope.showCommentSection = false;
  $scope.comments = [];
  $scope.ratings = [];
  $scope.isTitleComplete = false;
  $scope.isMapMarked = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.addAlert = function (type, msg) {
    $scope.alerts.push({
      "type": type,
      "msg": msg
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }

  document.getElementById("title").addEventListener("input", isValidTitle);

  function isValidTitle() {
    $scope.isTitleComplete = $scope.travelTitle != "undefined";
    $scope.$apply();
    return $scope.isTitleComplete;
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -29.1307436,
      lng: -66.5295777
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
      $scope.addAlert('danger', 'OOOOPS! Hubo un problema con la Geolocalizacion');
      $scope.map.setCenter(center);
    });
  } else {
    $scope.addAlert('warning', 'Tu browser no soporta Geolocalizacion');
  }

  google.maps.event.addListener($scope.map, 'click', function(event) {
      if(! $scope.showCommentSection) {
        addMarker(event.latLng);
        if($scope.mapMarkers.length > 0) {
          $scope.isMapMarked = true;
          $scope.$apply();
        }
      }
  });


  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      label: labelNumber.toString(),
      map: $scope.map,
      draggable: true,
      sequence: labelNumber
    });
    $scope.mapMarkers.push(marker);
    markrs.push({
      latitude: location.lat().toString(),
      longitude: location.lng().toString(),
      sequence: labelNumber,
      comment: "",
      rating: 0
    })
    labelNumber = labelNumber + 1;

    google.maps.event.addListener(marker, 'click', function(event) {
      if(! $scope.showCommentSection) {
        var markerSequence = marker.sequence;
        marker.setMap(null);
        markrs = [];
        arrangeMapMarkersSequence(markerSequence);
        labelNumber = 1;
        refreshMarkersInMap(markerSequence);
      }
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
      if(! $scope.showCommentSection) {
        markrs.map(function(mark) {
          if(mark.sequence === marker.sequence) {
            mark.latitude = marker.position.lat().toString();
            mark.longitude = marker.position.lng().toString();
          }
        });
      } else {
        marker.draggable = false;
      }
    });

  }

  function arrangeMapMarkersSequence(sequenceNumber) {
    $scope.mapMarkers.splice((sequenceNumber - 1), 1);
    for (var marker in $scope.mapMarkers) {
      if ($scope.mapMarkers[marker].label > sequenceNumber) {
        $scope.mapMarkers[marker].label -= 1;
      }
    };
  }

  function refreshMarkersInMap() {
    var marks = $scope.mapMarkers;
    removeAllMarkersFromMap();
    $scope.mapMarkers = [];
    for(var marker in marks) {
      addMarker(marks[marker].position);
    }
  }

  function removeAllMarkersFromMap() {
    for (var marker in $scope.mapMarkers) {
      $scope.mapMarkers[marker].setMap(null);
    }
  }

  $scope.openCommentSection = function () {
    $scope.showCommentSection = true;
  }

  function addCommentsToMarkers() {
    for (var marker in markrs) {
      var order = markrs[marker].sequence;
      markrs[marker].comment = $scope.comments[order -1];
    }
  }

  function addRatingsToMarkers() {
    for (var marker in markrs) {
      var order = markrs[marker].sequence;
      markrs[marker].rating = $scope.ratings[order -1];
    }
  }

  $scope.clearPage = function () {
    removeAllMarkersFromMap();
    $scope.travelTitle = "";
    $scope.showCommentSection = false;
    $scope.comments = [];
    $scope.ratings = [];
  }

  $scope.saveTravel = function() {
    addCommentsToMarkers();
    addRatingsToMarkers();
    if(($scope.travelTitle != "" && $scope.isTitleComplete) && $scope.mapMarkers.length > 0) {
      $http({
        method: "POST",
        url: "/travels",
        data: {user: "pepe", title: $scope.travelTitle, markers: markrs},
        headers: {
          'Content-Type': 'application/json'
        }
      })
      $scope.addAlert('success', 'Viaje guardado!');
      $scope.clearPage();
      location.reload();
    } else {
      $scope.addAlert('danger', 'Tu viaje no se guardo, por favor completa todos los campos');
    }
  }

});
