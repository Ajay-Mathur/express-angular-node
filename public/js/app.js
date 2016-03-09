(function(angular){
	angular.module("myApp",["ngRoute","appControllers","factories"])
	.config(['$httpProvider','$routeProvider','$locationProvider',function ($httpProvider,$routeProvider, $locationProvider) {
	  $routeProvider.
	    when('/', {
	      templateUrl: 'partials/home',
	      controller: 'HomeController'
	    }).
	    when('/pizza', {
	      template: 'I Love Pizza!'
	    }).
	    when('/seeStory',{
	    	templateUrl: 'partials/seeStory',
	    	controller: 'seeStory'
	    }).
	    when('/seeSelectedStory',{
	    	templateUrl:'partials/detailedStory',
	    	controller:'detailedStory'
	    }).
	    otherwise({
	      redirectTo: '/'
	    });
	 
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
	 // $httpProvider.interceptors.push('myInterceptor');
	}])
})(angular);