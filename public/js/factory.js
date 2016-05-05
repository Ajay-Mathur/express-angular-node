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
	
	.factory("store",["$http",function($http){
		var data;
		return{
			getData : function(callback){
				if(data){
					return callback(data);
				}else{
					$http({
						url : "http://localhost:3002/getTopStories",
						method: "GET"})
					.then(function(d){
						callback(data = d);		
					});
				}
			}
		}
	}])
})()