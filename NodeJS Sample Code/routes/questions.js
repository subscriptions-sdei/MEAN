module.exports = function(app, express, passport) {

	var router = express.Router();

	var questionObj = require('./../app/controllers/questions/questions.js');

	router.post('/addquestion/:questionnaireID', passport.authenticate('basic', {session : false}), questionObj.addquestion);
	router.get('/editquestion/:questionID', passport.authenticate('basic', {session:false}), questionObj.editquestion);
	router.post('/updatequestion', passport.authenticate('basic', {session:false}), questionObj.updatequestion);
	router.post('/updatestatus', passport.authenticate('basic', {session:false}), questionObj.updatestatus);
	router.post('/removequestion', passport.authenticate('basic', {session:false}), questionObj.removequestion);
	app.use('/questions', router);
}