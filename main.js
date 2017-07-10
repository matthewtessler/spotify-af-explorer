var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(token);

document.getElementById("goBtn").addEventListener("click", searching);
document.getElementById("searchBar").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    searching();
  }
});

function pb(percentage, color, desc) {
  return "<div class='progress' title=" + desc + "><div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:" + percentage.toFixed(0) +  "%;background-color:#" + color + "'> " +  percentage.toFixed(0) + "% " + desc + "</div></div>";
}
function searching(){

  var searchResultsDiv = document.getElementById('searchResultsDiv');
  searchResultsDiv.innerHTML = "";

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
      // display search results of tracks
      console.log(data);

      var tracksList = data.tracks.items;

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
          var bars = [];
          for (var i=0; i < tracksList.length; i++) {
            var danceable = pb(parseFloat(data.audio_features[i].danceability)*100, "65F35B", " &#x1F483 &#x1F57A"); //green
            var acoustic = pb(parseFloat(data.audio_features[i].acousticness)*100, "4222F2", " &#x1F399"); // blue
            var energy = pb(parseFloat(data.audio_features[i].energy)*100, "CEF36D", " &#x26A1"); // yellow / orange
            var instrumental = pb(parseFloat(data.audio_features[i].instrumentalness)*100,"FB483B", " &#x1F3BA"); // red
            var live = pb(parseFloat(data.audio_features[i].liveness)*100, "AC2F95", " &#x1F3A4"); // purple
            var speechy = pb(parseFloat(data.audio_features[i].speechiness)*100, "F39A35", " &#x1F4AC"); // orange
            var attributes = danceable + acoustic + energy + instrumental + live + speechy;
            searchResultsDiv.innerHTML += "<div class='col-lg-3'><div class='panel panel-default'><div class='panel-heading'>" + tracksList[i].name + " <small>Track</small><br>Artist: " + tracksList[i].artists[0].name + "</div><div class='panel-body'>" + attributes + "</div></div></div>";
          }
        }
      });

    }
  });
}
