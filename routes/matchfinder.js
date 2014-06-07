var pg = require("pg");
var MailOptions = require('../config/emailClient').MailOptions;
var config = require("../config/database");
var conString = process.env.DATABASE_URL || "pg://"+config.username+":"+config.password+"@"+config.host+":"+config.port+"/"+config.database;
var client = new pg.Client(conString);
var now = '2014-06-07';// new Date
client.connect();

MatchFinder = function(today) {
	this.now = today
};

MatchEvent = function(date) {
	this.date = date;
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
	console.log('building a single match predictor');
	this.id = id;
	this.predictedTeam = predictedTeam;
	this.bet = bet;
	this.scoretyp = scoretyp;
	this.scorehemma = scorehemma;
};

MatchPhase = function(phase) {
	console.log('building a MatchPhase')
	this.phase = phase;
};

NetlighterMakesBet = function(id, bet) {
	console.log('building a NetlighterMakesBet')
	this.id = id;
	this.bet = bet;
};

NetlighterMakesBets = function(id) {
	console.log('building a NetlighterMakesBet')
	this.id = id;
};

MatchEvent.prototype.getMatchOfTheDay = function(callback) {
	var results
	var query = client
			.query("SELECT * FROM vm2014_match where date_trunc('day',datum)='"
					+ this.date + "' order by datum");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getMatchOfTheDay = function(callback) {
	var results
	var query = client
			.query("SELECT * FROM vm2014_match where date_trunc('day',datum)='"
					+ this.now + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getTeams = function(callback) {
	var results
	var query = client.query("SELECT DISTINCT typ FROM vm2014_match");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getTeamsPerGroup = function(callback) {
	var results;
	var query = client.query("SELECT DISTINCT typ, grupp FROM vm2014_match");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.getGroupStage = function(callback) {
	var results
	var query = client.query("SELECT * FROM vm2014_match");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
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
		// console.log(JSON.stringify(result.rows, null, " "));
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
	console.log('in matchfinder checkifbetsmade ' + id + ' - ' + bet);
	var netlighterMakesBet = new NetlighterMakesBet(id, bet);
	console.log('in matchfinder checkifbetsmade typ and hemma ' + scoretyp
			+ ' - ' + scorehemma);
	netlighterMakesBet.checkIfBetMade(function(error, betMade) {

		if (betMade != null && betMade.length > 0) {
			console.log('betMade = ' + betMade.length)
			console.log('trying to update');
			console.log(id + "," + predictedTeam + " , " + bet);
			var queryString = "UPDATE vm2014_predictsingleteam ";
			if (predictedTeam != null && predictedTeam != ''
					&& scoretyp == null) {
				queryString += "SET predictedteam='" + predictedTeam
						+ "' where id='" + id + "' and bet=" + bet;
			} else if (predictedTeam != null && predictedTeam != ''
					&& scoretyp != null && scoretyp != '' && scorehemma != null
					&& scorehemma != '') {
				queryString += "SET predictedteam='" + predictedTeam
						+ "', scoretyp=" + scoretyp + ", scorehemma="
						+ scorehemma + " where id='" + id + "' and bet=" + bet;
			} else if (scoretyp != null && scoretyp != '' && scorehemma != null
					&& scorehemma != '') {
				queryString += "SET scoretyp=" + scoretyp + ", scorehemma="
						+ scorehemma + " where id='" + id + "' and bet=" + bet;
			}
			query = client.query(queryString);
			console.log('done updating querystring ' + queryString);

		} else {
			console.log('trying to insert');
			var queryString = "INSERT INTO vm2014_predictsingleteam VALUES (";
			if (predictedTeam != null && scoretyp == null) {
				queryString += "'" + id + "', '" + predictedTeam + "', " + bet
						+ ", 0)";
			} else if (predictedTeam != null && scoretyp != null
					&& scorehemma != null) {
				queryString += "'" + id + "', '" + predictedTeam + "', " + bet
						+ ", 0," + scoretyp + "," + scorehemma + ")";
			} else if (predictedTeam == null && scoretyp != null
					&& scorehemma != null) {
				queryString += "'" + id + "', '', " + bet + ", 0," + scoretyp
						+ "," + scorehemma + ")";
			}
			/*
			 * query = client .query("INSERT INTO vm2014_predictsingleteam
			 * VALUES ('" + id + "', '" + predictedTeam + "', " + bet + ", 0)");
			 */
			query = client.query(queryString);
			console.log('done inserting querystring ' + queryString);
		}

		query.on("row", function(row, result) {
			result.addRow(row);
		});
		query.on("end", function(result) {
			// console.log(JSON.stringify(result.rows, null, " "));
			results = result.rows;
			callback(null, results);
		});

	});
};

NetlighterMakesBet.prototype.checkIfBetMade = function(callback) {
	console.log('building a checkIfBetMade : ' + this.id + '-' + this.bet)
	var results;
	var query = client
			.query("SELECT * FROM vm2014_predictSingleTeam where id='"
					+ this.id + "' and bet=" + this.bet);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		console.log('length of check bet: ' + results != null);
		callback(null, results);
	});

}

NetlighterMakesBets.prototype.checkIfBetsMade = function(callback) {
	console.log('building a checkIfBetsMade : ' + this.id)
	var results;
	var query = client
			.query("SELECT * FROM vm2014_predictsingleteam where id='"
					+ this.id + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results);
	});

}

NetlighterMakesBets.prototype.getranking = function(callback) {
	console.log('fetching ranking')
	var results;
	var query = client
			.query("SELECT id, sum(points) as totalpoints FROM vm2014_predictsingleteam group by id order by totalpoints desc");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results);
	});
}

