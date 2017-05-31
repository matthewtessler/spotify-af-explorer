var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	res.render('index', { title: 'Spotify Audio Features Explorer', user:req.user, accessToken:req.accessToken});
});

router.get('/auth/spotify', passport.authenticate('spotify'), 
	function(req,res) {
	// The request will be redirected to spotify for authentication, so this
    // function will not be called.
});

router.get('/auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: '/'}), 
	function(req,res) {
		res.redirect('/');
});

module.exports = router;
