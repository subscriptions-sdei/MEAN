"use strict"

angular.module("Question")

taxiapp.controller('questionController', ['$scope', '$rootScope', '$routeParams', '$localStorage', 'questionService', function($scope, $rootScope, $routeParams, $localStorage, questionService) {
	if($localStorage.userLoggedIn) {
		$rootScope.userLoggedIn = true;
		$rootScope.loggedInUser = $localStorage.loggedInUsername;
	}
	else {
		$rootScope.userLoggedIn = false;
	}

	if($rootScope.message != "") {

		$scope.message = $rootScope.message;
	}

	//empty the $scope.message so the field gets reset once the message is displayed.
	$scope.message = "";

	//setting the questionnaireID
	$scope.questionnaireID = $routeParams.questionnaireID;

	questionService.getAnswerTypesList(function(response) {

		$scope.data = response.data;
		$scope.answertype = $scope.data[0]._id;


	});

	//add question
	$scope.addQuestion = function(questionnaireID) {

		var inputJsonString = "";
		$scope.questionnaireID = questionnaireID;
		$scope.questionID = $routeParams.questionID;



		if($scope.question == undefined) {
			$scope.question = "";
		}

		if($scope.enable == undefined) {
			$scope.enable = "";
		}

		if($scope.options == undefined) {
			$scope.answer = "";
		}
		else {
			$scope.answer = $scope.options;
		}

		if($scope.questionID == undefined) {
			//inputJsonString = '{"question": "' + $scope.question + '", "answertype": "' + $scope.answertype + '", "answers" : "' + $scope.answer + '", enable": "' + $scope.enable + '" }';
			inputJsonString = {"question": $scope.question  , "answertype": $scope.answertype , "answers" :  $scope.answer  ,  "enable":  $scope.enable };

			questionService.saveQuestion(inputJsonString, questionnaireID, function(err, response) {

				if(err) {
					$scope.message = err.message;
				}
				else {
					if(response.data.messageId == 200) {
						$scope.message = messagesConstants.saveQuestion;
					}
				}
			});
		}
		else {

			//inputJsonString = '{"_id":"' + $scope.questionID+ '","question":"' + $scope.question + '",  "answertype": "' + $scope.answertype + '", "answers" : "' + $scope.answers + '", enable": "' + $scope.enable + '" }';
			inputJsonString = {"_id": $scope.questionID , "question": $scope.question ,  "answertype": $scope.answertype , "answers" : $scope.answer , "enable": $scope.enable};

			questionService.updateQuestion(inputJsonString, function(err, response) {
				if(err) {
					$scope.message = err.message;
				}
				else {
					if(response.data.messageId == 200) {
						$scope.message = messagesConstants.updateQuestion;
					}
				}

			});
		}

	}

	$scope.options = [];

	$scope.editQuestion = function() {
		$scope.showOptionFields = false;

		questionService.editQuestion($routeParams.questionID, function(response) {

			if(response.messageId == 200) {
				var selectedOption = response.data.answertype;

				$scope.question = response.data.question;
				$scope.answertype = response.data.answertype;
				$scope.enable = response.data.enable;
				
				//not text option is selected
				if((selectedOption != '566e652490c953d81680d292') && (selectedOption != '569cda788c864c0c4361c962')) {
					$scope.showOptionFields = true;

					angular.forEach(response.data.answers , function(value ,  key) {
						$scope.options.push({answeroption: value.answeroption});
					});
				}

			}
		});
	}

	if($routeParams.questionID) {
		$scope.editQuestion();
	}

	
	$scope.showOptions = function() {

		var selectedOption = $scope.answertype;

		$scope.showOptionFields = false;

		//not text option is selected
		if((selectedOption != '566e652490c953d81680d292') && (selectedOption != '569cda788c864c0c4361c962')) {

			$scope.showOptionFields = true;
			$scope.options.push({answeroption: ''});
		}
	}

	$scope.removeOption = function(selectIndex) {
		$scope.options.splice(selectIndex, 1);
	}

}]);