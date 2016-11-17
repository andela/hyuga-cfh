'use strict';
angular.module('mean.system')
.controller('IndexController', [
  '$scope',
  '$http',
  'Global',
  '$location',
  'socket',
  'game',
  'AvatarService',
  'InvitationService',
  '$anchorScroll',
  function ($scope, $http, Global, $location, socket, game,
  AvatarService, InvitationService, $anchorScroll) {
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
    $scope.getGameHistory = function () {
      $scope.History = [];
      $http.get('/api/games/get_history').then(function (response) {
        response.data.forEach(function (history) {
          $scope.History.push(history);
        });
      }, function (err) {
        console.error(err);
      });
    };

  // Delete user history
    $scope.confirmDelete = function () {
      setTimeout(function () {
        $scope.showConfirm = false;
      }, 8000);
      $scope.showConfirm = true;
    };
    $scope.deleteGameHistory = function () {
      $http.get('/api/games/delete_history').success(function (data) {
        $scope.History = [];
      });
    };
    $scope.invitations = [];
    InvitationService.getInvitations()
    .then(function (response) {
      $scope.invitations = response.data.reverse();
      $scope.unreadNotifications = $scope.invitations.length;
    });

    $scope.avatars = [];
    AvatarService.getAvatars()
      .then(function (data) {
        $scope.avatars = data;
      });

    $scope.readNotifications = function () {
      InvitationService.readNotification()
      .then(function (response) {
        if (response.status === 200) {
          $scope.unreadNotifications = 0;
        }
      });
    };
  }]);