var crypt = require('bcrypt-nodejs');
var salt = crypt.genSaltSync(1);

Netlighter = function(username, password) {
	console.log('building a netlighter')
	this.username = username;
	this.password = password;

};

MatchFinder.prototype.getNetlighter = function(callback) {
	var results;
	console.log("finding netlighter");
	var query = client.query("SELECT * FROM vm2014_users where id='" + id
			+ "' and password='" + password + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.test = function(callback) {
	var results;
	console.log("testing " + username + " - " + callback.pass);
	var query = client.query("SELECT * FROM vm2014_users where id='"
			+ this.username + "'"/* and password='"+password+"'" */);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		callback(null, results);
	});
	// return false;
};

Netlighter.prototype.login = function(callback) {
	console.log(this.username + "," + this.password);
	var password = this.password;
	var username = this.username;

	var results;
	var query = client.query("SELECT * FROM vm2014_users where id='"
			+ username + "'"/* and password='"+password+"'" */);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		console.log('results logging : '+results)
		if (results != null && results.length == 1) {
			
			var pass = results[0].password;
			var active = results[0].active;
			console.log('pass is: ' + pass);
			console.log('pass0 is: ' + password);
			console.log('User is active? ' + active);
			// var hash = crypt.hashSync(pass, salt);
			if (active == 1) {
				var c = crypt.compareSync(password, pass);
				console.log('password: ' + pass + ' comparison: ' + c);
				if (c) {
					callback(null, results);
				} else {
					callback(null, null);
				}
			} else {
				console.log('user is not active checking password');
				var query = client.query("SELECT * FROM vm2014_users where id='"
						+ username + "' and password='"+password+"'");
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
	console.log(this.username + "," + this.password);

	var hash = crypt.hashSync(this.password);
	console.log("hashed password '" + this.password + "' is: " + hash);

	var results;
	var query = client.query("UPDATE vm2014_users SET password='" + hash
			+ "', active=1 where id='" + this.username + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results);
	});
};

MatchFinder.prototype.getAllMatches = function(callback) {
	var results
	var query = client.query("SELECT * FROM vm2014_match order by datum asc");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;
		callback(null, results)
	});
};

