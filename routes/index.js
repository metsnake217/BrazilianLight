var pg = require("pg");
var conString = "pg://alexgolubev:@localhost:5432/vm2014";
var client = new pg.Client(conString);

var MatchFinder = require('./matchfinder').MatchFinder;
var matchFinder = new MatchFinder();
var NetlighterFinder = require('./netlighterfinder').NetlighterFinder;
var netlighterFinder = new NetlighterFinder();
var passport = require('passport');

module.exports = function(router) {
	router.get('/', isLoggedIn, function(req, res) {
		console.log('in getMatchOfTheDay for ' + passport.session.user);
		matchFinder.getMatchOfTheDay(function(error, match) {
			res.render('index', {
				title : 'Dagens Match',
				matches : match,
				scripts : [ '/javascripts/utils.js',
						'/bootstrap-select/bootstrap-select.js' ],
				links : 'bootstrap-select/bootstrap-select.css',
				loggedIn : true,
				netlighter : passport.session.user
			});
		});
	});

	router.get('/bonuses', isLoggedIn, function(req, res) {
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
					netlighter : passport.session.user
				});
			});
		});
	});

	router.get('/competition', isLoggedIn, function(req, res) {
		console.log('in get competition');
		matchFinder.getGroupStage(function(error, groupmatches) {
			res.render('competition', {
				title : 'Group Stage',
				matches : groupmatches,
				loggedIn : true,
				netlighter : passport.session.user
			});
		});
	});

	router.get('/pictures', isLoggedIn, function(req, res) {
		console.log('in get pictures');

		res.render('pictures', {
			title : 'Photos',
			scripts : '/stylesheets/carousel.css',
			loggedIn : true,
			netlighter : passport.session.user
		});

	});

	router.get('/contactus', isLoggedIn, function(req, res) {
		console.log('in get contact us');
		res.render('contact', {
			loggedIn : true,
			netlighter : passport.session.user
		});
	});

	router.get('/logout', function(req, res) {
		console.log("logging out");
		req.logout();
		passport.session.user = null;
		res.redirect('/login');
	});

	function isLoggedIn(req, res, next) {
		//if (req.isAuthenticated())
		//	return next();
		if(passport.session.user)
			return next();
		res.redirect('/login');
	}

	router.get('/login', function(req, res) {
		if (passport.session.user) {
			res.redirect('/');
		} else {
			res.render('login', {
				message : passport.session.messages
			});
			passport.session.messages = null;

		}
	});
	
/*
	router.get('/logout', logout);

	function logout(req, res) {
		if (req.isAuthenticated()) {
			req.logout();
			passport.session.messages = req.i18n.__("Log out successfully");
		}
		passport.session.user = null;
		res.redirect('/login');
	}
*/
	
	router.post('/loggedin', function(req, res) {
		console.log('username: ' + req.body.user.name);
		console.log('password: ' + req.body.user.pass);
		username = req.body.user.name;
		netlighterFinder.getNetlighter(function(error, netlighter) {
			console.log("result is " + netlighter);
			if (netlighter) {
				passport.session.user = netlighter[0].name;
				console.log('you are ' + passport.session.user);
				res.redirect('/');
			} else {
				res.redirect('/login');
			}
		});

	});

};
// module.exports = router;
