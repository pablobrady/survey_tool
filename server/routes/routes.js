var express = require('express');
var router = express.Router();

var TITLE_STRING = 'Programmer\'s Self-discovery Tool';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: TITLE_STRING,
		headerTaglineText: 'A survey tool based on the \'Programmers Competency Matrix\'',
		paragraph1Text: 'Learn about your own strengths, and how to become a better programmer.',
		paragraph2Text: 'At the end of the quiz, you\'ll see a summary of your strengths and weaknesses.',
		inputErrorMsg: 'Please tell me a little bit about yourself, before getting started.' // Default
	});
});

router.get('/survey', function(req, res, next) {
	console.log('ROUTES.JS /survey');
	var db = req.db;
	var collection = db.get( process.env.SURVEY_TOOL_DB_NAME );
	collection.find({},{},function(e,docs){
		console.log("docs=" + docs);
		res.render('survey', { 
			title: TITLE_STRING,
			headerTaglineText: 'A survey tool based on the \'Programmers Competency Matrix\'',
			paragraph1Text: 'Learn about your own strengths, and how to become a better programmer.',
			paragraph2Text: 'At the end of the quiz, you\'ll see a summary of your strengths and weaknesses.',
			answerAText: 'aaa',
			answerBText: 'bbb',
			answerCText: 'ccc',
			answerDText: 'ddd',
			inputErrorMsg: '--'
		});
	});
});



/* GET ADMIN main page. */
router.get('/admin', function(req, res) {
	console.log('ROUTES.JS /admin');
	var db = req.db;
	var collection = db.get( process.env.SURVEY_TOOL_DB_NAME );
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			'userlist' : docs,
			'title': 'Programmer\'s Self-discover Tool',
			'headerTagline': 'Admin Page'
		});
	});
});




/* GET ADMIN Userlist page. */
// router.get('/userlist', function(req, res) {
// 	console.log('ROUTES.JS /userlist');
// 	var db = req.db;
// 	var collection = db.get( process.env.SURVEY_TOOL_DB_NAME );
// 	collection.find({},{},function(e,docs){
// 		res.render('userlist', {
// 			'userlist' : docs,
// 			'title': TITLE_STRING,
// 			'headerTagline': 'List of User Responses'
// 		});
// 	});
// });


/* GET New User page. */
// router.get('/newuser', function(req, res) {
//   console.log('ROUTES.JS /newuser');
//   res.render('newuser', { title: 'Add New User' });
// });




//////

// /* POST DATA to /adduser SERVICE */
// router.post('/adduser', function(req, res) {

// 		// Set our internal DB variable
// 		var db = req.db;
// console.log("!!!! req.body = ", req.body);
// 		var userFirstname = req.body.username;
// 		var userEmail = req.body.useremail;

// 		// Set our collection
// 		var collection = db.get( process.env.SURVEY_TOOL_DB_NAME );

// 		// Submit to the DB
// 		collection.insert({
// 				'firstname' : userX,
// 				'lastname' : userX,
// 				'jobtitle' : 'program manager', 
// 				'email' : 'bsmith@msn.com', 
// 				'company' : 'MSN', 
// 				'country' : 'USA',
// 				'answers' : '-'
// 		}, function (err, doc) {
// 				if (err) {
// 						// If it failed, return error
// 						res.send("There was a problem adding the information to the database.");
// 				}
// 				else {
// 						// Success, next page...
// 						res.redirect("survey");
// 				}
// 		});
// });


module.exports = router;
