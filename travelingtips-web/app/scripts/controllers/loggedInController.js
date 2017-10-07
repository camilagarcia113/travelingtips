app.controller('LoggedInController', function($scope, $state) {

  $scope.isLoggedIn = false;

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    sessionStorage.setItem('userID', profile.getId());
    sessionStorage.setItem('userName', profile.getName());
    sessionStorage.setItem('userImgURL', profile.getImageUrl());
    sessionStorage.setItem('userEmail', profile.getEmail());
    $scope.isLoggedIn = true;

    $state.go('home');
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      sessionStorage.clear();
    });
    $scope.isLoggedIn = false;
  }

  window.onSignIn = onSignIn;
  window.signOut = signOut;
});


