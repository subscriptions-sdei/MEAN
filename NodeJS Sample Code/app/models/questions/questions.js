var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answersSchema = new mongoose.Schema({
	answeroption:{type:String, required:true},
	enable:{type:Boolean, default:true},
	is_deleted:{type:Boolean, default:false},
  	createdDate:{type:Date, default: Date.now}
});


var questionSchema = new mongoose.Schema({
	question:{type:String, required:true},
	answertype : {type: Schema.Types.ObjectId, ref : "answertype"},
	answers : [answersSchema],
	enable:{type:Boolean, default:true},
	is_deleted:{type:Boolean, default:false},
  	createdDate:{type:Date, default: Date.now} 

});

var questionsObj = mongoose.model('questions', questionSchema);
module.exports = questionsObj;