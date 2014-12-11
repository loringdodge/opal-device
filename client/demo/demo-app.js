angular.module('omnigrahm', ['ngAutocomplete'])
  .controller('AppController', function ($scope, $timeout) {
    $scope.activeClasss = 'not-active';
    $scope.init = function () {
      $timeout(function () {
        $scope.activeClasss = 'active';
      }, 500);
      $timeout(function () {
        window.addCities(window.data);
      }, 1000);
    };
  })
  .controller('FormController', function ($scope) {
    $scope.fieldText = '';
    $scope.currentCity = null;
    $scope.cities = {
      country: 'us',
      types: '(cities)'
    };
    $scope.submitForm = function () {
      if ($scope.currentCity !== null) {
        setTimeout(function () {
          console.log('Adding ', $scope.currentCity.name);
          var name = $scope.currentCity.name;
          var lat = $scope.currentCity.geometry.location.lat();
          var lon = $scope.currentCity.geometry.location.lng();
          addSingleCity(name, lat, lon);
        }, 100);
      }
    };
  });