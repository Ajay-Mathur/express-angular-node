+function(angular){
	angular.module("myApp",["ngRoute","appControllers","factories"])
	.config(['$httpProvider','$routeProvider','$locationProvider',function ($httpProvider,$routeProvider, $locationProvider) {
	  $routeProvider.
	    when('/', {
	      	templateUrl: 'partials/landingPage',
	    	controller: 'landingPage'
	    }).
	    when('/loadArticle',{
	    	templateUrl: 'partials/seeArticle',
	    	controller: 'seeArticleController'
	    }).
	    when('/dashboard', {
	      	templateUrl: 'partials/seeStory',
	    	controller: 'seeStory'
	    }).
	    when('/pizza', {
	      template: 'I Love Pizza!'
	    }).
	    when('/createStory',{
	    	templateUrl: 'partials/create',
	      	controller: 'createController'
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