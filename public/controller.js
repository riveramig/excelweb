angular.module('myApp',[])
.controller('mainCtrl',['$http','cartService','$window',function($http,cartService,$window){
	var self=this;
	self.dd=[];
	self.carrito=cartService.merca();
	self.filteredData;
	self.filterCart;
	self.getData=function(){
		$http.get('/').then(function(res){
			self.dd=res.data;
			for(var x in self.dd){
				self.dd[x].isInCart=false;
			}
			console.log(self.dd);
		});
	}
	self.getState=function(p){
		return p.isInCart;
	}
	self.getData();
	self.addCart=function(p){
		var temp=cartService.merca();
		if(temp.length==0){
			cartService.add(p);
			p.isInCart=true;
		}else{
			if(temp.indexOf(p) === -1){
				p.isInCart=true;
				cartService.add(p)
			}else{
				$window.alert('El articulo ya se encuentra en el carrito!');
			}
		}
		console.log(cartService.merca());
	}
	self.removeCart=function(p){
		p.isInCart=false;
		cartService.remove(p);
		console.log(cartService.merca());
	}
	self.sendData=function(){
		var req={
			cart:self.carrito,
			date: new Date().toLocaleTimeString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
		}
		$http.post('/sendData',req).then(function(data,status){
			console.log(data);
			console.log('data sent:'+data);
		});
		$window.alert('La información se ha cargado correctamente');
	}
	self.addSection=function(){
		console.log(self.filteredData);
		var temp = cartService.merca();
		if(temp.length==0){
			for(var x in self.filteredData){
				cartService.add(self.filteredData[x]);
			}
		}else{
			for(var x in self.filteredData){
				if(temp.indexOf(self.filteredData[x]) === -1){
					cartService.add(self.filteredData[x]);
				}
			}
		}
	}
	self.getPrice=function(){
		var total=0;
		for(var a in self.filterCart){
				var number=Number(self.filterCart[a]["Suma de Importe pendiente"].replace(/[^0-9\.]+/g,""));
				total=total+number;
			}
			return total;
	}
	self.getNumberItems=function(){
		return self.filterCart.length;
	}
	self.cleanCart=function(){
		cartService.clean();
		self.carrito=cartService.merca();
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
		clean:function(){
			cart = [];
		}
	}
}])