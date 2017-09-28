'use strict';

var app = angular.module('travelingtipsWebApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/',
    template: '<h3>You are at home</h3>'
  }
  
  var createMapState = {
    name: 'createMap',
    url: '/createMap',
    templateUrl: 'views/createmap.html'
  }

  $stateProvider.state(createMapState);
  $stateProvider.state(homeState);
});