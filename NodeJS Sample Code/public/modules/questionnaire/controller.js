'use strict'

angular.module("Questionnaire")

taxiapp.controller('questionnaireController', ['$scope', '$rootScope', '$localStorage', '$routeParams', '$route', '$window', 'ngTableParams', 'questionnaireService',  function($scope, $rootScope, $localStorage, $routeParams, $route, $window, ngTableParams, questionnaireService) {

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


	//getQuestionnaireList
	questionnaireService.getQuestionnaireList (function(response) {

		if(response.messageId == 200) {

			$scope.filter = {questionnaire_name: ''};

			$scope.tableParams = new ngTableParams({page:1, count:10, sorting:{questionnaire_name:"asc"}, filter:$scope.filter}, { total:response.data.length, counts:[], data: response.data});

			//apply global Search
			$scope.applyGlobalSearch = function() {

				var term = $scope.globalSearchTerm;

				if(term != "") {

					if($scope.isInvertedSearch) {
						term = "!" + term;
					}

					$scope.tableParams.filter({$ : term});
					$scope.tableParams.reload();			
				}
			}


			//multiple checkboxes
			var simpleList = response.data;
			$scope.checkboxes = {
				checked: false,
				items:{}
			};	

			// watch for check all checkbox
			    $scope.$watch(function() {
			      return $scope.checkboxes.checked;
			    }, function(value) {

			    	angular.forEach(simpleList, function(item) {

			       	$scope.checkboxes.items[item._id] = value;

			      });
			    });


			    // watch for data checkboxes
			    $scope.$watch(function() {
			      return $scope.checkboxes.items;
			    }, function(values) {
			    	//console.log("select one", values);

			      var checked = 0, unchecked = 0,
			          total = simpleList.length;
			      angular.forEach(simpleList, function(item) {
			        checked   +=  ($scope.checkboxes.items[item._id]) || 0;
			        unchecked += (!$scope.checkboxes.items[item._id]) || 0;
			      });
			      if ((unchecked == 0) || (checked == 0)) {
			        $scope.checkboxes.checked = (checked == total);
			      }


			      // grayed checkbox
			    // angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
			    var result = document.getElementsByClassName("select-all");

			   // console.log("result=" , result);

			    angular.element(result[0]).prop("indeterminate", (checked != 0 && unchecked != 0));

			    }, true);
		}
	});
	
	$scope.showSearch = function() {
		if($scope.isFiltersVisible) {
			$scope.isFiltersVisible = false;	
		}
		else {
			$scope.isFiltersVisible = true;	
		}
	}


	//adding questionnaire
	$scope.addQuestionnaire = function() {

		var inputJsonString = "";

		if($scope.questionnaire_name == undefined) {
			$scope.questionnaire_name = "";
		}

		if($scope.enable == undefined) {
			$scope.enable = false;
		}


		if($scope.questionnaireID == undefined) {
			inputJsonString = '{"questionnaire_name":"' + $scope.questionnaire_name + '", "enable" : "' + $scope.enable + '"}';
			
			questionnaireService.saveQuestionnaire(inputJsonString, function(err, response) {

				if(err) {
					$scope.message = err.message;
				}
				else {
					if(response.data.messageId == 200) {
						$scope.message = messagesConstants.saveQuestionnaire;
					}
				}

			});

		}
		else {

			//edit
			inputJsonString = '{"_id":"' + $scope.questionnaireID+ '","questionnaire_name":"' + $scope.questionnaire_name + '",  "enable": "' + $scope.enable + '" }';
			
			questionnaireService.updateQuestionnaire(inputJsonString, function(err, response) {
				if(err) {
					$scope.message = err.message;
				}
				else {
					if(response.data.messageId == 200) {
						$scope.message = messagesConstants.updateQuestionnaire;
					}
				}

			});
		}
	}


	$scope.editQuestionnaire = function() {
		questionnaireService.editQuestionnaire($routeParams.id, function(response) {

		
			if(response.messageId == 200) {
				$scope.questionnaire_name = response.data.questionnaire_name;
				$scope.enable = response.data.enable;
				$scope.questionnaireID = $routeParams.id;
			}

		});

	}


	if($routeParams.id) {
		$scope.editQuestionnaire();
	}


	//perform action
	$scope.performAction = function() {
		var data = $scope.checkboxes.items;	
		var records = [];
		var inputJsonString = "";
		var jsonString = "";

		var actionToPerform = "";
		
		$scope.selectAction = selectAction.value;

		if($scope.selectAction == "disable") {
			actionToPerform = false;
		}
		else if($scope.selectAction == "enable") {
			actionToPerform = true;
		}
		else if($scope.selectAction == "delete") {

			actionToPerform = "delete";
		}

		//console.log("data=", data);

		for(var id in data) {
			if(data[id]) {
				if(actionToPerform == "delete") {
					if(jsonString == "") {

						jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';	
					}
					else {
						jsonString = jsonString + "," + '{"_id": "' + id + '", "is_deleted":"true"}';
					}
				}
				else {
					if(jsonString == "") {

						jsonString = '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';	
					}
					else {
						jsonString = jsonString + "," + '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
					}
				}
			}
			
		}

		inputJsonString = "[" + jsonString + "]";

		if(actionToPerform == "delete") {
			
			if($routeParams.questionnaireID) {
				questionnaireService.deleteQuestions(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.deleteQuestion;
					$route.reload();
				})
			}
			else {
				questionnaireService.deleteQuestionnaire(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.deleteQuestionnaire;
					$route.reload();	
				});
			}
		}
		else {

			if($routeParams.questionnaireID) {
				questionnaireService.statusUpdateQuestions(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.updateStatus;
					$route.reload();
				});
			}
			else {
				questionnaireService.statusUpdateQuestionnaire(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.updateStatus;
					$route.reload();
				});
			}
		}

	}


	//list questions
	$scope.listquestions = function() {
		
		var questionnaireID = $routeParams.questionnaireID;

		$scope.questionnaireID = questionnaireID;
				
		questionnaireService.listQuestions(questionnaireID, function(response) {

			
			if(response.messageId == 200) {

				if(response.data.questions.length > 0) {

					$scope.filter = {question: ''};

					$scope.tableParams = new ngTableParams({page:1, count:10}, { total:response.data.questions.length, counts:[], data: response.data.questions});

					//apply global Search
					$scope.applyGlobalSearch = function() {

						var term = $scope.globalSearchTerm;

						if(term != "") {

							if($scope.isInvertedSearch) {
								term = "!" + term;
							}

							$scope.tableParams.filter({$ : term});
							$scope.tableParams.reload();			
						}
					}


					//multiple checkboxes
					var simpleList = response.data;
					$scope.checkboxes = {
						checked: false,
						items:{}
					};	

					// watch for check all checkbox
					    $scope.$watch(function() {
					      return $scope.checkboxes.checked;
					    }, function(value) {

					    	angular.forEach(simpleList, function(item) {

					       	$scope.checkboxes.items[item._id] = value;

					      });
					    });


					    // watch for data checkboxes
					    $scope.$watch(function() {
					      return $scope.checkboxes.items;
					    }, function(values) {
					    	//console.log("select one", values);

					      var checked = 0, unchecked = 0,
					          total = simpleList.length;
					      angular.forEach(simpleList, function(item) {
					        checked   +=  ($scope.checkboxes.items[item._id]) || 0;
					        unchecked += (!$scope.checkboxes.items[item._id]) || 0;
					      });
					      if ((unchecked == 0) || (checked == 0)) {
					        $scope.checkboxes.checked = (checked == total);
					      }


					      // grayed checkbox
					    // angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
					    var result = document.getElementsByClassName("select-all");

					   // console.log("result=" , result);

					    angular.element(result[0]).prop("indeterminate", (checked != 0 && unchecked != 0));

					    }, true);
				}
				else {

					$window.location.href = "/#/questions/add/" + questionnaireID;
				}


			}
		});
		
	}



	if($routeParams.questionnaireID) {
		$scope.listquestions();
	}


}]);