var answertypeObj = require('./../../models/answertypes/answertypes.js');
var constantObj = require('./../../../constants.js');


//list answertype
exports.listanswertype = function(req , res) {

	var outputJson = "";

	answertypeObj.find({$and: [{is_deleted : false}, {enable : true}]}, function(err, data) {
		if(err) {
			outputJson = {'status' : 'failure', 'messageId' : 400, 'message' : 'Error retrieving the answertypes'};
		}
		else {
			outputJson = {'status' : 'success', 'messageId' : 200, 'message' : 'Answertype retrieved successfully', 'data':data};
		}

		return res.jsonp(outputJson);
	});
}


//add answertype
exports.addanswertype = function(req, res) {

	var outputJson = "";
	var errorMessage = "";

	var answertype = {};

	answertype.answertype = req.body.answertype;

	answertypeObj(answertype).save(req.body, function(err, data) {

		if(err) {

			switch(err.name) {
				case 'ValidationError':
				
					for(field in err.errors) {
						if(errorMessage == "") {
							errorMessage = err.errors[field].message;
						}
						else {							
							errorMessage+=", " + err.errors[field].message;
						}
					}//for
				break;
			}//switch

			outputJson = {'status':'failure', 'statusCode' : 400, 'message' : errorMessage};
		}
		else {
			outputJson = {'status' : 'success', 'statusCode' : 200, 'message' : constantObj.messages.answertypeSuccess};
		}

		res.jsonp(outputJson);
	});
}