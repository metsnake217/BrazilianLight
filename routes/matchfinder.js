var pg = require("pg");
const { Client, Query } = require('pg');
var moment = require('moment-timezone');
var MailOptions = require('../config/emailClient').MailOptions;
var config = require("../config/database");
var conString = process.env.DATABASE_URL || "pg://" + config.username + ":"
		+ config.password + "@" + config.host + ":" + config.port + "/"
		+ config.database;
var client = new pg.Client(conString);
client.connect();

MatchFinder = function(today) {
	this.now = today
};

MatchEvent = function(date) {
	this.date = date;
};

MatchAdvancing = function(advanced, typorhemma, match) {
	this.advanced = advanced;
	this.typorhemma = typorhemma;
	this.match = match;
};

MatchResults = function(scoretyp, scorehemma, winner, bet, typ, hemma) {
	this.scoretyp = scoretyp;
	this.scorehemma = scorehemma;
	this.bet = bet;
	this.winner = winner;
	this.typ = typ;
	this.hemma = hemma;
};

MatchPredictorSingleTeam = function(id, predictedTeam, bet, scoretyp,
		scorehemma) {
	this.id = id;
	this.predictedTeam = predictedTeam;
	this.bet = bet;
	this.scoretyp = scoretyp;
	this.scorehemma = scorehemma;
};

MatchPhase = function(phase) {
	this.phase = phase;
};

NetlighterMakesBet = function(id, bet) {
	this.id = id;
	this.bet = bet;
};

NetlighterMakesBets = function(id) {
	this.id = id;
};

