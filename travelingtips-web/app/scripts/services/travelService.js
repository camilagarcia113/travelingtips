app.service('Travel', function() {

    this.errors = [];

    this.validate = function(travel) {
      if(travel.title == "" || travel.title == undefined) {
        this.errors.push("No se puede guardar un viaje con el titulo vacio");
      }
      if(! travel.placesVisited.length > 0) {
        this.errors.push("No se puede guardar un viaje sin marcar nada en el mapa");
      }
      if(travel.placesVisited.some(place => place.comment == "" || place.comment == undefined)) {
        this.errors.push("No se puede guardar un viaje sin completar todos los comentarios");
      }
      if(travel.placesVisited.some(place => place.rating == 0)) {
        this.errors.push("No se puede guardar un viaje sin completar todos los ratings");
      }
    }

    this.hasErrors = function() {
      return this.errors.length > 0;
    }

    this.removeErrors = function() {
      this.errors = [];
    }

    this.getErrors = function() {
      return this.errors;
    }
});