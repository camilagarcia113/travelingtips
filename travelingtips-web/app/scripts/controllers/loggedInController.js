app.controller('LoggedInController', function($scope, $state, $http, alertService) {

  $scope.isLoggedIn = false;
  $scope.userIDLoggedIn = "";

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    sessionStorage.setItem('userID', profile.getId());

    $http({
      method: "POST",
      url: "http://localhost:8080/user",
      data: {
        token: profile.getId(),
        name: profile.getName(),
        photoUrl: encodeURIComponent(profile.getImageUrl()),
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
    location.reload();
  }

  window.onSignIn = onSignIn;
  window.signOut = signOut;
});


