// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){
  var app = angular.module('reddit', ['ionic', 'angularMoment'])

  app.controller('reddit-controller', function($http, $scope){
    $scope.stories = []; 

    var redditUrl = 'https://www.reddit.com/r/Android/new/.json';                   
    $http.get(redditUrl).success(function(response){
        console.log(response);
        console.log(response.data.children);
    

        angular.forEach(response.data.children, function(item){
          if (item.data.thumbnail.indexOf('http')!=0) {item.data.thumbnail = 'https://rimblogs.files.wordpress.com/2015/10/reddit-icon.png?w=200'};
            $scope.stories.push(item.data);

        });


    });

    $scope.loadMore = function(){
        console.log('Yay');
        var config = {params:{after:''}};
        if ($scope.stories.length > 0) {
             config.params.after = $scope.stories[$scope.stories.length - 1].name
        }

        var redditUrl = 'https://www.reddit.com/r/Android/new/.json';                   
        $http.get(redditUrl, config).success(function(response){
            console.log(response);
            console.log(response.data.children);
        

            angular.forEach(response.data.children, function(item){
              if (item.data.thumbnail.indexOf('http')!=0) {
                  item.data.thumbnail = 
                      'https://rimblogs.files.wordpress.com/2015/10/reddit-icon.png?w=200'
              };
              $scope.stories.push(item.data);

            });/*end angular.forEach*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });//end get request
    }//end loadMore


    $scope.doRefresh = function(){

        var config = {params:{'before':''}};
        if ($scope.stories.length > 0) {
             config.params.before = $scope.stories[0].name;
        }

        var redditUrl = 'https://www.reddit.com/r/Android/new/.json';                   
        $http.get(redditUrl, config).success(function(response){
            console.log(response);
            console.log(response.data.children);
        
            var newStories=[];
            angular.forEach(response.data.children, function(item){
              if (item.data.thumbnail.indexOf('http')!=0) {
                  item.data.thumbnail = 
                      'https://rimblogs.files.wordpress.com/2015/10/reddit-icon.png?w=200'
              };
              newStories.push(item.data);
            });/*end angular.forEach*/

              
              $scope.stories = newStories.concat($scope.stories);
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
        });//end get request


    }
  });//end reddit-controller


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());