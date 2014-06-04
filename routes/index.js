var matchFinderClass = require('./matchfinder');
var moment = require('moment');
var MatchFinder = matchFinderClass.MatchFinder;
var MatchPredictorSingleTeam = matchFinderClass.MatchPredictorSingleTeam;
var NetlighterMakesBet = matchFinderClass.NetlighterMakesBet;
var NetlighterMakesBets = matchFinderClass.NetlighterMakesBets;
var MatchPhase = matchFinderClass.MatchPhase;
var Netlighter = matchFinderClass.Netlighter;
var MatchResults = matchFinderClass.MatchResults;

var matchFinder = new MatchFinder();

var express = require('express');
var router = express.Router();

module.exports = function(router) {
	
	router.get('/', isLoggedIn, function(req, res) {
		console.log('retrieve session '+req.session.test);
		console.log('in getMatchOfTheDay for ' + req.session.userid);
		var netlighterMakesBets = new NetlighterMakesBets(
				req.session.userid);
		var betsMade;

		netlighterMakesBets.checkIfBetsMade(function(error, singleBetsMade) {
			console.log('bets made while getting match of the day: '
					+ singleBetsMade);

			matchFinder.getMatchOfTheDay(function(error, match) {
				req.session.matches = match;
				res.render('index', {
					title : 'Today\'s Match',
					matches : match,
					scripts : [ '/javascripts/utils.js',
							'/bootstrap-select/bootstrap-select.js' ],
					links : 'bootstrap-select/bootstrap-select.css',
					loggedIn : true,
					betsMade : singleBetsMade,
					netlighter : req.session.user,
					user : req.session.userid,
					menu : 'today',
					moment: moment
				});
			});
		});
	});

	router
			.post(
					'/',
					isLoggedIn,
					function(req, res) {
						console.log('in posting prediction for '
								+ req.session.userid);
						var id = req.body.user;
						var predictedTeam = '';
						var predictedPosition = req.body.position;
						var bet = req.body.bet;
						var scoretyp = req.body.scoretyp;
						var scorehemma = req.body.scorehemma;
						var typ = req.body.typ;
						var hemma = req.body.hemma;
						if (scoretyp != null && scoretyp != "") {
							if (scoretyp > scorehemma) {
								predictedTeam = typ;
							} else if (scorehemma > scoretyp) {
								predictedTeam = hemma;
							} else {
								predictedTeam = "none";
							}
						}
						console.log("in posting prediction predictedteam is: "
								+ predictedTeam);
						var matchPredictorSingle = new MatchPredictorSingleTeam(
								id, predictedTeam, bet, scoretyp, scorehemma);
						var netlighterMakesBets = new NetlighterMakesBets(id);
						var betsMade;
						console.log('posting pred.. check if bets mades');

						matchPredictorSingle
								.setPrediction(function(error, predict) {
									netlighterMakesBets
											.checkIfBetsMade(function(error,
													singleBetsMade) {
												console
														.log('first check if bets mades '
																+ singleBetsMade);
												betsMade = singleBetsMade;

												var successMessage = 'Great job! ';
												if (predictedTeam != null
														&& predictedTeam != '') {
													if (predictedTeam != "none") {
														successMessage += 'You have predicted the winning team to be ';
														successMessage += '<b>'
																+ predictedTeam
																+ '</b><br/>';
													} else {
														successMessage += 'It\'s a <b>tie</b>?!! ';
													}
												}
												if (scoretyp != null
														&& scoretyp != "") {
													successMessage += 'Score: <b>'
															+ scoretyp
															+ ' - '
															+ scorehemma
															+ '</b>';
												}

												successMessage += '<br/>Good luck!';

												console.log('second render');
												res
														.render(
																'index',
																{
																	title : 'Today\'s Match',
																	matches : req.session.matches,
																	scripts : [
																			'/javascripts/utils.js',
																			'/bootstrap-select/bootstrap-select.js' ],
																	links : 'bootstrap-select/bootstrap-select.css',
																	loggedIn : true,
																	netlighter : req.session.user,
																	user : req.session.userid,
																	betsMade : betsMade,
																	placesuccess : predictedPosition,
																	successmessage : successMessage,
																	menu : 'today',
																	moment: moment
																});
											});
								});
					});

	router.get('/event/:date', isLoggedIn,
			function(req, res) {
				console.log('in getMatchOfTheDay for event '
						+ req.session.userid);
				var netlighterMakesBets = new NetlighterMakesBets(
						req.session.userid);
				var betsMade;

				netlighterMakesBets.checkIfBetsMade(function(error,
						singleBetsMade) {
					console.log('bets made while getting match of the day: '
							+ singleBetsMade);
					var matchEvent = new MatchEvent(req.params.date);
					matchEvent.getMatchOfTheDay(function(error, match) {
						req.session.matchEvent = match;
						res.render('index', {
							title :'Events held '+moment(req.params.date).endOf('day').fromNow() +' <br/>'
							+ '[' + moment(req.params.date).format('LL')+']',
							matches : match,
							scripts : [ '/javascripts/utils.js' ],
							loggedIn : true,
							betsMade : singleBetsMade,
							netlighter : req.session.user,
							user : req.session.userid,
							menu : 'calendar',
							moment: moment
						});
					});
				});
			});

	router
			.post(
					'/event/:date',
					isLoggedIn,
					function(req, res) {
						console.log('in posting prediction for event');
						var id = req.body.user;
						var predictedTeam = '';
						var predictedPosition = req.body.position;
						var bet = req.body.bet;
						var scoretyp = req.body.scoretyp;
						var scorehemma = req.body.scorehemma;
						var typ = req.body.typ;
						var hemma = req.body.hemma;
						if (scoretyp != null && scoretyp != "") {
							if (scoretyp > scorehemma) {
								predictedTeam = typ;
							} else if (scorehemma > scoretyp) {
								predictedTeam = hemma;
							} else {
								predictedTeam = "none";
							}
						}

						var matchPredictorSingle = new MatchPredictorSingleTeam(
								id, predictedTeam, bet, scoretyp, scorehemma);
						var netlighterMakesBets = new NetlighterMakesBets(id);
						var betsMade;
						console.log('posting pred.. check if bets mades');

						matchPredictorSingle
								.setPrediction(function(error, predict) {
									netlighterMakesBets
											.checkIfBetsMade(function(error,
													singleBetsMade) {
												console
														.log('first check if bets mades '
																+ singleBetsMade);
												betsMade = singleBetsMade;

												var successMessage = 'Great job! ';
												if (predictedTeam != null
														&& predictedTeam != '') {
													if (predictedTeam != "none") {
														successMessage += 'You have predicted the winning team to be ';
														successMessage += '<b>'
																+ predictedTeam
																+ '</b><br/>';
													} else {
														successMessage += 'It\'s a <b>tie</b>?!! ';
													}
												}
												if (scoretyp != null
														&& scoretyp != "") {
													successMessage += 'Score: <b>'
															+ scoretyp
															+ ' - '
															+ scorehemma
															+ '</b>';
												}

												successMessage += '<br/>Good luck!';
												res
														.render(
																'index',
																{
																	title : 'Events held '+moment(req.params.date).endOf('day').fromNow() +' <br/>'
																			+ '[' + moment(req.params.date).format('LL')+']',
																	matches : req.session.matchEvent,
																	scripts : [ '/javascripts/utils.js' ],
																	loggedIn : true,
																	netlighter : req.session.user,
																	user : req.session.userid,
																	betsMade : betsMade,
																	placesuccess : predictedPosition,
																	successmessage : successMessage,
																	menu : 'calendar',
																	moment: moment
																});
											});
								});

					});

	router.get('/calendar', isLoggedIn, function(req, res) {
		console.log('in get bonuses');

		var matchPhaseStageGroup = new MatchPhase(1);
		var matchPhaseSecondPhase = new MatchPhase(2);
		var matchPhaseQuarters = new MatchPhase(3);
		var matchPhaseSemis = new MatchPhase(4);
		var matchPhaseThird = new MatchPhase(5);
		var matchPhaseFinal = new MatchPhase(6);
		matchPhaseStageGroup.getCalendar(function(error, calendarGroupStage) {
			matchPhaseSecondPhase.getCalendar(function(error,
					calendarSecondPhase) {
				matchPhaseQuarters
						.getCalendar(function(error, calendarQuarters) {
							matchPhaseSemis.getCalendar(function(error,
									calendarSemis) {
								matchPhaseThird.getCalendar(function(error,
										calendarThird) {
								matchPhaseFinal.getCalendar(function(error,
										calendarFinal) {
									res.render('calendar', {
										title : 'Calendar',
										groupPhase : calendarGroupStage,
										secondPhase : calendarSecondPhase,
										quarters : calendarQuarters,
										semis : calendarSemis,
										third : calendarThird,
										finals : calendarFinal,
										loggedIn : true,
										netlighter : req.session.user,
										menu : 'calendar'
									});
								});
							});
						});});
			});
		});
	});

	router.get('/help', isLoggedIn, function(req, res) {
		console.log('in get help');

		res.render('help', {
			title : 'You & BrazilianLight',
			loggedIn : true,
			netlighter : req.session.user,
			menu : 'help'
		});

	});

	router.get('/ranking', isLoggedIn, function(req, res) {
		console.log('in ranking');
		var netlighterMakesBets = new NetlighterMakesBets(
				req.session.userid);

		netlighterMakesBets.getranking(function(error, netlightersRanking) {
			res.render('ranking', {
				title : "You - v - The Others",
				netlighters : netlightersRanking,
				loggedIn : true,
				userid : req.session.userid,
				netlighter : req.session.user,
				menu : 'ranking'
			});
		});
	});

	router.get('/logout', function(req, res) {
		console.log("logging out");
		req.logout();
		req.session.user = null;
		res.redirect('/login');
	});

	function isLoggedIn(req, res, next) {
		if (req.session.user)
			return next();
		res.redirect('/login');
	}

	function isAdmin(req, res, next) {
		console.log("who are you admin? "+req.session.userid);
		if (req.session.userid == 'agob' || req.session.userid == 'ajweh' || req.session.userid == 'mkon')
			return next();
		res.redirect('/');
	}
	
	router.get('/login', function(req, res) {
		console.log('retrieve session before '+req.session.test);
		console.log('loggin in');
		if (req.session.user) {
			res.redirect('/');
		} else {
			res.render('login', {});
			req.session.messages = null;

		}
	});

	/*
	 * router.get('/logout', logout);
	 * 
	 * function logout(req, res) { if (req.isAuthenticated()) { req.logout();
	 * req.session.messages = req.i18n.__("Log out successfully"); }
	 * req.session.user = null; res.redirect('/login'); }
	 */

	router
			.post(
					'/login',
					function(req, res) {
						var username = req.body.user;
						var password = req.body.pass;
						if (username != null && username.length>0 && password != null && password.length > 0 ) {
							var netlighter = new Netlighter(username, password);

							netlighter
									.login(function(error, done) {
										if (done != null && done.length > 0) {
											req.session.user = done[0].name;
											req.session.userid = done[0].id;

											if (done[0].active == 0) {
												console
														.log('you are being redirected to changepassword');
												return res
														.redirect('/changepassword');
											}

											console
													.log('you are already active and '
															+ req.session.user);
											res.redirect('/');
										} else {
											res
													.render(
															'login',
															{
																message : "Your username and/or password is wrong. Please try again... Or <a href='mailto:brazilianlight2014@gmail.com?Subject="
																		+ username
																		+ " - Forgot Password' target='_top'>Contact us</a> to retrieve it."
															});
										}
									});
						} else {
							res
									.render(
											'login',
											{
												message : "Your username and/or password is wrong. Please try again... Or <a href='mailto:brazilianlight2014@gmail.com?Subject="
														+ username
														+ " - Forgot Password' target='_top'>Contact us</a> to retrieve it."
											});
						}

					});

	router.get('/changepassword', isLoggedIn, function(req, res) {
		console.log('get to changing password');
		res.render('changepassword', {
			title : 'You & BrazilianLight',
			loggedIn : true,
			netlighter : req.session.user
		});
	});

	router.post('/changepassword', isLoggedIn,
			function(req, res) {
				console.log('changing password');
				var netlighter = new Netlighter(req.session.userid,
						req.body.pass);

				netlighter.changepassword(function(error, done) {
					if (done != null) {
						res.redirect('/');
					}
				});
			});

	
	router.get('/admin', isAdmin,
			function(req, res) {
				console.log('administration');
				matchFinder.getAllMatches(function(error, allmatches) {
					res.render('admin', {
						title : 'Administer Results & Points',
						loggedIn : true,
						netlighter : req.session.user,
						matches: allmatches,
						moment: moment
					});
				});
				
			});
	
	router.post('/admin', isAdmin,
			function(req, res) {
		var team;
		var scoretyp = req.body.scoretyp;
		var scorehemma = req.body.scorehemma;
		var typ = req.body.typ;
		var hemma = req.body.hemma;
		console.log("building team " + typ);
		if (scoretyp == scorehemma)
			team = 'none';
		else if (scoretyp > scorehemma)
			team = typ;
		else
			team = hemma;
		
		console.log("winner is " + team);
				console.log('administration post '+ scoretyp + ' - ' + scorehemma + '-'+req.body.bet);
				var matchResults = new MatchResults(scoretyp,scorehemma, team, req.body.bet);
				matchResults.putResults(function(error, results) {
					matchResults.analyzeResults(function(error, participantsResults) {
						matchFinder.getAllMatches(function(error, allmatches) {
					res.render('admin', {
						title : 'Administer Results & Points',
						loggedIn : true,
						netlighter : req.session.user,
						matches: allmatches,
						moment: moment,
						successmessage: 'You have successfully updated the Game Result <b>'+typ+' v '+hemma+'</b> and Points'
					});
				});});});
				
			});
};

