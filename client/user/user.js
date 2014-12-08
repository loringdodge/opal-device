angular.module('omnigrahm.user', [])
.controller('userController', function($scope, $http) {

  $scope.dates, $scope.positiveData, $scope.negativeData;
  var updateData = function(data) {
    var result = getData(data);
    var dateData = result[0];
    var positiveData = result[1];
    var negativeData = result[2];
    var images = result[3];
    $scope.chartData.x = $scope.chartData.x.concat(dateData);
    $scope.chartData.positive = $scope.chartData.positive.concat(positiveData);
    $scope.chartData.negative = $scope.chartData.negative.concat(negativeData);
    showGraph();
    showImages(images);
  };
  $scope.chartData = {
    x: ['x'],
    positive: ['positive'],
    negative: ['negative']
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
    for (var i = 0; i < Things.length; i++) {
      Things[i]
    };
  };

  $scope.getUserFeed = function(username) {
		OAuth.initialize('mjBY4FTkZ4yHocgHANa2ix7-m5w');
		var provider = 'instagram';

    console.log(username);

    var userId = userId || 217257560;

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
              // var objectToSave;
              // for (var i = 0; i < userObjects.data.length; i++) {
                userObjects.data.forEach(function(obj) {
                // objectToSave = userObjects.data[i];
                // objectToSave = obj;
                console.log(obj);
                var caption = getCaptionString(obj);

                //api call 
                var string = caption.replace(' ', '%20');
                $http.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=' + string, {
                  headers: { 'X-Mashape-Key': 'bZKtaWEZMmmshwTi4qO4XJhxvNfCp13uY3yjsnYweDF3s3S2Bw'}
                })
                .success(function(data) {
                  obj['sentiment'] = data;

                  //post to /api/instagram individual objects
                  $http.post('/api/instagram', JSON.stringify(obj))
                  .success(function(data, status, headers, config) {
                    console.log('posted!!!');
                    // console.log(data);
                    // this callback will be called asynchronously
                    // when the response is available
                  })
                  .error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
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
        
        //post to api/instagram -fix so only queries for user
     //    $http.get('/api/instagram') //, {params: { user_id: result.user.id } }
			  // .success(function(data, status, headers, config) {
     //      //gets stuff back from the user
     //      // $scope.data = data;
			  // 	console.log('gets objects back');
			  // 	console.log(data);
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
			  // 	console.log('not found');
			  //   // log error
			  // });
        //end of error

		}).fail(function(err) {
		  //fail of Oauth
		});
  };

  var getData = function(data) {
    var posSum = [0];
    var negSum = [0];
    var dates = [];
    var syncIndex = 0;
    var currDate = null;
    var images = [];
    for (var i = 0; i < data.length; i++) {
      var instagram = data[i];
      var date = new Date(data[i].created_time * 1000);
      var month = date.getMonth() + 1;
      var instagramDate = date.getFullYear() + '-' + month;
      var sentiment = instagram.sentiment.type;
      if (sentiment === 'neutral') continue;
      images.push(getImages(instagram));
      //Initialize current date 
      if (!currDate) {
        currDate = instagramDate;
        dates.push(currDate + '-01');
      }
      if (instagramDate !== currDate) {
        currDate = instagramDate;
        dates.push(currDate + '-01');
        syncIndex++;
        posSum[syncIndex] = 0;
        negSum[syncIndex] = 0;
      }
      if (sentiment === "positive") posSum[syncIndex]++;
      else if (sentiment === "negative") negSum[syncIndex]--;
    };
    return [dates, posSum, negSum, images];
  };

  var getCaptionString = function(instaObj) {
    return instaObj.caption.text;
  };

  var getImages = function(data) {
    var result = [];
    result[0] = data.images.thumbnail.url;
    result[1] = data.images.standard_resolution.url;
    return result;
  }

});


