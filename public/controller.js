angular.module('myApp',[])
.controller('mainCtrl',['$http','cartService','$window',function($http,cartService,$window){
	var self=this;
	self.dd=[];
	self.carrito=cartService.merca();
	self.getData=function(){
		$http.get('/').then(function(res){
			self.dd=res.data;
			console.log(self.dd);
		});
	}
	self.getData();
	self.addCart=function(p){
		var temp=cartService.merca();
		if(temp.length==0){
			cartService.add(p);
		}else{
			var a=true;
			for(var x in temp){
				if(temp[x]==p){
					a=false;
					break;
				}
			}
			if(a){
				cartService.add(p);	
			}else{
				$window.alert("El producto ya se encuentra en el carrito!");
			}
		}
		console.log(cartService.merca());
		console.log(cartService.getTotal());
	}
	self.removeCart=function(p){
		cartService.remove(p);
		console.log(cartService.merca());
	}
	self.getTotal=function(){
		return cartService.getTotal();
	}
}])
.factory('cartService',[function(){
	var cart=[];
	return{
		add:function(data){
			cart.push(data);
		},
		merca:function(){
			return cart;
		},
		remove:function(p){
			var index=cart.indexOf(p);
			cart.splice(index,1);
		},
		getTotal:function(){
			var total=0;
			for(var a in cart){
				var number=Number(cart[a]["Suma de Importe pendiente"].replace(/[^0-9\.]+/g,""));
				total=total+number;
			}
			return total;
		}
	}
}])