MatchResults.prototype.putResults = function(callback) {
	var results
	console.log("result " + this.scoretyp + ':' + this.scorehemma);
	var result = this.scoretyp + ':' + this.scorehemma;
	var queryString = "UPDATE vm2014_match SET resultat = '" + result
			+ "' where bet = " + this.bet;
	var query = client.query(queryString);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;

		callback(null, results)
	});
};

MatchResults.prototype.analyzeResults = function(callback) {
	console.log("inside analyzeresults");
	var results;
	var scoretyp = this.scoretyp;
	var scorehemma = this.scorehemma;
	var bet = this.bet;
	var matchresults = this;

	var result = scoretyp + ':' + scorehemma;
	var queryString = "Select * from vm2014_predictsingleteam where bet = "
			+ bet;
	var query = client.query(queryString);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		// console.log(JSON.stringify(result.rows, null, " "));
		results = result.rows;

		results = analyze(matchresults, results);

		callback(null, results)
	});
};

var analyze = function(matchresults, participantsResults) {
	console.log("inside analyze " + participantsResults.length);
	for (var i = 0; i < participantsResults.length; i++) {
		var participant = participantsResults[i];
		var points = 0;
		var matchmargin = matchresults.scoretyp - matchresults.scorehemma;
		var participantmargin = participant.scoretyp - participant.scorehemma;
		var predictedteam = participant.predictedteam;
		var winner = matchresults.winner;
		console.log("predicted winner " + (predictedteam == winner));
		if (predictedteam != winner) {
			console.log('lost');
			points = 0;
		} else if (participant.scoretyp == matchresults.scoretyp
				&& participant.scorehemma == matchresults.scorehemma
				&& winner != 'none') {
			console.log("maximum points ");
			points = 6;
		} else if (predictedteam == winner && matchmargin == participantmargin) {
			console.log("4 points winner predicted and same margin ");
			points = 4;
		} else if (predictedteam == winner) {
			console.log("3 points winner was predicted ");
			points = 3;
		}

		console.log("Participant " + participant.id + " : " + points);
		
		var email = participant.id;
		if(email.length == 4 || email.length == 2){
			email += "@netlight.com"; 
		}
		var subject = "Your Prediction Results for - "+matchresults.typ+" v "+matchresults.hemma;
		var body = "<div style=\"font-family:'calibri'; font-size:11pt\">Hello There,<br/><br/>";
		body += "Thanks for participating in the BrazilianLight tournament! Here is the result of the game:<br/>";
		body += "<p style=\"text-align:center\"><span style='font-size:20pt'><b>"+matchresults.typ+"</b></span> <span style='color:red; font-size:18pt'><b>"+matchresults.scoretyp+"</b></span>";
		body += " v "+"<span style='color:red; font-size:18pt'><b>"+matchresults.scorehemma+"</b></span> <span style='font-size:20pt'><b>"+matchresults.hemma+"</b></span></p>";
		body += "You predicted the score to be <b>"+participant.scoretyp+":"+participant.scorehemma+"</b>.";
		body += "<br/>You have earned: <span style='color:red'><b>"+points+" points</b></span>.";
		body += "<br/><br/>Have you played today? Come and play with us again <a href=\"brazilianlight.netlight.com\">@BrazilianLight</a>";
		body += "<br/><br/><b><i>The BrazilianLight Team -</i></b></div>";
		
		var mailOptions = new MailOptions(email,subject,body);
		mailOptions.sendAllEmails();

		var results;
		var queryString = "UPDATE vm2014_predictsingleteam SET points = "
				+ points + " where bet = " + matchresults.bet + " and id = '"
				+ participant.id + "'";
		var query = client.query(queryString);
		query.on("row", function(row, result) {
			result.addRow(row);
		});
		query.on("end", function(result) {
			// console.log(JSON.stringify(result.rows, null, " "));
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
