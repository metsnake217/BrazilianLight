var pg = require("pg");
var conString = process.env.DATABASE_URL || "pg://alexgolubev:@localhost:5432/vm2014";
var client = new pg.Client(conString);

var crypt = require('bcrypt-nodejs');
var salt = crypt.genSaltSync(1);

NetlighterFinder = function() {
	client.connect();
};

Netlighter = function(username, password) {
	console.log('building a netlighter')
	this.username = username;
	this.password = password;

};

NetlighterFinder.prototype.getNetlighter = function(callback) {
	var results;
	console.log("finding netlighter");
	var query = client.query("SELECT * FROM vm2014_users where id='" + id
			+ "' and password='" + password + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		//console.log(JSON.stringify(result.rows, null, "    "));
		results = result.rows;
		callback(null, results);
	});
};

NetlighterFinder.prototype.test = function(callback) {
	var results;
	console.log("testing " + username + " - " + callback.pass);
	var query = client.query("SELECT * FROM vm2014_users where id='"
			+ this.username + "'"/* and password='"+password+"'" */);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		//console.log(JSON.stringify(result.rows, null, "    "));
		callback(null, results);
	});
	// return false;
};

Netlighter.prototype.login = function(callback) {
	console.log(this.username + "," + this.password);
	var password = this.password;

	var results;
	var query = client.query("SELECT * FROM vm2014_users where id='"
			+ this.username + "'"/* and password='"+password+"'" */);
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		//console.log(JSON.stringify(result.rows, null, "    "));
		results = result.rows;
		var pass = results[0].password;
		var active = results[0].active;
		console.log('pass is: '+pass);
		console.log('pass0 is: '+password);
		//var hash = crypt.hashSync(pass, salt);
		if(active == 1){
		var c = crypt.compareSync(password, pass);
		console.log('password: ' + pass + ' comparison: ' + c);
		if (c) {
			callback(null, results);
		} else {
			callback(null, null);
		}
		} else {
			callback(null, results);
		}
	});
};

Netlighter.prototype.changepassword = function(callback) {
	console.log(this.username + "," + this.password);

	var hash = crypt.hashSync(this.password);
	console.log("hashed password '" + this.password + "' is: " + hash);

	var results;
	var query = client.query("UPDATE vm2014_users SET password='" + hash
			+ "', active=1 where id='" + id + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		//console.log(JSON.stringify(result.rows, null, "    "));
		results = result.rows;
		callback(null, results);
	});
};

exports.NetlighterFinder = NetlighterFinder;
exports.Netlighter = Netlighter;





MatchResults = function(scoretyp, scorehemma, bet) {
	this.scoretyp = scoretyp;
	this.scorehemma = scorehemma;
	this.bet = bet;
	this.winner = 'none';
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
	var results;
	var scoretyp = this.scoretyp;
	var scorehemma =  this.scorehemma;
	var bet = this.bet;
	
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

		var team;
		if (scoretyp == scorehemma)
			team = 'none';
		else if (scoretyp > scorehemma)
			team = results[0].typ;
		else
			team = results[0].hemma;
		this.winner = team;

		analyze(this, results);

		callback(null, results)
	});
};

var analyze = function(matchresults, participantsResults) {
	for (var i = 0; i < participantsResults; i++) {
		var participant = participantsResults[i];
		var points;
		var matchmargin = matchresults.scoretyp - matchresults.scorehemma;
		var participantmargin = participant.scoretyp - participant.scorehemma;
		if (participant.predictedteam != matchresults.winner) {
			points = 0;
		} else if (participant.scoretyp == matchresults.scoretyp
				&& participant.scorehemma == matchresults.scorehemma
				&& matchresults.winner != 'none') {
			points = 6;
		} else if (participant.predictedTeam == matchresults.winner
				&& matchmargin == participantmargin) {
			points = 4;
		} else if (participant.predictedTeam == matchresults.winner) {
			points = 3;
		}

		console.log("Participant " + participant.id + " : " + points);

	}
}
