var LocalStrategy = require('passport-local').Strategy;
var PassportLocalStrategy = require('passport-local').Strategy;
var NetlighterFinder = require('./netlighterfinder').NetlighterFinder;
var User = app.get('models').User;

module.exports = function(passport) {
	
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

	passport.serializeUser(function(user, done) {
		console.log("serializing");
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		// query the current user from database
		console.log("deserializing");
		User.find(id).success(function(user) {
			done(null, user);
		}).error(function(err) {
			done(new Error('User ' + id + ' does not exist'));
		});
	});
	passport.use(new LocalStrategy({
		// set the field name here
		usernameField : 'username',
		passwordField : 'password'
	}, function(username, password, done) {
		/* get the username and password from the input arguments of the function */

		// query the user from the database
		// don't care the way I query from database, you can use
		// any method to query the user from database
		User.find({
			where : {
				username : username
			}
		}).success(function(user) {
			console.log('username ' + username);
			if (!user)
				// if the user is not exist
				return done(null, false, {
					message : "The user does not exist"
				});
			else if (!hashing.compare(password, user.password))
				// if password does not match
				return done(null, false, {
					message : "Wrong password"
				});
			else
				// if everything is OK, return null as the error
				// and the authenticated user
				return done(null, user);

		}).error(function(err) {
			// if command executed with error
			return done(err);
		});
	}));
};
	