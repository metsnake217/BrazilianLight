var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
	service : "Gmail",
	auth : {
		user : "brazilianlight2014@gmail.com",
		pass : "alexamergna"
	}
});

// setup e-mail data with unicode symbols
var MailOptions = function(to, subject, body) {
	this.from = "BrazilianLight <brazilianlight2014@gmail.com>";
	this.to = to;
	this.subject = subject;
	this.body = body;
}

MailOptions.prototype.sendAllEmails = function() {
	// send mail with defined transport object
	console.log("call send all emails " + this.to);
	var mailOptions = {
		from : this.from,
		to : this.to,
		subject : this.subject,
		html : this.body
	}
	smtpTransport.sendMail(mailOptions, function(error, response) {
		console.log("sent");
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}

		// if you don't want to use this transport object anymore, uncomment
		// following line
		smtpTransport.close(); // shut down the connection pool, no more
								// messages
	});
};

exports.MailOptions = MailOptions;
