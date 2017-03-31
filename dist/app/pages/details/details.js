angular.module("sunckAXF.detailsPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "details",
				url: "/details",
				templateUrl: "app/pages/details/details.html",
				css: "app/pages/details/details.css",
				controller: "detailsController"
			})
	})
	.controller("detailsController", function($scope, $http, $timeout) {
		$http.get("../json/a.json")
			.then(function(result) {
				//详情页面
				$scope.divs2 = function(index,event){
					$("#popup").show();
					$("body").css("overflow","hidden");
					$scope.popup_1 = $(event.target).parent().siblings(".divs_p1").html()+$(event.target).parent().siblings(".divs_p4").html();
					$scope.popup_2 = event.target.currentSrc;
					$scope.popup_3 = $scope.popup_1;
					$scope.popup_4 = $(event.target).parent().siblings(".divs_p5").children("b").html();
					$scope.popup_5 = $(event.target).parent().siblings().children("i").html();
				}
				//返回
				$scope.returns = function(){
					$("#popup").hide();
					$("body").css("overflow","visible");
				}
				
			})
			.catch(function(result) {

			})
	})
