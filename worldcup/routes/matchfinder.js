var pg = require("pg");
var conString = "pg://postgres:@localhost:5432/vm2014";
var client = new pg.Client(conString);
var now = '2014-06-13'// new Date

MatchFinder = function() {
	client.connect();
};

MatchFinder.prototype.getMatchOfTheDay = function(callback) {
	var results
	var query = client
			.query("SELECT * FROM vm2014_match where date_trunc('day',datum)='"
					+ now + "'");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		console.log(JSON.stringify(result.rows, null, "    "));
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
		console.log(JSON.stringify(result.rows, null, "    "));
		results = result.rows;
		callback(null, results)
	});
};

MatchFinder.prototype.getBonuses = function(callback) {
	var results;
	var query = client
			.query("SELECT * FROM vm2014_extra where date_trunc('day',datumFrom) <= to_timestamp('"
					+ now
					+ "', 'YYYY-MM-DD') and date_trunc('day',datumTo) >= to_timestamp('"
					+ now + "', 'YYYY-MM-DD')");
	query.on("row", function(row, result) {
		result.addRow(row);
	});
	query.on("end", function(result) {
		console.log(JSON.stringify(result.rows, null, "    "));
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
		console.log(JSON.stringify(result.rows, null, "    "));
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
		console.log(JSON.stringify(result.rows, null, "    "));
		results = result.rows;
		callback(null, results)
	});
};
exports.MatchFinder = MatchFinder;