'use strict';
angular.module('mean.system')
.controller('IndexController', ['$scope', '$http', 'Global', '$location', 'socket', 'game', 'AvatarService', '$anchorScroll', 'GameHistory', function ($scope, $http, Global, $location, socket, game, AvatarService, $anchorScroll, GameHistory) {
  $scope.global = Global;

  $scope.playAsGuest = function () {
    game.joinGame();
    $location.path('/app');
  };

  $scope.showError = function () {
    if ($location.search().error) {
      return $location.search().error;
    } else {
      return false;
    }
  };

  $scope.goTo = function (targetId) {
    $location.hash(targetId);
    $anchorScroll();
  };

  $scope.avatars = [];
  AvatarService.getAvatars()
      .then(function (data) {
        $scope.avatars = data;
      });

// Create empty history array to hold history objects
  $scope.History = [];
  $scope.getGameHistory = function () {
    $http.get('/api/games/get_history').then(function (response) {
      response.data.forEach(function (history) {
        $scope.History.push(history);
      });
    }, function (err) {
      console.error(err);
    });
  };

  // Delete user history
  $scope.deleteGameHistory = function () {
    $http.post('/api/games/delete_history').success(function (data) {
      console.log(data);
      $scope.$apply();
    });
  };
}]);
