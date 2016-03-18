+function(angular){
	angular.module("myApp",["ngRoute","appControllers","factories"])
	.config(['$httpProvider','$routeProvider','$locationProvider',function ($httpProvider,$routeProvider, $locationProvider) {
	  $routeProvider.
	    when('/', {
	      	templateUrl: 'partials/seeStory',
	    	controller: 'seeStory'
	    }).
	    when('/pizza', {
	      template: 'I Love Pizza!'
	    }).
	    when('/seeStory',{
	    	templateUrl: 'partials/home',
	      	controller: 'HomeController'
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
}(angular);