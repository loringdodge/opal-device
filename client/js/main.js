angular.module('omnigrahm', ['ngAutocomplete'])
  .controller('AppController', function ($scope, $timeout, $http) {
    $scope.activeClasss = 'not-active';
    $scope.init = function () {
      $timeout(function () {
        $scope.activeClasss = 'active';
      }, 500);
      return $http.get('/api/instagram')                              // HERE!
        .then(function (res) {
          $timeout(function () {
            window.setHappiness(res.data);
          }, 200);
        });
    };
  })
  .controller('FormController', function ($scope, $http) {
    $scope.fieldText = '';
    $scope.currentCity = null;
    $scope.cities = {
      country: 'us',
      types: '(cities)'
    };

    $scope.$watch(function () {
      return $scope.currentCity;
    }, function () {
      if ($scope.currentCity !== null) {
        var city = $scope.currentCity;
        if (city.place_id === undefined) return false;
        $http.get('/api/instagram/' + city.place_id)                  // AND HERE!
          .then(function (res) {
            console.log('Res!');
            var name = res.name;
            var lat = res.lat;
            var lon = res.lng;
            var positive = res.percent_positive;
            var negative = res.percent_negative;
            addSingleCity(res);
          })
          .catch(function (err) {
            console.log('!!!');
          });
      }
    });

    $scope.submitForm = function () {
      if ($scope.currentCity !== null) {
        setTimeout(function () {
          // console.log('Adding ', $scope.currentCity.name);
        }, 100);
      }
    };
  });