var pg = require("pg");
var conString = "pg://postgres:@localhost:5432/vm2014";
var client = new pg.Client(conString);

var express = require('express');
var router = express.Router();
var MatchFinder = require('./matchfinder').MatchFinder;
var matchFinder = new MatchFinder();
var NetlighterFinder = require('./netlighterfinder').NetlighterFinder;
var netlighterFinder = new NetlighterFinder();
var passport = require('passport');

router.get('/', /* isLoggedIn, */function(req, res) {
	console.log('in getMatchOfTheDay for ' + req.session.user);
	matchFinder.getMatchOfTheDay(function(error, match) {
		res.render('index', {
			title : 'Dagens Match',
			matches : match,
			scripts : [ '/javascripts/utils.js',
					'/bootstrap-select/bootstrap-select.js' ],
			links : 'bootstrap-select/bootstrap-select.css',
			loggedIn : true,
			netlighter : "Gnagna"//req.session.user
		});
	});
});

router.get('/bonuses', function(req, res) {
	console.log('in get bonuses');

	matchFinder.getBonuses(function(error, bonuses) {
		matchFinder.getTeamsPerGroup(function(error, teams) {
			res.render('bonuses', {
				title : 'Bonus Poang',
				matches : bonuses,
				teams : teams,
				scripts : [ '/bootstrap-select/bootstrap-select.js' ],
				links : 'bootstrap-select/bootstrap-select.css',
				loggedIn : true,
				netlighter : "Gnagna"//req.session.user
			});
		});
	});
});

router.get('/competition', function(req, res) {
	console.log('in get competition');
	matchFinder.getGroupStage(function(error, groupmatches) {
		res.render('competition', {
			title : 'Group Stage',
			matches : groupmatches,
			loggedIn : true,
			netlighter : "Gnagna"//req.session.user
		});
	});
});

router.get('/pictures', function(req, res) {
	console.log('in get pictures');

	res.render('pictures', {
		title : 'Photos',
		scripts : '/stylesheets/carousel.css',
		loggedIn : true,
		netlighter : "Gnagna"//req.session.user
	});

});

router.get('/contactus', function(req, res) {
	console.log('in get contact us');
	res.render('contact', {
		loggedIn : true,
		netlighter : "Gnagna"//req.session.user
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

router.get('/login', function(req, res) {
	if (req.user) {
		// already logged in
		res.redirect('/');
	} else {
		res.render('login', {
			message : req.session.messages
		});
		req.session.messages = null;

	}
});

router.get('/logout', logout);

function logout(req, res) {
	if (req.isAuthenticated()) {
		req.logout();
		req.session.messages = req.i18n.__("Log out successfully");
	}
	res.redirect('/');
}

router.post('/loggedin', function(req, res) {
	console.log(req.body.user.name);
	console.log(req.body.user.pass);
	var username = req.body.user.name;
	var pass = req.body.user.pass;
	netlighterFinder.getNetlighter(function(error, netlighter) {
		console.log("result is " + netlighter);
		if (netlighter) {
			req.session.user = netlighter[0].name;
			console.log('you are ' + req.session.user);
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
	});

});

module.exports = router;