MatchEvent.prototype.getMatchOfTheDay = function(callback) {
	var results
	var query = client
			.query(new Query("SELECT * FROM vm2014_match where date_trunc('day',datum)='"
					+ this.date + "' order by datum"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getMatchOfTheDay = function(callback) {
	var results;
	var query = client
			.query("SELECT * FROM vm2014_match where date_trunc('day',datum)='"
					+ this.now + "' order by datum");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getTeams = function(callback) {
	var results
	var query = client.query(new Query("SELECT DISTINCT typ FROM vm2014_match"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getTeamsPerGroup = function(callback) {
	var results;
	var query = client.query(new Query("SELECT DISTINCT typ, grupp FROM vm2014_match"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.getGroupStage = function(callback) {
	var results
	var query = client.query(new Query("SELECT * FROM vm2014_match"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchPhase.prototype.getCalendar = function(callback) {
	var results
	var query = client
			.query("SELECT *, to_char(datum, 'YYYY-MM-DD') as shortdate FROM vm2014_match where phase="
					+ this.phase + " order by shortdate");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchPredictorSingleTeam.prototype.setPrediction = function(callback) {

	var query;
	var results;
	var predictedTeam = this.predictedTeam;
	var id = this.id;
	var bet = this.bet;
	var scoretyp = this.scoretyp;
	var scorehemma = this.scorehemma;
	var netlighterMakesBet = new NetlighterMakesBet(id, bet);
	netlighterMakesBet
			.checkIfBetMade(function(error, betMade) {

				var now = moment(new Date).tz("Europe/Berlin").format(
						'YYYY-MM-DD HH:mm:ss');
				var timeOfMatch;
				var canPredict = true;
				var queryMatchString = "Select datum from vm2014_match where bet="
						+ bet;
				var queryMatch = client.query(new Query(queryMatchString));
				queryMatch.on("row", function(row, result) {
					result.addRow(row);
				});
				queryMatch.on("end", function(result) {
					results = result.rows;
					timeOfMatch = results[0].datum;
					if (moment(timeOfMatch).diff(moment(now)) < 0)
						canPredict = false;
					
				if (canPredict) {
					if (betMade != null && betMade.length > 0) {
						var queryString = "UPDATE vm2014_predictsingleteam ";
						if (predictedTeam != null && predictedTeam != ''
								&& scoretyp == null) {
							queryString += "SET predictedteam='"
									+ predictedTeam + "' where id='" + id
									+ "' and bet=" + bet;
						} else if (predictedTeam != null && predictedTeam != ''
								&& scoretyp != null && scoretyp != ''
								&& scorehemma != null && scorehemma != '') {
							queryString += "SET predictedteam='"
									+ predictedTeam + "', scoretyp=" + scoretyp
									+ ", scorehemma=" + scorehemma
									+ " where id='" + id + "' and bet=" + bet;
						} else if (scoretyp != null && scoretyp != ''
								&& scorehemma != null && scorehemma != '') {
							queryString += "SET scoretyp=" + scoretyp
									+ ", scorehemma=" + scorehemma
									+ " where id='" + id + "' and bet=" + bet;
						}
						query = client.query(new Query(queryString));

					} else {
						var queryString = "INSERT INTO vm2014_predictsingleteam VALUES (";
						if (predictedTeam != null && scoretyp == null) {
							queryString += "'" + id + "', '" + predictedTeam
									+ "', " + bet + ", 0)";
						} else if (predictedTeam != null && scoretyp != null
								&& scorehemma != null) {
							queryString += "'" + id + "', '" + predictedTeam
									+ "', " + bet + ", 0," + scoretyp + ","
									+ scorehemma + ")";
						} else if (predictedTeam == null && scoretyp != null
								&& scorehemma != null) {
							queryString += "'" + id + "', '', " + bet + ", 0,"
									+ scoretyp + "," + scorehemma + ")";
						}

						query = client.query(new Query(queryString));

					}

					query.on("row", function(row, result) {
						result.addRow(row);
					});
					query.on("end", function(result) {
						results = result.rows;
						callback(null, results);
					});
				} else {
					callback(null, null);
				}
				});

			});
};

NetlighterMakesBet.prototype.checkIfBetMade = function(callback) {
	var results;
	var query = client
			.query("SELECT * FROM vm2014_predictSingleTeam where id='"
					+ this.id + "' and bet=" + this.bet);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});

}

NetlighterMakesBets.prototype.checkIfBetsMade = function(callback) {
	var results;
	var query = client
			.query("SELECT * FROM vm2014_predictsingleteam where id='"
					+ this.id + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});

}

NetlighterMakesBets.prototype.getranking = function(callback) {
	var results;
	var query = client
			.query("SELECT a.id, sum(a.points) as totalpoints, b.first_name, b.name FROM vm2014_predictsingleteam a, vm2014_users_ext b where a.id=b.id group by a.id, b.first_name, b.name order by totalpoints desc");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});
}

var crypt = require('bcrypt-nodejs');
var salt = crypt.genSaltSync(1);

Netlighter = function(username, password) {
	this.username = username;
	this.password = password;

};

MatchFinder.prototype.getNetlighter = function(callback) {
	var results;
	var query = client.query(new Query("SELECT * FROM vm2014_users where id='" + id
			+ "' and password='" + password + "'"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.test = function(callback) {
	var results;
	var query = client.query(new Query("SELECT * FROM vm2014_users where id='"
			+ this.username + "'"/* and password='"+password+"'" */));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		callback(null, results);
	});
	// return false;
};

Netlighter.prototype.login = function(callback) {
	var password = this.password;
	var username = this.username;

	var results;
	var query = client.query(new Query("SELECT * FROM vm2014_users where id='" + username
			+ "'"/* and password='"+password+"'" */));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		if (results != null && results.length == 1) {

			var pass = results[0].password;
			var active = results[0].active;
			// var hash = crypt.hashSync(pass, salt);
			if (active == 1) {
				var c = crypt.compareSync(password, pass);
				if (c) {
					callback(null, results);
				} else {
					callback(null, null);
				}
			} else {
				var query = client
						.query(new Query("SELECT * FROM vm2014_users where id='"
								+ username + "' and password='" + password
								+ "'"));
				query.on("row", function(row, result) {
					result.addRow(row);
				});
				query.on("end", function(result) {
					callback(null, result.rows);
				});
			}
		} else {
			callback(null, null);
		}
	});
};

Netlighter.prototype.changepassword = function(callback) {
	var hash = crypt.hashSync(this.password);
	var results;
	var query = client.query(new Query("UPDATE vm2014_users SET password='" + hash
			+ "', active=1 where id='" + this.username + "'"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.getAllMatches = function(callback) {
	var results
	var query = client.query(new Query("SELECT * FROM vm2014_match order by datum asc"));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getAllWinners = function(callback) {
	var results
	var query = client
			.query("SELECT * FROM vm2014_teamadvancing order by id asc");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getAllTeams = function(callback) {
	var results
	var query = client
			.query("select distinct typ from vm2014_match where phase=1 order by typ");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchAdvancing.prototype.updateWinner = function(callback) {
	var results
	var typorhemma = this.typorhemma;
	var advanced = this.advanced;
	var match = this.match;
	var queryString = "UPDATE vm2014_teamadvancing SET advancing = '"
			+ advanced + "' where position = " + typorhemma + " and match = "
			+ match;

	var query = client.query(new Query(queryString));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {

		var queryString0 = '';
		if (typorhemma == 1)
			queryString0 = "UPDATE vm2014_match SET typ = '" + advanced
					+ "' where bet = " + match;
		else if (typorhemma == 2)
			queryString0 = "UPDATE vm2014_match SET hemma = '" + advanced
					+ "' where bet = " + match;
		var query0 = client.query(new Query(queryString0));
		query0.on("row", function(row, result) {
			result.addRow(row);
		});
		query0.on("end", function(result) {
			results = result.rows;
			callback(null, results)
		});

	});
};

MatchResults.prototype.putResults = function(callback) {
	var results
	var result = this.scoretyp + ':' + this.scorehemma;
	var queryString = "UPDATE vm2014_match SET resultat = '" + result
			+ "' where bet = " + this.bet;
	var query = client.query(new Query(queryString));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = result.rows;
		callback(null, results)
	});
};

MatchResults.prototype.analyzeResults = function(callback) {
	var results;
	var scoretyp = this.scoretyp;
	var scorehemma = this.scorehemma;
	var bet = this.bet;
	var matchresults = this;

	var result = scoretyp + ':' + scorehemma;
	var queryString = "Select * from vm2014_predictsingleteam where bet = "
			+ bet;
	var query = client.query(new Query(queryString));
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		results = analyze(matchresults, result.rows);
		callback(null, results)
	});
};

var analyze = function(matchresults, participantsResults) {
	for (var i = 0; i < participantsResults.length; i++) {
		var participant = participantsResults[i];
		var points = 0;
		var matchmargin = matchresults.scoretyp - matchresults.scorehemma;
		var participantmargin = participant.scoretyp - participant.scorehemma;
		var predictedteam = participant.predictedteam;
		var winner = matchresults.winner;

		if (predictedteam != winner) {
			points = 0;
		} else if (participant.scoretyp == matchresults.scoretyp
				&& participant.scorehemma == matchresults.scorehemma) {
			points = 6;
		} else if (predictedteam == winner && matchmargin == participantmargin
				&& matchresults.scorehemma != matchresults.scoretyp) {
			points = 4;
		} else if (predictedteam == winner
				|| (participant.scoretyp == matchresults.scoretyp && participant.scorehemma == matchresults.scorehemma)) {
			points = 3;
		}

		var email = participant.id;

		if (email.length == 4 || email.length == 2) {
			email += "@netlight.com";
		}
		var subject = "Your Prediction Results for - " + matchresults.typ
				+ " v " + matchresults.hemma;
		var body = "<div style=\"font-family:'calibri'; font-size:11pt\">Hello There,<br/><br/>";
		body += "Thanks for participating in the BrazilianLight tournament! Here is the result of the game:<br/>";
		body += "<p style=\"text-align:center\"><span style='font-size:20pt'><b>"
				+ matchresults.typ
				+ "</b></span> <span style='color:red; font-size:18pt'><b>"
				+ matchresults.scoretyp + "</b></span>";
		body += " v " + "<span style='color:red; font-size:18pt'><b>"
				+ matchresults.scorehemma
				+ "</b></span> <span style='font-size:20pt'><b>"
				+ matchresults.hemma + "</b></span></p>";
		body += "You predicted the score to be <b>" + participant.scoretyp
				+ ":" + participant.scorehemma + "</b>.";
		body += "<br/>You have earned: <span style='color:red'><b>" + points
				+ " points</b></span>.";
		body += "<br/><br/>Have you played today? Come and play with us again <a href=\"http:\/\/brazilianlight.netlight.com\">@BrazilianLight</a>";
		body += "<br/><br/><b><i>The BrazilianLight Team -</i></b></div>";

		var mailOptions = new MailOptions(email, subject, body);
		mailOptions.sendAllEmails();

		var results;
		var queryString = "UPDATE vm2014_predictsingleteam SET points = "
				+ points + " where bet = " + matchresults.bet + " and id = '"
				+ participant.id + "'";
		var query = client.query(new Query(queryString));
		query.on("row", function(row, result) {
			result.addRow(row);
		});
		query.on("end", function(result) {
			results = result.rows;
			return results;
		});
	}
}

exports.Netlighter = Netlighter;
exports.MatchFinder = MatchFinder;
exports.MatchPredictorSingleTeam = MatchPredictorSingleTeam;
exports.NetlighterMakesBet = NetlighterMakesBet;
exports.NetlighterMakesBets = NetlighterMakesBets;
exports.MatchPhase = MatchPhase;
exports.MatchEvent = MatchEvent;
exports.MatchResults = MatchResults;
exports.MatchAdvancing = MatchAdvancing;
