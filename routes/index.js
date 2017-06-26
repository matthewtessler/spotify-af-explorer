var express = require('express')
var router = express.Router();
var request = require('request');
var client_id = process.env.spotify_client_id;
var client_secret = process.env.spotify_client_secret;
var token;

// GET home page
router.get('/', function(req, res, next) {
	// Client credentials flow from Spotify API Developer Guide
	var authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
	    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
	  },
	  form: {
	    grant_type: 'client_credentials'
	  },
	  json: true
	};
	request.post(authOptions, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    token = body.access_token;
			res.render('index', { title: 'Spotify Audio Features Explorer', token: token});
	  }
		else {
			res.render('index', {title: 'Spotify Audio Features Explorer', token: "was not found."});
		}
	});
});

module.exports = router;
