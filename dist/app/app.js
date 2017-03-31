angular.module("sunckAXF", ["ui.router", "angularCSS",
		"sunckAXF.homePage",
		"sunckAXF.marketPage",
		"sunckAXF.cartPage",
		"sunckAXF.minePage",
		"sunckAXF.detailsPage"
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");
	})