var Spotify = require('spotify-web-api-js');
var RadialProgressChart = require('radial-progress-chart');
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
      var artistsList = data.artists.items;
      var albumsList = data.albums.items;

      var ids = [];
      tracksList.forEach(function(ele) {
        ids.push(ele.id);
      })

      s.getAudioFeaturesForTracks(ids, function(err,data) {
        if (err) {
          console.error(err);
        }
        else {
          console.log(data);
          for (var i=0; i < tracksList.length; i++) {
            // audio features parsing will go here
            var af = "Danceability: " + data.audio_features[i].danceability;
            af += "<br> Acousticness: " +  data.audio_features[i].acousticness;
            af += "<br> Energy: " + data.audio_features[i].energy;
            af += "<br> Instrumentalness: " + data.audio_features[i].instrumentalness;
            af += "<br> Liveness: " + data.audio_features[i].liveness;
            af += "<br> Loudness: " + data.audio_features[i].loudness;
            af += "<br> Speechiness: " + data.audio_features[i].speechiness;
            searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + tracksList[i].name + " <small>Track</small></div><div class='panel-body'>" + af + "</div></div></div>";
          }

          for (var i=0; i < artistsList.length; i++) {
            searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + artistsList[i].name + " <small>Artist</small></div></div></div>";
            // artists will have an average audio features of all their songs, or something
          };

          for (var i=0; i < albumsList.length; i++){
            searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + albumsList[i].name + " <small>Album</small></div></div></div>";
            // album will have an audio features average for all tracks
          };
        }
      });

    }
  });
}
