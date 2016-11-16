'use strict';
angular.module('mean.system')
.controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'InvitationService', '$anchorScroll', function ($scope, Global, $location, socket, game, AvatarService, InvitationService, $anchorScroll) {
    $scope.global = Global;

    $scope.playAsGuest = function() {
      game.joinGame();
      $location.path('/app');
    };

    $scope.showError = function() {
      if ($location.search().error) {
        return $location.search().error;
      } else {
        return false;
      }
    };

    $scope.goTo = function(targetId) {
      $location.hash(targetId);
      $anchorScroll();
    };

    $scope.invitations = [];
    InvitationService.getInvitations()
    .then(function (response) {
      $scope.invitations = response.data.reverse();
      $scope.unreadNotifications = $scope.invitations.length;
    });

    $scope.avatars = [];
    AvatarService.getAvatars()
      .then(function(data) {
        $scope.avatars = data;
      });
    
    $scope.readNotifications = function () {
      InvitationService.readNotification()
      .then(function (response) {
        $scope.unreadNotifications = 0;
      });
    };
}]);
