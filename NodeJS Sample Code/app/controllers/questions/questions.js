var questionObj = require('./../../models/questions/questions.js');
var questionnaireObj = require('./../../models/questionnaire/questionnaire.js');
var constantObj = require('./../../../constants.js');



//adding question
exports.addquestion = function(req, res) {

	var outputJSON = "";
	var errorMessage = "";

	var questionnaireID = req.params.questionnaireID;

	var questions = {};

	questions.question = req.body.question;
	questions.answertype = req.body.answertype;
	questions.answers = req.body.answers;
	
	questionObj(questions).save(req.body, function(err, data) {

		if(err) {

			switch(err.name) {
				case 'ValidationError':
					for(field in err.errors) {
						if(errorMessage == "") {
							errorMessage = err.errors[field].message;
						}
						else {							
							errorMessage+="\r\n"  +  err.errors[field].message;
						}
					}//for
				break;
			}//switch

			outputJSON = {'status' : 'failure', 'messageId' : 400, 'message' : errorMessage};
		}
		else {

			if(questionnaireID) {
				var questionID = data._id;

				questionnaireObj.findById(questionnaireID, function(err, data) {

					data.questions.push(questionID);
					data.save(function(err, data) {
						if(err) {
							outputJSON = {'status' : 'failure', 'messageId': 400, 'message' : constantObj.messages.questionnaireUpdateQuestionFailure};
						}
						else {
							outputJSON = {'status' : 'success', 'messageId': 200, 'message' : constantObj.messages.questionSuccess};
						}

						res.jsonp(outputJSON);

					});
					
				});
			}
		}
		
	});
}

//edit questions
exports.editquestion = function(req, res) {

	var outputJSON = "";

	questionObj.findById(req.params.questionID, function(err, data) {
		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 'data': data}
		}

		res.jsonp(outputJSON);

	});
}

//update question
exports.updatequestion = function(req, res) {
	var outputJSON = "";
	var errorMessage = "";

	var questionID = req.body._id;

	questionObj.findById(questionID, function(err, data) {

		if(!err) {
			data.question = req.body.question;
			data.answertype = req.body.answertype;
			data.enable = req.body.enable;

			if(req.body.answers != undefined) {
				data.answers = req.body.answers;
			}
			else {
				data.answers = '';
			}
			
			data.save(function(err, data) {

				if(err) {
					switch(err.name) {
						case 'ValidationError':
							for(field in err.errors) {
								if(errorMessage == "") {
									errorMessage = err.errors[field].message;
								}
								else {							
									errorMessage+="\r\n" . field.message;
								}
							}//for
						break;
					}//switch

					outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
				}//if
				else {
					outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionUpdateSuccess};
				}


				res.jsonp(outputJSON);


			});
		}

	});
	
}

//update status
exports.updatestatus = function(req, res) {

	var outputJSON = "";
	var errorCount = 0;
	var inputData = req.body;

	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  questionObj.findById(id, function(err, data) {

  		  	if(err) {
  		  		errorCount++;
  		  	}
  		  	else {
  		  		data.enable = inputData[attributename].enable;
  		  		data.save(function(err, data) {

  		  			if(err) {
  		  				errorCount++;
  		  			}
  		  			
  		  		});
  		  	}

  		  	
  		  });

	}

	if(errorCount > 0) {
		outputJSON = {'status': 'success', 'messageId':402, 'message':constantObj.messages.questionStatusUpdateFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionStatusUpdateSuccess};
	}

	res.jsonp(outputJSON);
}


//remove question
exports.removequestion = function(req,  res) {

	var outputJSON = "";
	var errorCount =0;
	var inputData = req.body;

	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  questionObj.findById(id, function(err, data) {

  		  	if(err) {
  		  		errorCount++;
  		  	}
  		  	else {
  		  		data.is_deleted = inputData[attributename].is_deleted;
  		  		data.save(function(err, data) {

  		  			if(err) {
  		  				errorCount++;
  		  			}
  		  			
  		  		});
  		  	}

  		  	
  		  });

	}

	if(errorCount > 0) {
		outputJSON = {'status': 'success', 'messageId':403, 'message':constantObj.messages.questionDeleteFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionDeleteSuccess};
	}

	res.jsonp(outputJSON);

}