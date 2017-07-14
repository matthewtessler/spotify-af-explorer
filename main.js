var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token); // setting access token for api calls, brought from server

// event listeners for go button click and enter button click
document.getElementById("goBtn").addEventListener("click", searching);
document.getElementById("searchBar").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    searching();
  }
});

// helper function builds a progress bar
function pb(percentage, color, desc) {
  return "<div class='progress' title=" + desc + "><div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:" + percentage.toFixed(0) +  "%;background-color:#" + color + "'> " +  percentage.toFixed(0) + "% " + desc + "</div></div>";
}
function searching(){

  // getting the search results div to add the results to later
  var searchResultsDiv = document.getElementById('searchResultsDiv');
  searchResultsDiv.innerHTML = "<div class='row' id='one'></div><div class='row' id='two'></div><div class='row' id='three'></div><div class='row' id='four'></div><div class='row' id='five'></div>";

  var keyDiv = document.getElementById('key');
  keyDiv.innerHTML = "<span class='glyphicon glyphicon-stop' style='color:#65F35B' aria-hidden='true'></span> danceability ";
  keyDiv.innerHTML += "<span class='glyphicon glyphicon-stop' style='color:#4222F2' aria-hidden='true'></span> acousticness ";
  keyDiv.innerHTML += "<span class='glyphicon glyphicon-stop' style='color:#CEF36D' aria-hidden='true'></span> energetic ";
  keyDiv.innerHTML += "<span class='glyphicon glyphicon-stop' style='color:#FB483B' aria-hidden='true'></span> instrumental ";
  keyDiv.innerHTML += "<span class='glyphicon glyphicon-stop' style='color:#AC2F95' aria-hidden='true'></span> liveness ";
  keyDiv.innerHTML += "<span class='glyphicon glyphicon-stop' style='color:#F39A35' aria-hidden='true'></span> speechiness ";

  // get the search query and send to spotify api search endpoint
  var query = document.getElementById("searchBar").value;
  s.search(query, ["track"], function(err,data) {
    if (err) {
      console.error(err);
    }
    else {
      // display search results of tracks on console
      console.log(data);

      // grabbing the track ids to use for the audio features api call
      var tracksList = data.tracks.items;
      var ids = [];
      tracksList.forEach(function(ele) {
        ids.push(ele.id);
      })

      s.getAudioFeaturesForTracks(ids, function(err,data) {
        // if the data shows up, display it
        if (err) {
          console.error(err);
          searchResultsDiv.innerHTML = "<p>Could not fetch audio features. Refresh the page and try again, please.</p>";
        }
        else {
          console.log(data);
          var bars = [];
          for (var i=0; i < tracksList.length; i++) {
            if (i < 4) {
              div = document.getElementById("one");
              console.log(i);
            }
            else if (i > 3 && i < 8) {
              div = document.getElementById("two");
              console.log(i);
            }
            else if (i > 7 && i < 12) {
              div = document.getElementById("three");
              console.log(i);
            }
            else if (i > 11 && i < 16) {
              div = document.getElementById("four");
              console.log(i);
            }
            else {
              console.log(i);
              div = document.getElementById("five");
            }
            var danceable = pb(parseFloat(data.audio_features[i].danceability)*100, "65F35B", " &#x1F483 &#x1F57A"); //green
            var acoustic = pb(parseFloat(data.audio_features[i].acousticness)*100, "4222F2", " &#x1F399"); // blue
            var energy = pb(parseFloat(data.audio_features[i].energy)*100, "CEF36D", " &#x26A1"); // yellow / orange
            var instrumental = pb(parseFloat(data.audio_features[i].instrumentalness)*100,"FB483B", " &#x1F3BA"); // red
            var live = pb(parseFloat(data.audio_features[i].liveness)*100, "AC2F95", " &#x1F3A4"); // purple
            var speechy = pb(parseFloat(data.audio_features[i].speechiness)*100, "F39A35", " &#x1F4AC"); // orange
            var attributes = danceable + acoustic + energy + instrumental + live + speechy;
            // check if album image exists before the tag is created for it
            if (tracksList[i].album.images[0].url) {
              var artwork = "<img src='" + tracksList[i].album.images[0].url + "'>";
            }
            else {
              var artwork = "";
            }
            // check if the preview exists before building a link for it
            if (tracksList[i].preview_url) {
              var preview_link = " <a href='" + tracksList[i].preview_url + "' target='_blank'><span class='glyphicon glyphicon-music' aria-hidden='true'></span></a>";
              div.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'><div class='row'><div class='col-lg-9'>" + tracksList[i].name + " <a href='" + tracksList[i].external_urls.spotify +"' target='_blank'><span class='glyphicon glyphicon-new-window' aria-hidden='true'></span></a>" + preview_link + "<br>Artist: " + tracksList[i].artists[0].name + "</div><div class='col-lg-3'>" + artwork + "</div></div></div><div class='panel-body'>" + attributes + "</div></div>";
            }
            else {
              div.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'><div class='row'><div class='col-lg-9'>" + tracksList[i].name + " <a href='" + tracksList[i].external_urls.spotify + "' target='_blank'><span class='glyphicon glyphicon-new-window' aria-hidden='true'></span></a><br>Artist: " + tracksList[i].artists[0].name + "</div><div class='col-lg-3'>" + artwork + "</div></row></div></div><div class='panel-body'>" + attributes + "</div></div>";

            }
          }
        }
      });
    }
  });
}
