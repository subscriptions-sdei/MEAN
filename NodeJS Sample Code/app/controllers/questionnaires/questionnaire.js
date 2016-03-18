var questionnaireObj = require('./../../models/questionnaire/questionnaire.js');
var constantObj = require('./../../../constants.js');

//list questionnaire
exports.listquestionnaire = function(req , res) {
	var outputJSON = "";

	questionnaireObj.find({'is_deleted' : false}, function(err , data) {

		if(err) {
			outputJSON = {'status' : 'failure', 'messageId' : 401, 'message' : "Error retreiving the questionnaire data"};
		}
		else {
			outputJSON = {'status' : 'success', 'messageId' : 200, 'message' : "questionnaire retreived successfully" , 'data' : data};
		}

		res.jsonp(outputJSON);
	});

}

//adding a questionnaire
exports.addquestionnaire = function(req ,  res) {

	var outputJSON = "";
	var errorMessage = "";


	var questionnaire = {};
	
	questionnaire.questionnaire_name = req.body.questionnaire_name;
	questionnaire.enable = req.body.enable;

	questionnaireObj(questionnaire).save(req.body , function(err, data) {
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

			outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
		}
		else {
			outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionnaireSuccess};
		}

		res.jsonp(outputJSON);

	});

}

//edit questionnaire
exports.editquestionnaire = function(req, res) {

	var outputJSON = "";

	questionnaireObj.findById(req.params.id, function(err, data) {
		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 'data': data}
		}

		res.jsonp(outputJSON);

	});
} 

//update questionnaire
exports.updatequestionnaire = function(req, res) {

	var errorMessage = "";
	var outputJSON = "";

	var id = req.body._id;

	questionnaireObj.findById(id, function(err, data) {
		if(!err) {

			data.questionnaire_name = req.body.questionnaire_name;
			data.enable = req.body.enable;
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
					outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionnaireUpdateSuccess};
				}


				res.jsonp(outputJSON);

			});
		}


	});
} 


//remove questionnaire

exports.removequestionnaire = function(req,  res) {

	var outputJSON = "";
	var errorCount =0;
	var inputData = req.body;

	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  questionnaireObj.findById(id, function(err, data) {

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
		outputJSON = {'status': 'success', 'messageId':403, 'message':constantObj.messages.questionnaireDeleteFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionnaireDeleteSuccess};
	}

	res.jsonp(outputJSON);

}


//update questionnaire status

exports.updateStatus = function(req, res) {
	var outputJSON = "";
	var errorCount = 0;
	var inputData = req.body;

	
	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  questionnaireObj.findById(id, function(err, data) {

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
		outputJSON = {'status': 'success', 'messageId':402, 'message':constantObj.messages.questionnaireStatusUpdateFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.questionnaireStatusUpdateSuccess};
	}

	res.jsonp(outputJSON);
}

//list questions
exports.listquestions = function(req, res) {

	var outputJSON = "";

	var questionnaireID = req.params.id;
	
	questionnaireObj.findOne({'_id' : questionnaireID})
	.populate({
		path:'questions',
		match: {"is_deleted": false}
	})
	.exec(function(err, questionsData) {
		if(err) {
			outputJSON = {'status' : 'failure' , 'messageId' : 400, 'message' : constantObj.messages.errorRetreivingData};
		}
		else {
			outputJSON = {'status' : 'success', 'messageId' : 200, 'message' : constantObj.messages.successRetreivingData, 'data' : questionsData};
		}

		res.jsonp(outputJSON);
	});

 }