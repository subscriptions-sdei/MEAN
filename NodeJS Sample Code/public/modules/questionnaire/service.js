"use strict"

angular.module("Questionnaire")

.factory('questionnaireService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


		service.getQuestionnaireList = function(callback) {
				communicationService.resultViaGet(webservices.questionnaireList, appConstants.authorizationKey, headerConstants.json, function(response) {
				callback(response.data);
			});

		}

		service.saveQuestionnaire = function(inputJsonString, callback) {

				communicationService.resultViaPost(webservices.addquestionnaire, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});
		}

		service.editQuestionnaire = function(questionnaireID , callback) {

			var webservice = webservices.editquestionnaire + "/" + questionnaireID;
			communicationService.resultViaGet(webservice, appConstants.authorizationKey, headerConstants.json, function(response) {
				callback(response.data);
			});
		}

		service.updateQuestionnaire = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.updatequestionnaire, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});
		}

		service.deleteQuestionnaire = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.deletequestionnaire, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});

		}

		service.statusUpdateQuestionnaire = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.updatestatusquestionnaire, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});
		}

		service.listQuestions = function(questionnaireID, callback) {
			var webservice = webservices.getlistQuestions + "/" + questionnaireID;

			communicationService.resultViaGet(webservice, appConstants.authorizationKey, headerConstants.json, function(response) {

				callback(response.data)
			});
		}

		service.deleteQuestions = function(inputJsonString, callback) {
				communicationService.resultViaPost(webservices.deletequestion, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});
		}

		service.statusUpdateQuestions = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.updatestatusquestion, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
				callback(response.data);
			});
		}


	return service;

}]);