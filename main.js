var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token);
// example call to see that it works
s.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function(data) {
    console.log('Artist information', data);
  }, function(err) {
    console.error(err);
  });
