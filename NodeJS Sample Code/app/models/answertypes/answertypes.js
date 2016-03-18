var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerTypeSchema = new mongoose.Schema({
	answertype : {type:String},
	enable: {type: Boolean, default: true},
	is_deleted : {type : Boolean, default : false},
	createdDate : {type : Date, default : Date.now}
});

var answerTypeObj = mongoose.model('answertypes', answerTypeSchema);
module.exports = answerTypeObj;