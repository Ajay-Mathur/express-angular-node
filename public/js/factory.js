(function(){
	angular.module("factories",[])
	.factory('myInterceptor', ['$q', function($q) {  
	    var responseInterceptor = {
	        response: function(response) {
	        	if(response && response.data)
	            response = response.data;
	            return response;
	        }
	    };

	    return responseInterceptor;
	}])
	
	.factory("storyPicked",function(){
		return{
			id: ""
		}
	})
})()