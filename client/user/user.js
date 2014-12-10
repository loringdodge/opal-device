angular.module('omnigrahm.user', [])
.controller('userController', function($scope, $http) {

  $scope.instaImages = [];

  // var arrayOfInstagrams = [];

  var updateData = function(data) {
    var result = getData(data);
    console.log("results after getData()", result);
    var dateData = ['x'].concat(result[0]);
    var positiveData = ['positive'].concat(result[1]);
    var negativeData = ['negative'].concat(result[2]);
    var images = result[3];
    $scope.chartData.x = dateData;
    $scope.chartData.positive = positiveData;
    $scope.chartData.negative = negativeData;
    console.log($scope.chartData.x);
    showGraph();
    showImages(images);
  };

  $scope.chartData = {
    x: [],
    positive: [],
    negative: []
  };

  var showGraph = function() {
    $scope.chart = c3.generate({
      bindto: '#userChart',
      data: {
        x: 'x',
        columns: [
          $scope.chartData.x,
          $scope.chartData.positive,
          $scope.chartData.negative
        ],
        type: 'bar',
        groups: [
          ['positive', 'negative']
        ]
      },
      axis: {
        x: {
          label: {
            text: 'Date'
          },
          type: 'timeseries',
          tick: {
            format: '%Y-%m'
          }
        },
      },
      grid: {
        y: {
          lines: [{value:0}]
        }
      }
    });
  };

  var showImages = function(images) {
    for (var i = 0; i < images.length; i++) {
      $scope.instaImages.push(images[i]);
    };
  };

  $scope.getUserFeed = function(username) {
		OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
		var provider = 'instagram';

    username = username || "floofydoug"

    console.log(username);

    var userId = userId || 217257560;
    var arr = [];

    OAuth.popup(provider)
    .done(function(result) {

    if (username) {

      result.get('https://api.instagram.com/v1/users/search?q='+ username +'&client_id=0818d423f4be4da084f5e4b446457044')
      .then(function(userObj) {
        userId = userObj.data[0].id;
        result.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=40')
          .done(function(userObjects) {
            //go through sentiment api
            // console.log(userObjects.data); //array of objects returned
              /*
                  for each object returned. getSentiment() returns string. getPosNeg() returns sentiment object.
                  push to the userObjects[i]. post to /api/instagram the whole object
              */
                userObjects.data.forEach(function(obj) {

                var caption = getCaptionString(obj);

                //api call 
                if (caption) {
                  var string = caption.replace('#', ' ');
                  // console.log(string);
                } else {
                  string = '';
                }
                $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
                  headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
                })
                .success(function(data) {
                  obj['sentiment'] = data;

                  arr.push(obj);
                    // console.log('theLast', userObjects.data.indexOf(obj));

                  if (userObjects.data.length - 1 === userObjects.data.indexOf(obj)) {
                    console.log('theLast', userObjects.data.indexOf(obj));
                    updateData(arr);
                  }
                  console.log('succc');
                  //post to /api/instagram individual objects
                  $http.post('/api/instagram', JSON.stringify(obj))
                  .success(function(data, status, headers, config) {
                  })
                  .error(function(data, status, headers, config) {
                  })
                })                  
              });

          });
      })
      //can't get userid
      .fail(function(err) {
        console.log(err);
      })
    } //end of if

    // $http.get('/api/instagram'), {params: { user_id: 5485fa5d77397d19a7ac1d99 } }
    //     .success(function(data, status, headers, config) {
    //       //gets stuff back from the user
    //       // $scope.data = data;
    //      console.log('gets objects back');
    //      console.log(data);
    //       updateData(data);
    //     })
        
        //post to api/instagram -fix so only queries for user
     //    $http.get('/api/instagram') //, {params: { user_id: result.user.id } }
        // .success(function(data, status, headers, config) {
     //      //gets stuff back from the user
     //      // $scope.data = data;
        //  console.log('gets objects back');
        //  console.log(data);
     //      updateData(data);
        // })
     //    //error on /api/instagram query
        // .error(function(data, status, headers, config) {
     //      //query instagram for user stuff
     //      result.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=0818d423f4be4da084f5e4b446457044&count=5')
     //      .done(function(userObjects) {
     //        //go through sentiment api
     //        // console.log(userObjects.data); //array of objects returned
     //          /*
     //              for each object returned. getSentiment() returns string. getPosNeg() returns sentiment object.
     //              push to the userObjects[i]. post to /api/instagram the whole object
     //          */
     //          // var objectToSave;
     //          // for (var i = 0; i < userObjects.data.length; i++) {
     //            userObjects.data.forEach(function(obj) {
     //            // objectToSave = userObjects.data[i];
     //            // objectToSave = obj;
     //            console.log(obj);
     //            var caption = getCaptionString(obj);

     //            //api call 
     //            var string = caption.replace(' ', '%20');
     //            $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
     //              headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
     //            })
     //            .success(function(data) {
     //              obj['sentiment'] = data;

     //              //post to /api/instagram individual objects
     //              $http.post('/api/instagram', JSON.stringify(obj))
     //              .success(function(data, status, headers, config) {
     //                console.log('posted!!!');
     //                // console.log(data);
     //                // this callback will be called asynchronously
     //                // when the response is available
     //              })
     //              .error(function(data, status, headers, config) {
     //                  // called asynchronously if an error occurs
     //                  // or server returns response with an error status.
     //              })
     //            })                  
     //          }); //end of for loop
     //      });
        //  console.log('not found');
        //   // log error
        // });
        //end of error

    }).fail(function(err) {
      //fail of Oauth
    });

  };

  var getData = function(data) {
    var arrayDate = [];
    var arrayPosSum = [];
    var arrayNegSum = [];
    var dates = [];
    // var syncIndex = 0;
    // var currDate = null;
    var storage = {};
    var images = [];
    for (var i = 0; i < data.length; i++) {
      var instagram = data[i];
      var date = new Date(instagram.created_time * 1000);
      var instagramDate = date.getFullYear() + '-' + (date.getMonth() + 1);
      var sentiment = instagram.sentiment.type;
      if (sentiment === 'neutral') continue;
      images.push(getImages(instagram));
      //Initialize current date 

      if (Object.keys(storage).length === 0) {
        storage[instagramDate] = [0, 0];
      }

      var scanner = false;
      for (var key in storage) {
        if (key === instagramDate) {
          scanner = true;
        }
      }

      if (!scanner) {
        storage[instagramDate] = [0, 0];
      }

      if (sentiment === "positive") {
        storage[instagramDate][0]++;
      } else if (sentiment === "negative") {
        storage[instagramDate][1]--;
      }

    };
    console.log("STORAGE", storage);
    for (var x in storage) {
      arrayDate.push(x + '-01');
      arrayPosSum.push(storage[x][0]);
      arrayNegSum.push(storage[x][1]);
    }

    return [arrayDate, arrayPosSum, arrayNegSum, images];
  };

  var getCaptionString = function(instaObj) {
    if (instaObj.caption) {
    return instaObj.caption.text;
    }
  };

  var getImages = function(data) {
    var result = [];
    result[0] = data.images.thumbnail.url;
    result[1] = data.images.standard_resolution.url;
    return result;
  };

  $scope.printScope = function(){
    console.log("printing out scope data...");
    for(var key in $scope){
      if($scope.hasOwnProperty(key)){
        console.log(key, $scope[key]);
      }
    }
  }

});


