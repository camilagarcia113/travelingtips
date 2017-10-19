'use strict';

app.controller('MapController', function($scope, $http, Travel, userService, alertService, mapAction, $rootScope, $state) {

  var labelNumber = 1;
  $scope.mapMarkers = [];
  $scope.showCommentSection = false;
  $scope.comments = [];
  $scope.isTitleComplete = false;
  $scope.isMapMarked = false;
  $scope.travelTitle = "";
  $scope.travelSummary = "";

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

  function isValidTitle() {
    $scope.isTitleComplete = Travel.getTitle() !== "undefined";
    $scope.$apply();
    return $scope.isTitleComplete;
  }

  document.getElementById("title").addEventListener("input", isValidTitle);

  $scope.map = mapAction.newMap('map');

  var input = (document.getElementById('pac-input'));
  $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', $scope.map);

  autocomplete.addListener('place_changed', function() {
    mapAction.autocompleteListener($scope.map, autocomplete.getPlace());
  });

  mapAction.changeGeolocation($scope.map);

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
    var marker = mapAction.drawMarker($scope.map, location, labelNumber);
    $scope.mapMarkers.push(marker);
    Travel.addMarker(location, labelNumber);
    labelNumber = labelNumber + 1;

    google.maps.event.addListener(marker, 'click', function(event) {
      if(! $scope.showCommentSection) {
        var markerSequence = marker.sequence;
        marker.setMap(null);
        arrangeMapMarkersSequence(markerSequence);
        labelNumber = 1;
        refreshMarkersInMap(markerSequence);
      }
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
      if(! $scope.showCommentSection) {
        Travel.markers.map(function(mark) {
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

  function addMissingContentToTravel() {
    Travel.addCommentAndRating($scope.comments);
    Travel.addTitle($scope.travelTitle);
    Travel.addSummary($scope.travelSummary);
  }

  $scope.openCommentSection = function () {
    $scope.showCommentSection = true;
  };

  $scope.saveTravel = function() {
    addMissingContentToTravel();

    Travel.validate();
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
          user: userService.getID(),
          title: Travel.getTitle(),
          summary: Travel.getSummary(),
          markers: Travel.getMarkers(),
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(result) {
        alertService.showSuccessAlert('Viaje guardado!');
      });
      $state.go('home');
    }
  }

});