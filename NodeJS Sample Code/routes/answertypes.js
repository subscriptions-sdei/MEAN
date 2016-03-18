module.exports = function(app , express, passport) {

	var router = express.Router();

	var answertypeObj = require('./../app/controllers/answertypes/answertypes.js');
	router.get('/listanswertype', passport.authenticate('basic', {session : true}), answertypeObj.listanswertype);
	router.post('/addanswertype', passport.authenticate('basic', {session: true}), answertypeObj.addanswertype);
	
	app.use('/answertype', router);	
}