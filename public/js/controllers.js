(function(){
	angular.module("appControllers",["factories"])
	.controller("baseController",["$http","$scope",function($http,$scope){
		var app = $scope;
		/*$http.get("http://localhost:3000/people").then(function(data){
			app.people = angular.fromJson(data.data);
		});*/
	}])
	.controller("HomeController",["$http","$scope",function($http,$scope){
		
		$scope.formData = {};
		$scope.username = "Mathur";
		$scope.formSubmit = function(){
			$http({
				url : "http://localhost:3002/saveStory",
				method: "GET",
				params:$scope.formData})
				.success(accessHeading)
		}
		accessHeading = function(data){
			$scope.username = data.error;
		}
		
	}])
	.controller('seeStory',["$scope","$http",'storyPicked','$location',function($scope,$http,storyPicked,$location){
		$http({
				url : "http://localhost:3002/seeStory",
				method: "GET"})
				.then(function(data){
				$scope.stories = angular.fromJson(data.data);
				//console.log($scope.title.name);
			});	

		$scope.pullStory = function(id){
			console.log(id)
			storyPicked.id = id
			$location.path('/seeSelectedStory')
		}
	}])
	.controller('detailedStory',["$scope","$http","storyPicked",function($scope,$http,storyPicked){
		
		console.log(storyPicked.id);
		$http({
			url : "http://localhost:3002/pullStory",
			method: "GET",
			params:{"id" : storyPicked.id}})
			.then(function(data){
			//$scope.stories = angular.fromJson(data.data);
			//console.log($scope.title.name);
			console.log(data);
			$scope.story = data.data[0]
		});
			
	}])
})()