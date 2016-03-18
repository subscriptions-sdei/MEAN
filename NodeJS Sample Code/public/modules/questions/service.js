"use strict"

angular.module("Question")

.factory('questionService', ['communicationService', function(communicationService) {

	var service = {};

	service.getAnswerTypesList = function(callback) {

			communicationService.resultViaGet(webservices.answerTypeList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});
	}

	service.saveQuestion = function(inputJsonString, questionnaireID, callback) {
			var webservice = webservices.saveQuestion + "/" + questionnaireID;
			
			communicationService.resultViaPost(webservice, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);	
		});	
	}

	service.editQuestion =  function(questionID, callback) {
			var webservice = webservices.editQuestion + "/" + questionID;

			communicationService.resultViaGet(webservice, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});
	}

	service.updateQuestion = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.updateQuestion, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}

	return service;

}]);