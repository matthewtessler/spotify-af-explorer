var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token);

document.getElementById("goBtn").addEventListener("click", searching);
document.getElementById("searchBar").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    searching();
  }
});

function searching(){
  var searchResultsDiv = document.getElementById('searchResultsDiv');
  searchResultsDiv.innerHTML = "";

  // get the search query and send to spotify api search endpoint
  var query = document.getElementById("searchBar").value;
  s.search(query, ["album", "artist", "track"], function(err,data) {
    if (err) {
      console.error(err);
    }
    else {
      // display search results of tracks, artists, albums
      console.log(data);

      var tracksList = data.tracks.items;
      tracksList.forEach(function(ele){
        searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + ele.name + " <small>Track</small></span></div></div></div>";
      });

      var artistsList = data.artists.items;
      artistsList.forEach(function(ele){
        searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + ele.name + " <small>Artist</small></div></div></div>";
      });

      var albumsList = data.albums.items;
      albumsList.forEach(function(ele){
        searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + ele.name + " <small>Album</small></div></div></div>";
      });
    }
  });
}
