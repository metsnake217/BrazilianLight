var matchFinderClass = require('./matchfinder');
var dates = require('../config/competitionDates');
var MatchFinder = matchFinderClass.MatchFinder;
var MatchPredictorSingleTeam = matchFinderClass.MatchPredictorSingleTeam;
var NetlighterMakesBet = matchFinderClass.NetlighterMakesBet;
var NetlighterMakesBets = matchFinderClass.NetlighterMakesBets;
var MatchPhase = matchFinderClass.MatchPhase;
var Netlighter = matchFinderClass.Netlighter;
var MatchResults = matchFinderClass.MatchResults;
var MatchAdvancing = matchFinderClass.MatchAdvancing;
var Match = matchFinderClass.Match;
var moment = require('moment-timezone');

var express = require('express');
var router = express.Router();

module.exports = function(router) {

	var competitionStarts = dates.competitionStarts;
	var competitionEnds = dates.competitionEnds;

	router.get('/', isLoggedIn, function(req, res) {

		var netlighterMakesBets = new NetlighterMakesBets(req.session.userid);
		var betsMade;
		var dateStripped = moment(new Date).tz("America/New_York").format(
				'YYYY-MM-DD'); // '2014-06-09'

		if (moment(competitionEnds).diff(moment(dateStripped)) < 0) {
			netlighterMakesBets.getranking(function(error, ranking) {
				res.render('index', {
					title : 'The Bostonia League has ended!',
					matches : null,
					loggedIn : true,
					netlighter : req.session.user,
					user : req.session.userid,
					menu : 'today',
					state : 'ended',
					moment : moment,
					ranking : ranking,
					userid : req.session.userid,
					now: moment(new Date).tz("America/New_York").format(
							'YYYY-MM-DD HH:mm:ss')
				// '2014-06-09 HH:mm:ss'
				});
			});
		} else {

			if (moment(competitionStarts).diff(moment(dateStripped)) <= 0) {
				netlighterMakesBets.checkIfBetsMade(function(error,
						singleBetsMade) {

					var matchFinder = new MatchFinder(dateStripped);
					console.log("dateStripped: " + dateStripped);
					matchFinder.getMatchOfTheDay(function(error, match) {
						if (match != null && match.length > 0) {
							req.session.matches = match;
							res.render('index', {
								title : 'Today\'s Match(es)',
								matches : match,
								scripts : [ '/javascripts/utils.js',
										'/javascripts/image_preload.js' ],
								loggedIn : true,
								betsMade : singleBetsMade,
								netlighter : req.session.user,
								user : req.session.userid,
								menu : 'today',
								moment : moment,
								now: moment(new Date).tz("America/New_York")
										.format('YYYY-MM-DD HH:mm:ss')
							// '2014-06-09 HH:mm:ss'
							});
						} else {
							netlighterMakesBets.getranking(function(error,
									ranking) {
								res.render('index', {
									title : 'Rest Day',
									matches : null,
									loggedIn : true,
									netlighter : req.session.user,
									user : req.session.userid,
									menu : 'today',
									state : 'rest',
									moment : moment,
									ranking : ranking,
									now: moment(new Date).tz("America/New_York")
											.format('YYYY-MM-DD HH:mm:ss')
								// '2014-06-09 HH:mm:ss'
								});
							});
						}
					});
				});
			} else {
				res.render('index', {
					title : 'Countdown to the World Cup!!!',
					matches : null,
					loggedIn : true,
					netlighter : req.session.user,
					user : req.session.userid,
					menu : 'today',
					state : 'notstarted',
					startdate : competitionStarts,
					moment : moment,
					userid : req.session.userid,
					now: moment(new Date).tz("America/New_York").format(
							'YYYY-MM-DD HH:mm:ss')
				// '2014-06-09 HH:mm:ss'
				});
			}
		}
	});

	router
			.post(
					'/',
					isLoggedIn,
					function(req, res) {
						var id = req.session.userid;
						var email = req.session.email;
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
								id, email, predictedTeam, bet, scoretyp, scorehemma);
						var netlighterMakesBets = new NetlighterMakesBets(id);
						var betsMade;

						matchPredictorSingle
								.setPrediction(function(error, predict) {

									netlighterMakesBets
											.checkIfBetsMade(function(error,
													singleBetsMade) {
												betsMade = singleBetsMade;
												if (predict != null) {

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
																		title : 'Today\'s Match',
																		matches : req.session.matches,
																		scripts : [
																				'/javascripts/utils.js',
																				'/javascripts/image_preload.js' ],
																		loggedIn : true,
																		netlighter : req.session.user,
																		user : req.session.userid,
																		betsMade : betsMade,
																		placesuccess : predictedPosition,
																		successmessage : successMessage,
																		menu : 'today',
																		moment : moment,
																		now : moment(
																				new Date)
																				.tz(
																						"America/New_York")
																				.format(
																						'YYYY-MM-DD HH:mm:ss')
																	// '2014-06-09
																	// HH:mm:ss'
																	});
												} else {
													res
															.render(
																	'index',
																	{
																		title : 'Today\'s Match',
																		matches : req.session.matches,
																		scripts : [
																				'/javascripts/utils.js',
																				'/javascripts/image_preload.js' ],
																		loggedIn : true,
																		netlighter : req.session.user,
																		user : req.session.userid,
																		betsMade : betsMade,
																		message : 'This match has expired. Please check the calendar for upcoming matches :)',
																		menu : 'today',
																		moment : moment,
																		placeerror : predictedPosition,
																		now : moment(
																				new Date)
																				.tz(
																						"America/New_York")
																				.format(
																						'YYYY-MM-DD HH:mm:ss')
																	});
												}
											});

								});
					});

	router.get('/event/:date', isLoggedIn, function(req, res) {
		var netlighterMakesBets = new NetlighterMakesBets(req.session.userid);
		var betsMade;
		var dateStripped = moment(new Date).tz("America/New_York").format(
				'YYYY-MM-DD'); // '2014-06-09'

		if (moment(competitionStarts).diff(moment(dateStripped)) <= 0) {

			netlighterMakesBets
					.checkIfBetsMade(function(error, singleBetsMade) {
						var matchEvent = new MatchEvent(req.params.date);
						matchEvent.getMatchOfTheDay(function(error, match) {
							req.session.matchEvent = match;
							res.render('index', {
								title : 'Events held '
										+ moment(req.params.date).endOf('day')
												.fromNow() + ' <br/>' + '['
										+ moment(req.params.date).format('LL')
										+ ']',
								matches : match,
								scripts : [ '/javascripts/utils.js',
										'/javascripts/image_preload.js' ],
								loggedIn : true,
								betsMade : singleBetsMade,
								netlighter : req.session.user,
								user : req.session.userid,
								menu : 'calendar',
								moment : moment,
								now: moment(new Date).tz("America/New_York")
										.format('YYYY-MM-DD HH:mm:ss')
							// '2014-06-09 HH:mm:ss'
							});
						});
					});
		} else {
			res.render('index', {
				title : 'Countdown to the World Cup!!!',
				matches : null,
				loggedIn : true,
				netlighter : req.session.user,
				user : req.session.userid,
				menu : 'today',
				state : 'notstarted',
				startdate : competitionStarts,
				moment : moment,
				now: moment(new Date).tz("America/New_York").format(
						'YYYY-MM-DD HH:mm:ss')
			// '2014-06-09 HH:mm:ss'
			});
		}

	});

	router
			.post(
					'/event/:date',
					isLoggedIn,
					function(req, res) {
						var id = req.session.userid;
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

						matchPredictorSingle
								.setPrediction(function(error, predict) {
									
										netlighterMakesBets
												.checkIfBetsMade(function(
														error, singleBetsMade) {

													betsMade = singleBetsMade;
													if (predict != null) {
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
																		title : 'Events held '
																				+ moment(
																						req.params.date)
																						.endOf(
																								'day')
																						.fromNow()
																				+ ' <br/>'
																				+ '['
																				+ moment(
																						req.params.date)
																						.format(
																								'LL')
																				+ ']',
																		matches : req.session.matchEvent,
																		scripts : [
																				'/javascripts/utils.js',
																				'/javascripts/image_preload.js' ],
																		loggedIn : true,
																		netlighter : req.session.user,
																		user : req.session.userid,
																		betsMade : betsMade,
																		placesuccess : predictedPosition,
																		successmessage : successMessage,
																		menu : 'calendar',
																		moment : moment,
																		now : moment(
																				new Date)
																				.tz(
																						"America/New_York")
																				.format(
																						'YYYY-MM-DD HH:mm:ss')
																	// '2014-06-09
																	// HH:mm:ss'
																	});
													
													} else {
														res
																.render(
																		'index',
																		{
																			title : 'Events held '
																					+ moment(
																							req.params.date)
																							.endOf(
																									'day')
																							.fromNow()
																					+ ' <br/>'
																					+ '['
																					+ moment(
																							req.params.date)
																							.format(
																									'LL')
																					+ ']',
																			matches : req.session.matchEvent,
																			scripts : [
																					'/javascripts/utils.js',
																					'/javascripts/image_preload.js' ],
																			loggedIn : true,
																			netlighter : req.session.user,
																			user : req.session.userid,
																			betsMade : betsMade,
																			menu : 'calendar',
																			message : 'This match has expired. Please check the calendar for upcoming matches :)',
																			moment : moment,
																			placeerror : predictedPosition,
																			now : moment(
																					new Date)
																					.tz(
																							"America/New_York")
																					.format(
																							'YYYY-MM-DD HH:mm:ss')
																		});
													}
												});
									
								});

					});

	router.post('/add', isLoggedIn, function (req, res) {
		var home_team = req.body.home_team;
		var visitor_team = req.body.visitor_team;
		var league = req.body.league;
		var hour = req.body.hr;
		var mins = req.body.mins;
		var datepicked = req.body.datepicker;
		var time = hour + ":" + mins + ":00";

		console.log("home_team: " + home_team);
		console.log("visitor_team: " + visitor_team);
		console.log("league: " + league);
		console.log("hour: " + hour);
		console.log("mins: " + mins);
		//datepicked = datepicked + " " + hour + ":" + mins + ":00";
		console.log("datepicked: " + datepicked);
		console.log("time: " + time);
		proceed = true;
		errorText = "<b>The following fields are invalid: </b>";

		var home_error = "";
		var visitor_error = "";
		var datepicked_error = "";
		var hour_error = "";
		var mins_error = "";
		var league_error = "";


		if (!(home_team != null && home_team.length > 0)) {
			errorText += "<br/>Home Team";
			proceed = false;
			home_error = "addError";
		}
		if (!(visitor_team != null && visitor_team.length > 0)) {
			errorText += "<br/>Visitor Team";
			proceed = false;
			visitor_error = "addError";
		}
		if (!(league != null && league.length > 0 && league != 'select')) {
			errorText += "<br/>League";
			proceed = false;
			league_error = "addError";
		}
		if (!(datepicked != null && datepicked.length > 0)) {
			errorText += "<br/>Date";
			proceed = false;
			datepicked_error = "addError";
		}
		if (!(hour != null && hour.length > 0 && hour != 'select')) {
			errorText += "<br/>Hour";
			proceed = false;
			hour_error = "addError";
		}
		if (!(mins != null && mins.length > 0 && mins != 'select')) {
			errorText += "<br/>Minutes";
			proceed = false;
			mins_error = "addError";
		}
		var matchPhaseStageAll = new MatchPhase(0);
		if (proceed) {
		var match = new Match(home_team, visitor_team, league, datepicked, time);
		

		match.add(function (error, done) {
			matchPhaseStageAll.getCalendar(function (error, calendarAll) {
				if (done != null && done == 'success') {
					res.render('calendar', {
						title: 'Matches',
						all: calendarAll,
						loggedIn: true,
						netlighter: req.session.user,
						menu: 'calendar',
						addedMatch: home_team + " v " + visitor_team + " on " + datepicked + " " + time,
						moment: moment,
						now: moment(new Date).tz(
							"America/New_York").format(
								'YYYY-MM-DD HH:mm:ss')
					});
				} else {
					res.render('calendar', {
						title: 'Matches',
						all: calendarAll,
						loggedIn: true,
						netlighter: req.session.user,
						menu: 'macthes',
						notaddedMatch: "Something went wrong. Please try again.",
						moment: moment,
						now: moment(new Date).tz(
							"America/New_York").format(
								'YYYY-MM-DD HH:mm:ss')
					});
				}
			});
		});
		} else {
			matchPhaseStageAll.getCalendar(function (error, calendarAll) {
				res.render('calendar', {
					title: 'Matches',
					all: calendarAll,
					loggedIn: true,
					netlighter: req.session.user,
					menu: 'macthes',
					hometeam_val: home_team,
					hometeam_error: home_error,
					visitorteam_val: visitor_team,
					visitorteam_error: visitor_error,
					league_val: league,
					league_error: league_error,
					hour_val: hour,
					hour_error: hour_error,
					mins_val: mins,
					mins_error: mins_error,
					datepicked_val: datepicked,
					datepicked_error: datepicked_error,
					notaddedMatch: errorText,
					moment: moment,
					now: moment(new Date).tz(
						"America/New_York").format(
							'YYYY-MM-DD HH:mm:ss')
				});
			});
	}
	});

	router.get('/calendar', isLoggedIn, function(req, res) {
		var matchPhaseStageGroup = new MatchPhase(1);
		var matchPhaseSecondPhase = new MatchPhase(2);
		var matchPhaseQuarters = new MatchPhase(3);
		var matchPhaseSemis = new MatchPhase(4);
		var matchPhaseThird = new MatchPhase(5);
		var matchPhaseFinal = new MatchPhase(6);
		var matchPhaseStageAll = new MatchPhase(0);
		matchPhaseStageAll.getCalendar(function (error, calendarAll) {
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
											title : 'Matches',
											groupPhase : calendarGroupStage,
											secondPhase : calendarSecondPhase,
											quarters : calendarQuarters,
											semis : calendarSemis,
											third : calendarThird,
											finals: calendarFinal,
											all: calendarAll,
											loggedIn : true,
											netlighter : req.session.user,
											menu : 'calendar',
											moment : moment,
											now : moment(new Date).tz(
													"America/New_York").format(
													'YYYY-MM-DD HH:mm:ss')
										});
									});
								});
							});
						});
			});
		});
		});
	});

	router.get('/help', isLoggedIn, function(req, res) {
		res.render('help', {
			title : 'You & Bostonia League',
			loggedIn : true,
			netlighter : req.session.user,
			menu : 'help'
		});

	});

	router.get('/ranking', isLoggedIn, function(req, res) {
		var netlighterMakesBets = new NetlighterMakesBets(req.session.userid);

		netlighterMakesBets.getranking(function(error, netlightersRanking) {
			res.render('ranking', {
				title : "You - v - The Others",
				netlighters : netlightersRanking,
				loggedIn : true,
				userid : req.session.userid,
				scripts : [ '/javascripts/scrolling.js' ],
				netlighter : req.session.user,
				menu : 'ranking'
			});
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		req.session.user = null;
		res.redirect('/login');
	});

	function isLoggedIn(req, res, next) {
		if (req.session.user)
			return next();
		res.redirect('/login');
	}

	function isLoggedInAndNotActive(req, res, next) {
		if (req.session.active != null && req.session.active == 0)
			return next();
		res.redirect('/');
	}

	function isAdmin(req, res, next) {
		if (req.session.userid == 'algo' || req.session.userid == 'amjw'
			|| req.session.userid == 'mkon' || req.session.userid == 'gna')
			return next();
		res.redirect('/');
	}

	router.get('/login', function(req, res) {
		if (req.session.user) {
			res.redirect('/');
		} else {
			res.render('login', {});
			req.session.messages = null;

		}
	});

	router
			.post(
					'/login',
					function(req, res) {
						var username = req.body.user;
						var password = req.body.pass;
						if (username != null && username.length > 0
								&& password != null && password.length > 0) {
							var netlighter = new Netlighter(username, password);

							netlighter
									.login(function(error, done) {

										if (done != null && done.length > 0) {
											req.session.user = done[0].name;
											req.session.userid = done[0].id;
											req.session.email = done[0].email;
											req.session.active = done[0].active;

											if (done[0].active == 0) {

												return res
														.redirect('/changepassword');
											}

											res.redirect('/');
										} else {
											res
													.render(
															'login',
															{
																message: "Your username and/or password is wrong. Please try again... Or <a href='mailto:bostonialeague@gmail.com?Subject="
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
												message: "Your username and/or password is wrong. Please try again... Or <a href='mailto:bostonialeague@gmail.com?Subject="
														+ username
														+ " - Forgot Password' target='_top'>Contact us</a> to retrieve it."
											});
						}

					});

	router.get('/changepassword', isLoggedInAndNotActive, function(req, res) {
		res.render('changepassword', {
			title : 'You & Bostonia League',
			loggedIn : true,
			netlighter : req.session.user,
			scripts : [ '/javascripts/utils.js' ]
		});
	});

	router.post('/changepassword', isLoggedIn, function(req, res) {
		var netlighter = new Netlighter(req.session.userid, req.body.pass);

		netlighter.changepassword(function(error, done) {
			if (done != null) {
				res.redirect('/');
			}
		});
	});

	router.get('/admin', isAdmin, function(req, res) {
		var dateStripped = moment(new Date).tz("America/New_York").format(
				'YYYY-MM-DD'); // '2014-06-09'
		var matchFinder = new MatchFinder(dateStripped);
		matchFinder.getAllTeams(function(error, allteams) {
			matchFinder.getAllWinners(function(error, winners) {
				matchFinder.getAllMatches(function(error, allmatches) {
					res.render('admin', {
						title : 'Results & Points',
						loggedIn : true,
						netlighter : req.session.user,
						allteams : allteams,
						matches : allmatches,
						winners: winners,
						menu: "admin",
						moment : moment,
						now: moment(new Date).tz("America/New_York").format(
								'YYYY-MM-DD HH:mm:ss')
					// '2014-06-09 HH:mm:ss'
					});
				});
			});
		});
	});

	router
			.post(
					'/admin',
					isAdmin,
					function(req, res) {
						var team;
						var scoretyp = req.body.scoretyp;
						var scorehemma = req.body.scorehemma;
						var typ = req.body.typ;
						var hemma = req.body.hemma;
						var advanced = req.body.advanced;
						if (scoretyp == scorehemma)
							team = 'none';
						else if (scoretyp > scorehemma)
							team = typ;
						else
							team = hemma;
						if (scoretyp != null) {
							var matchResults = new MatchResults(scoretyp,
									scorehemma, team, req.body.bet, typ, hemma);
							matchResults
									.putResults(function(error, results) {
										matchResults
												.analyzeResults(function(error,
														participantsResults) {

													var dateStripped = moment(
															new Date)
														.tz("America/New_York")
															.format(
																	'YYYY-MM-DD'); // '2014-06-09'
													var matchFinder = new MatchFinder(
															dateStripped);
													matchFinder
															.getAllTeams(function(
																	error,
																	allteams) {
																matchFinder
																		.getAllWinners(function(
																				error,
																				winners) {
																			matchFinder
																					.getAllMatches(function(
																							error,
																							allmatches) {
																						res
																								.render(
																										'admin',
																										{
																											title : 'Administer Results, Teams & Points',
																											loggedIn : true,
																											netlighter : req.session.user,
																											allteams : allteams,
																											matches : allmatches,
																											winners : winners,
																											moment : moment,
																											now : moment(
																													new Date)
																													.tz(
																															"America/New_York")
																													.format(
																															'YYYY-MM-DD HH:mm:ss'), // '2014-06-09
																											// HH:mm:ss'
																											successmessage : 'You have successfully updated the Game Result <b>'
																													+ typ
																													+ ' v '
																													+ hemma
																													+ '</b> and Points'
																										});
																					});
																		});
															});
												});
									});
						} else if (advanced != null) {
							var matchAdvancing = new MatchAdvancing(
									req.body.advanced, req.body.typorhemma,
									req.body.bet);
							matchAdvancing
									.updateWinner(function(error, results) {
										var dateStripped = moment(new Date).tz(
												"America/New_York").format(
												'YYYY-MM-DD'); // '2014-06-09'
										var matchFinder = new MatchFinder(
												dateStripped);
										matchFinder
												.getAllTeams(function(error,
														allteams) {
													matchFinder
															.getAllWinners(function(
																	error,
																	winners) {
																matchFinder
																		.getAllMatches(function(
																				error,
																				allmatches) {

																			res
																					.render(
																							'admin',
																							{
																								title : 'Administer Results, Teams & Points',
																								loggedIn : true,
																								netlighter : req.session.user,
																								allteams : allteams,
																								matches : allmatches,
																								winners : winners,
																								moment : moment,
																								now : moment(
																										new Date)
																										.tz(
																												"America/New_York")
																										.format(
																												'YYYY-MM-DD HH:mm:ss'), // '2014-06-09
																								// HH:mm:ss'
																								advancedsuccess : 'You have successfully updated the Advancing team for Match <b>'
																										+ req.body.bet
																										+ '</b>.'
																							});

																		});
															});
												});
									});
						} else {
							res.redirect('/admin');
						}

					});
};
