angular.module('omnigrahm', ['ngAutocomplete'])
  .controller('AppController', function ($scope) {
    console.log('AppController!');

    $scope.activeClasss = 'not-active';
    angular.element(document).ready(function () {
      $scope.activeClasss = 'active';
      console.log('READY: ', $scope.activeClasss);
      $scope.hello();
    }.bind($scope));

    $scope.hello = function () {
      console.log('$scope.activeClasss');
      console.log($scope.activeClasss);
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
        console.log('submitForm');
        console.log('PId : ', $scope.currentCity.place_id);
        console.log('Nme : ', $scope.currentCity.formatted_address);
        console.log('Lat : ', $scope.currentCity.geometry.location.lat());
        console.log('Lng : ', $scope.currentCity.geometry.location.lng());
      }
    };
  });