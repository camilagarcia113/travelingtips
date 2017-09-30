'use strict';

var app = angular.module('travelingtipsWebApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'views/home.html'
  };

  var signInState = {
    name: 'signIn',
    url: '/signIn',
    templateUrl: 'views/signIn.html'
  };

  var createMapState = {
    name: 'createMap',
    url: '/createMap',
    templateUrl: 'views/createmap.html'
  };

  var userProfileState = {
    name: 'userProfile',
    url: '/userProfile',
    templateUrl: 'views/userProfile.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(signInState);
  $stateProvider.state(createMapState);
  $stateProvider.state(userProfileState);

});

/*function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  sessionStorage.setItem('user', JSON.stringify(profile));
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    sessionStorage.removeItem('user');
    console.log('User signed out:' + sessionStorage.getItem('user'));
  });
}*/

