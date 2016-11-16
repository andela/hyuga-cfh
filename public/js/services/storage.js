/* globals angular */

angular.module('mean.system')
  .factory('storage', ['$http', '$window', function ($http, $window) {
    'use strict';

    var storage = {};

    storage.setUser = function () {
      $http.get('/api/auth/current_user').then(function (data) {
        $window.localStorage.user = JSON.stringify(data);
      });
    };

    storage.getUser = function () {
      if ($window.localStorage.user !== 'undefined') {
        return (JSON.parse($window.localStorage.user || false));
      }
      return false;
    };

    return storage;
  }]);
