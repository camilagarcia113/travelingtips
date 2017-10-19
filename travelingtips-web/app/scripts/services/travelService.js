app.service('Travel', function() {

    this.title = "";
    this.summary = "";
    this.markers = [];
    this.errors = [];

    this.getTitle = function() {
        return this.title;
    }

    this.getSummary = function() {
        return this.summary;
    }

    this.getMarkers = function() {
        return this.markers;
    }

    this.addMarker = function(location, labelNumber) {
      var marker = {
        latitude: location.lat().toString(),
        longitude: location.lng().toString(),
        comment: "",
        rating: 0,
        sequence: labelNumber
      }
      this.markers.push(marker);
    }

    this.addTitle = function(aTitle) {
        this.title = aTitle;
    }

    this.addSummary = function(aSummary) {
        this.summary = aSummary;
    }

    this.addCommentAndRating = function(collection) {
        for (var marker in this.markers) {
          var order = this.markers[marker].sequence;
          this.markers[marker].comment = collection[order -1].comment;
          this.markers[marker].rating = collection[order -1].rating;
        }
    }

    this.validate = function() {
      if(this.title == "" || this.title == undefined) {
        this.errors.push("No podes guardar un viaje con el titulo vacio");
      }
      if(! this.markers.length > 0) {
        this.errors.push("No podes guardar un viaje sin marcar nada en el mapa");
      }
      if(this.markers.some(m => m.comment == "" || m.comment == undefined)) {
        this.errors.push("No podes guardar un viaje sin completar los comentarios");
      }
      if(this.markers.some(m => ! m.rating > 0)) {
        this.errors.push("No podes guardar un viaje sin completar los ratings");
      }
    }

    this.hasErrors = function() {
      return this.errors.length > 0
    }

    this.removeErrors = function() {
      this.errors = [];
    }

    this.getErrors = function() {
      return this.errors;
    }
});