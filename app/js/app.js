var testApp = angular.module('testApp', ['ui.router', 'currencyModule', 'homeModule']);

testApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider
	    .when('', 'home');

	$stateProvider
	    .state('home', {
	    	url: '/home',
	    	templateUrl: 'partials/home.html',
	    	controller: 'homeController'
	    })
	    .state('convert', {
	    	url: '/convert',
	    	templateUrl: 'partials/convert.html',
	    	controller: 'currencyController'
	    });

}]);