app.controller('LoggedInController', function($scope, $state, $http, alertService) {

  $scope.isLoggedIn = false;
  $scope.userIDLoggedIn = "";

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    sessionStorage.setItem('userID', profile.getId());
//    sessionStorage.setItem('userName', profile.getName());
//    sessionStorage.setItem('userImgURL', profile.getImageUrl());
//    sessionStorage.setItem('userEmail', profile.getEmail());

    $http({
      method: "POST",
      url: "http://localhost:8080/user",
      data: {
        id: profile.getId(),
        name: profile.getName(),
        photoUrl: encodeURIComponent(profile.getImageUrl()),
        email: encodeURIComponent(profile.getEmail())
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      $scope.isLoggedIn = true;
    });

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


