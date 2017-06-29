var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token);

function searching(){
  // disable search button for now so function won't run again unless new search
  var searchButton = document.getElementById('searchButton');
  searchButton.disabled = true;

  // get the search query and send to spotify api search endpoint
  var query = document.getElementById("searchBar").value;
  s.search(query, ["album", "artist", "track"], function(err,data) {
    if (err) {
      console.error(err);
    }
    else {
      // display search results of tracks, artists, albums

      // tracks div will hold tracks results
      var tracks = document.createElement('div');
      tracks.id = "tracksDiv";
      tracks.innerHTML = '<h2>Tracks</h2>';
      var tracksList = data.tracks.items;
      tracksList.forEach(function(ele){
        tracks.innerHTML += "<p>" + ele.name + "</p>";
      });

      // artists div will hold artists results
      var artists = document.createElement('div');
      artists.id = "artistsDiv";
      artists.innerHTML = '<h2>Artists</h2>';
      var artistsList = data.artists.items;
      artistsList.forEach(function(ele){
        artists.innerHTML += "<p>" + ele.name + "</p>";
      });

      // albums div will hold album results
      var albums = document.createElement('div');
      albums.id = "albumsDiv";
      albums.innerHTML = '<h2>Albums</h2>';
      var albumsList = data.albums.items;
      albumsList.forEach(function(ele){
        albums.innerHTML += "<p>" + ele.name + "</p>";
      });

      // find the search results div and append all the results to it
      var searchResultsDiv = document.getElementById('searchResultsDiv');
      searchResultsDiv.appendChild(tracks);
      searchResultsDiv.appendChild(artists);
      searchResultsDiv.appendChild(albums);
    }
  });
}

document.getElementById("searchButton").addEventListener("click", searching);
