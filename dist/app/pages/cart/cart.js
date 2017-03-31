angular.module("sunckAXF.cartPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "cart",
				url: "/cart",
				templateUrl: "app/pages/cart/cart.html",
				css: "app/pages/cart/cart.css",
				controller: "cartController",
			})
	})
	.controller("cartController", function($scope) {
		//获取localStorage信息添加到购物车
		var locationDataStr = localStorage.getItem("cartData");
		var locationData;
		if(!locationDataStr) {
			locationData = {};
		} else {
			locationData = JSON.parse(locationDataStr)
		}
		$scope.cartData = locationData;
		
		//购物车为空时   变化显示
		var Qnum = 0;
		for(var k in $scope.cartData){
			Qnum += $scope.cartData[k].num;
		}
		if(Qnum > 0){
			$("#null").hide();
			$("#shoppingCart").show();
		}else{
			$("#null").show();
			$("#shoppingCart").hide();
		}
		//总价
		$scope.totalPrices = 0;
		function total(){
			for(var u in $scope.cartData){
				$scope.totalPrices = parseFloat(($scope.totalPrices + $scope.cartData[u].num * $scope.cartData[u].price).toFixed(2));
				Qnum += $scope.cartData[u].num;
			}
		}
		total();
		
		//减
		$scope.reduce = function(event, x) {
			x.num--;
			localStorage.setItem("cartData", JSON.stringify(locationData));
			$scope.totalPrices = 0;
			total();
			
			//购物车为空时   改变显示
			var Qnum = 0;
			for(var k in $scope.cartData){
				Qnum += $scope.cartData[k].num;
			}
			if(Qnum > 0){
				$("#null").hide();
				$("#shoppingCart").show();
			}else{
				$("#null").show();
				$("#shoppingCart").hide();
			}
		}
		//加
		$scope.add = function(event, x) {
			x.num++;
			localStorage.setItem("cartData", JSON.stringify(locationData));
			$scope.totalPrices = 0;
			total();
		}
		
		//选择商品   改变总价
		$scope.checkbox = function(event){
			var Prices = $(event.target).siblings("div").children("div").children(".num").html()
					*$(event.target).siblings("div").children(".commodity_p3").children("span").html();
			
			if($(event.target).is(":checked") == false){
				$(".checkbox2").attr("checked",false);
				$scope.totalPrices = parseFloat(($scope.totalPrices - Prices).toFixed(2));
			}else{
				$scope.totalPrices = parseFloat(($scope.totalPrices + Prices).toFixed(2));
			}
		}
		
		//默认全选
		$scope.all = true;
		
		//全不选  总价为0
		$scope.checkbox2 = function(){
			if($scope.all == false){
				$scope.totalPrices = 0;
			}else{
				$scope.totalPrices = 0;
				for(var u in $scope.cartData){
					$scope.totalPrices += $scope.cartData[u].num * $scope.cartData[u].price;
				}
			}
		}
		

		//详情页面
		$scope.divs2 = function(index, event) {
			$("#popup").show();
			$("body").css("overflow", "hidden");
			$scope.popup_1 = $(event.target).parent().next().children(".commodity_p2").html();
			$scope.popup_2 = event.target.currentSrc;
			$scope.popup_3 = $scope.popup_1;
			$scope.popup_4 = $(event.target).parent().next().children(".commodity_p3").children("span").html();
			$scope.popup_5 = $(event.target).parent().siblings(".commodity_right").children(".commodity_right_p1").children(".num").html();
		}
		//返回
		$scope.returns = function() {
			$("#popup").hide();
			$("body").css("overflow", "visible");
		}
	})