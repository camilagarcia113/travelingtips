app.service('Travel', function() {

    this.title = "";
    this.summary = "";
    this.markers = [];

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

    this.isValid = function() {
        return this.title !== "" && this.markers.length > 0;
    }
});