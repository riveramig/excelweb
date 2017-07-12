angular.module('myApp',[])
	.controller('mainCtrl',['dataService',function(dataService){
		var self=this;
		self.data=dataService.full();
		console.log(self.data);
	}])
	.factory('dataService',['$http','$q',function($http,$q){
		var data ={};
		data=$http.get('/').then(function(res){
			return res.data;
		});
		return{
			full:function(){
				return data;
			}
		}
	}])