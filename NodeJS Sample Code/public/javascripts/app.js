"use strict";

angular.module("Authentication", []);
angular.module("Home", []);
angular.module("Vehicletype", []);
angular.module("Vehicle", []);
angular.module("communicationModule", []);
angular.module("Users", []);
angular.module("Questionnaire", []);
angular.module("Question", []);

var taxiapp = angular.module('taxiapp', ['ngRoute', 'ngStorage', 'ngTable', 'ngResource', 'ui.grid', 'Authentication', 'Home', 'Vehicletype', 'Vehicle','communicationModule', 'Users', 'satellizer', 'Questionnaire', 'Question'])

.factory('basicAuthenticationInterceptor', function() {
	
	var basicAuthenticationInterceptor = {
		request:function(config) {
			config.headers['Authorization'] = 'Basic ' + appConstants.authorizationKey;
 			config.headers['Content-Type'] = headerConstants.json;
	
			return config;
		}
	};

	return basicAuthenticationInterceptor;
	
})

.config(['$routeProvider', '$httpProvider', '$authProvider', '$locationProvider', function($routeProvider, $httpProvider, $authProvider, $locationProvider) {

	//$httpProvider.interceptors.push('basicAuthenticationInterceptor');

	$authProvider.facebook({
		clientId: facebookConstants.facebook_app_id,
		url: '/adminlogin/auth/facebook'		
	});

	$authProvider.twitter({
		url:'/adminlogin/auth/twitter'
	});

	$authProvider.google({
		clientId : googleConstants.google_client_id,
		url:'/adminlogin/auth/google'
	});

	$routeProvider
	.when('/', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/home', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/login', {
		controller:'loginController',
		templateUrl:'/modules/authentication/views/login.html'
	})

	.when('/forgot-password', {
		controller:'loginController',
		templateUrl:'/modules/authentication/views/forgot-password.html'
	})

	.when('/vehicletype', {
		controller:'vehicletypeController',
		templateUrl:'/modules/vehicletype/views/vehicletype.html'
	})

	.when('/vehicletype/add', {
		controller:'vehicletypeController',
		templateUrl:'/modules/vehicletype/views/addvehicletype.html'
	})

	.when('/vehicletype/edit/:id', {
		controller:'vehicletypeController',
		templateUrl:'/modules/vehicletype/views/addvehicletype.html'
	})

	.when('/vehicles', {
		controller:"vehicleController",
		templateUrl:'/modules/vehicle/views/vehicles.html'
	})

	.when('/users', {
		controller : "userController",
		templateUrl : "/modules/users/views/listuser.html"
	})

	.when('/users/add', {
		controller : "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})

	.when('/users/signup', {
		controller : "userController",
		templateUrl : "/modules/users/views/signup.html"
	})

	.when('/users/edit/:id' , {
		controller: "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})

	.when('/questionnaire', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/listquestionnaire.html"
	})

	.when('/questionnaire/add', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/addquestionnaire.html"
	})

	.when('/questionnaire/edit/:id', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/addquestionnaire.html"
	})

	.when('/questionnaire/listquestions/:questionnaireID' , {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/listquestions.html"
	})

	.when('/questions/add/:questionnaireID' , {
		controller : "questionController",
		templateUrl : "/modules/questions/views/addquestion.html"
	})

	.when('/questions/editquestion/:questionID', {
		controller : "questionController",
		templateUrl : "/modules/questions/views/addquestion.html"
	})

	.otherwise({
		redirectTo:'/modules/authentication/views/login.html'
	});

	//to remove the # from the URL
	//$locationProvider.html5Mode({enabled : true, requireBase : false});
}])

.run(['$rootScope', '$location', '$http', '$localStorage', function($rootScope, $location, $http, $localStorage) {

	if(!$localStorage.userLoggedIn) {
		$location.path('/login');
	}
}]);
