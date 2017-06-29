var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token);

function searching(){
  var query = document.getElementById("searchBar").value;
  s.search(query, ["album", "artist", "track"], function(err,data) {
    if (err) {
      console.error(err);
    }
    else {
      console.log(data);
    }
  });
}

document.getElementById("searchButton").addEventListener("click", searching);
