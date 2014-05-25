var pg = require("pg");
var conString = "pg://postgres:@localhost:5432/vm2014";
var client = new pg.Client(conString);

var id = 'mkon', password = 'netlight-111';

NetlighterFinder = function() {
	client.connect();
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
		console.log(JSON.stringify(result.rows, null, "    "));
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
		console.log(JSON.stringify(result.rows, null, "    "));
		callback(null, results);
	});
	// return false;
};

exports.NetlighterFinder = NetlighterFinder;