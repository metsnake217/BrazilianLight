var express = require('express');
var router = express.Router();
var MatchFinder = require('./matchfinder').MatchFinder;
var matchFinder = new MatchFinder();

router.get('/', function(req, res){
	console.log('in get all');
matchFinder.getMatchOfTheDay(function(error, match){
	console.log('in results '+match);
    res.render('index', {
          title: 'Dagens Match',
          matches: match,
          scripts: ['/javascripts/utils.js', '/bootstrap-select/bootstrap-select.js']
      });
});
});

router.get('/news', function(req, res){
	console.log('in get news');
matchFinder.getMatchOfTheDay(function(error, match){
	console.log('in results '+match);
    res.render('index', {
          title: 'Dagens Match',
          matches: match,
          scripts: ['/javascripts/utils.js', '/bootstrap-select/bootstrap-select.js']
      });
});
});


module.exports = router;
