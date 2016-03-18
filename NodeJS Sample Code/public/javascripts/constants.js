var baseUrl = "http://localhost:3000";

var webservices = {	

	
	//questionnaire webservice listing
	"questionnaireList" : baseUrl + "/questionnaire/listquestionnaire",
	"addquestionnaire" : baseUrl + "/questionnaire/addquestionnaire",
	"editquestionnaire" : baseUrl + "/questionnaire/editquestionnaire",
	"updatequestionnaire" : baseUrl + "/questionnaire/updatequestionnaire",
	"deletequestionnaire" : baseUrl + "/questionnaire/removequestionnaire",
	"updatestatusquestionnaire" : baseUrl + "/questionnaire/updateStatus",
	"getlistQuestions" : baseUrl + "/questionnaire/listquestions",

	//question webservice listing
	"editQuestion" : baseUrl + "/questions/editquestion",
	"saveQuestion" : baseUrl + "/questions/addquestion",
	"updateQuestion" : baseUrl + "/questions/updatequestion",
	"deletequestion" : baseUrl + "/questions/removequestion",
	"updatestatusquestion" : baseUrl + "/questions/updatestatus",


	//answertype webservice listing
	"answerTypeList" : baseUrl + "/answertype/listanswertype"



}

//Todo: to be handled from database
var appConstants = {

	"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="	
}


var headerConstants = {

	"json": "application/json"

}

var pagingConstants = {
	"defaultPageSize": 10,
	"defaultPageNumber":1
}

var messagesConstants = {

	
	//questionnaires
	"saveQuestionnaire" : "Questionnaire saved successfully",
	"updateQuestionnaire" : "Questionnaire updated successfully",
	"deleteQuestionnaire" : "Questionnaire deleted successfully",

	//questions
	"saveQuestion" : "Question saved successfully",
	"updateQuestion" : "Question updated successfully",
	"deleteQuestion": "Question deleted successfully",
	"updateStatus" : "Question updated successfully"

}