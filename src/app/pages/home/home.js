angular.module("sunckAXF.homePage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "home",
				url: "/home",
				templateUrl: "app/pages/home/home.html",
				css: "app/pages/home/home.css",
				controller: "homeController"
			})
	})
	.controller("homeController", function($scope, $http, $timeout) {
		$http.get("../json/a.json")
			.then(function(result) {
				//轮播的数据
				$scope.slide = result.data.data["act_info"][0]["act_rows"];;
				$timeout(function(){
					swiper();
				}, 100);
				
				
				//导航数据
				$scope.nav = result.data.data["act_info"][1]["act_rows"];
				$scope.nav2 = result.data.data["act_info"][3]["act_rows"];
				//便利店
				$scope.cvs = result.data.data["act_info"][4]["act_rows"][0]["act_rows"][0]["chead_detail"].img;
				$scope.cvs2 = result.data.data["act_info"][4]["act_rows"][1]["act_rows"];
				$scope.cvs3 = result.data.data["act_info"][4]["act_rows"][2]["act_rows"];
				$scope.cvs4 = result.data.data["act_info"][4]["act_rows"][3]["act_rows"];
				
				//优选水果
				$scope.divs = result.data.data["act_info"][5]["act_rows"];
				
				
				//获取localStorage信息添加到购物车
				var locationDataStr = localStorage.getItem("cartData");
				var locationData;
				if(!locationDataStr) {
					locationData = {};
				} else {
					locationData = JSON.parse(locationDataStr)
				}
				$scope.cartData = locationData;
				
				$scope.james = JSON.parse(localStorage.getItem("cartData"));
				$scope.add = function(x) {
					var locationDataStr = localStorage.getItem("cartData");
					var locationData;
					if(!locationDataStr) {
						locationData = {};
					} else {
						locationData = JSON.parse(locationDataStr)
					}

					var tempObj = {
						id: x["id"],
						name: x["name"],
						price: x["price"],
						img: x["img"],
						num: 1,
					}

					var tempData = locationData[x["id"]];
					if(!tempData) {
						locationData[x["id"]] = tempObj;
					} else {
						tempData["num"] = tempData["num"] + 1;
					}
					localStorage.setItem("cartData", JSON.stringify(locationData));
					$scope.james = locationData;
				}
				
				
//				//详情页面
//				$scope.divs2 = function(index,event){
//					$("#popup").show();
//					$("body").css("overflow","hidden");
//					$scope.popup_1 = $(event.target).parent().siblings(".divs_p1").html()+$(event.target).parent().siblings(".divs_p4").html();
//					$scope.popup_2 = event.target.currentSrc;
//					$scope.popup_3 = $scope.popup_1;
//					$scope.popup_4 = $(event.target).parent().siblings(".divs_p5").children("b").html();
//					$scope.popup_5 = $(event.target).parent().siblings().children("i").html();
//				}
//				//返回
//				$scope.returns = function(){
//					$("#popup").hide();
//					$("body").css("overflow","visible");
//				}
				
//				$scope.james = JSON.parse(localStorage.getItem("cartData"));
				$scope.reduce1 = function() {
					for(var g in $scope.james){
						console.log($scope.james[g].num)
						$scope.james[g].num = $scope.james[g].num - 1;
						$scope.popup_5 = $scope.james[g].num ;
						localStorage.setItem("cartData", JSON.stringify(locationData));
					}
				}
				$scope.add1 = function() {
					for(var g in $scope.james){
						console.log($scope.james[g].num)
						$scope.james[g].num = $scope.james[g].num + 1;
						$scope.popup_5 = $scope.james[g].num ;
						localStorage.setItem("cartData", JSON.stringify(locationData));
					}
				}
				
			})
			.catch(function(result) {

			})
	})

function swiper() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		speed: 1000,
		autoplay: 2000,
		pagination: '.swiper-pagination',
	});
}
