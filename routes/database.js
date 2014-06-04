var pg = require("pg");
var conString = process.env.DATABASE_URL || "pg://alexgolubev:@localhost:5432/vm2014";
var clientConnection = new pg.Client(conString);
clientConnection.connect();
console.log('connection is: '+clientConnection);
exports = clientConnection;

