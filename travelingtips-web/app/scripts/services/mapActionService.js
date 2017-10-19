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

    this.changeGeolocation = function(map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
        }, function() {
          alertService.showDangerAlert('OOOOPS! Hubo un problema con la Geolocalizacion');
          map.setCenter(center);
        });
      } else {
        alertService.showWarningAlert('Tu browser no soporta Geolocalizacion');
      }
    }

    this.drawMarker = function(aMap, location, labelNumber) {
      var marker = new google.maps.Marker({
        position: location,
        label: labelNumber.toString(),
        map: aMap,
        draggable: true,
        sequence: labelNumber
      });
      return marker;
    }

    this.setMapCenter = function(map, marker) {
      var pos = {
        lat: parseFloat(marker.latitude),
        lng: parseFloat(marker.longitude)
      };
      map.setCenter(pos);
    }

    this.autocompleteListener = function(place, map) {
      //var place = autocomplete.getPlace();
      if (!place.geometry) {
        alertService.showDangerAlert('Ingresa un lugar valido');
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(6);
      }
      place = "";

      this.changeGeolocation(map);
    }
});