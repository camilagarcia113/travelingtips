app.service('mapAction', function(alertService) {

    this.newMap = function(mapId) {
      return new google.maps.Map(document.getElementById(mapId), {
        center: {
          lat: -29.1307436,
          lng: -66.5295777
        },
        zoom: 6
      });
    }

    this.drawMarker = function(aMap, location, labelNumber, aRating, aComment) {
      var marker = new google.maps.Marker({
        position: location,
        label: labelNumber.toString(),
        map: aMap,
        draggable: true,
        sequence: labelNumber,
        rating: aRating,
        comment: aComment
      });
      return marker;
    }

    this.arrangeMapMarkersSequence = function(sequenceNumber, mapMarkers) {
      mapMarkers.splice((sequenceNumber - 1), 1);
      for (var marker in mapMarkers) {
        if (mapMarkers[marker].label > sequenceNumber) {
          mapMarkers[marker].label -= 1;
        }
        if (mapMarkers[marker].sequence > sequenceNumber) {
          mapMarkers[marker].sequence -= 1;
        }
      }
    }

    this.removeAllMarkersFromMap = function(mapMarkers) {
      mapMarkers.map(function(marker) {
        marker.setMap(null);
      });
    }

});