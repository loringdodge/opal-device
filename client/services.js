angular.module('omnigrahm.services', [])
.factory('Instagram', function($http) {
  var getAllInstagram = function() {
    return $http({
      method: 'GET',
      url: '/api/instagram'
    }).then(function(resp) {
      return resp.data;
    });
  };
  return {
    getAllInstagram: getAllInstagram
  };
});
