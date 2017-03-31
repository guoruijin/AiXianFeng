angular.module("sunckAXF.marketPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "market",
				url: "/market",
				templateUrl: "app/pages/market/market.html",
				css: "app/pages/market/market.css",
				controller: "marketController",
				params: {
					idNum: 104749,
				},
			})
	})
	.controller("marketController", function($scope, $http, $stateParams) {
		$http.get("../json/b.json")
			.then(function(result) {
				//左侧导航数据
				$scope.nav = result.data.data["categories"];

				//默认显示热销榜
				$scope.nav2 = result.data.data["products"][$stateParams.idNum];

				//小黄条
				setTimeout(function() {
					for(var i = 0; i < $scope.nav.length; i++) {
						if($scope.nav[i].id == $stateParams.idNum) {
							var lis = $("#market_left").children("li");
							$(lis[i]).children("a").css("borderLeft", "0.3rem solid yellow");
						}
					}

					if($(".num").html() != 0) {
						$(this).next().show();
						$(this).prev().show();
					}
				}, 50)

				//点击左侧导航   右侧刷新数据
				$scope.lefts = function(index, event) {
					event.target.style.borderLeft = "0.3rem solid yellow";
					$(event.target).parent().siblings().children("a").css("border", "none");
					$scope.nav2 = result.data.data["products"][result.data.data["categories"][index].id];
				};

				$scope.james = JSON.parse(localStorage.getItem("cartData"));
				$scope.reduce = function(x) {
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
						tempData["num"] = tempData["num"] - 1;
					}
					localStorage.setItem("cartData", JSON.stringify(locationData));
					$scope.james = locationData;
				}
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

				//分类排序
				$scope.top_1 = function(event) {
					if($(".top1").is(":hidden")) {
						$(".top2").hide();
						$(".top1").show();
						event.target.innerHTML = "全部分类︿";
						$("#market_right_top_2").html("综合排序﹀");
					} else {
						$(".top1").hide();
						event.target.innerHTML = "全部分类﹀";
					}
				}
				$scope.top_2 = function(event) {
					if($(".top2").is(":hidden")) {
						$(".top1").hide();
						$(".top2").show();
						event.target.innerHTML = "综合排序︿";
						$("#market_right_top_1").html("全部分类﹀");
					} else {
						$(".top2").hide();
						event.target.innerHTML = "综合排序﹀";
					}
				}

				//详情页面
				$scope.divs2 = function(index, event) {
					$("#popup").show();
					$("body").css("overflow", "hidden");
					$scope.popup_1 = $(event.target).parent().parent().next().children(".dls_p1").html();
					$scope.popup_2 = event.target.currentSrc;
					$scope.popup_3 = $scope.popup_1;
					$scope.popup_4 = $(event.target).parent().parent().next().children(".dls_p5").children(".span1").html();
					$scope.popup_5 = $(event.target).parent().parent().next().children(".dls_p6").children(".num").html();
				}
				//返回
				$scope.returns = function() {
					$("#popup").hide();
					$("body").css("overflow", "visible");
				}

			})
			.catch(function(result) {

			})
	})