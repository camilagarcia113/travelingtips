'use strict';

app.controller('MapController', function($scope, $http, travelService, userService, alertService, $rootScope, $state) {

  var labelNumber = 1;
  var markrs = [];
  $scope.mapMarkers = [];
  $scope.travelTitle = "";
  $scope.travelSummary = "";
  $scope.showCommentSection = false;
  $scope.comments = [];
  $scope.ratings = [];
  $scope.isTitleComplete = false;
  $scope.isMapMarked = false;
  $scope.isLogin = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  function isValidTitle() {
    $scope.isTitleComplete = $scope.travelTitle !== "undefined";
    $scope.$apply();
    return $scope.isTitleComplete;
  }

  document.getElementById("title").addEventListener("input", isValidTitle);

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -29.1307436,
      lng: -66.5295777
    },
    zoom: 6
  });

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
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $scope.map.setCenter(pos);
    }, function() {
      alertService.showDangerAlert('OOOOPS! Hubo un problema con la Geolocalizacion');
      $scope.map.setCenter(center);
    });
  } else {
    alertService.showWarningAlert('Tu browser no soporta Geolocalizacion');
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
    });
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
    }
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
  };

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
    $scope.travelSummary = "";
    $scope.showCommentSection = false;
    $scope.comments = [];
    $scope.ratings = [];
  };

  $scope.saveTravel = function() {
    addCommentsToMarkers();
    addRatingsToMarkers();
    if(($scope.travelTitle !== "" && $scope.isTitleComplete) && $scope.mapMarkers.length > 0) {
      $http({
        method: "POST",
        url: "http://localhost:8080/travels",
        data: {
          user: userService.getID(),
          title: $scope.travelTitle,
          summary: $scope.travelSummary,
          markers: markrs
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(result) {
        alertService.showSuccessAlert('Viaje guardado!');
      });
      $scope.clearPage();
      $state.go('home');
    } else {
      alertService.showDangerAlert('Tu viaje no se guardo, por favor completa todos los campos');
    }
  };

  ////////////////////////////////////////////////////////////////////
  /*if($rootScope.editMapMode) {
    console.log($rootScope.travel);
    $scope.travelTitle = $rootScope.travel.title;
    var markers = $rootScope.travel.placesVisited;
    console.log($scope.travelTitle);
    var pos = {
        lat: parseInt(markers[0].latitude),
        lng: parseInt(markers[0].longitude)
    };
    addMarker(pos);
    $scope.$apply();
    //$rootScope.editMapMode = false;
  };*/

});
