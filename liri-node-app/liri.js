// fs allows node to read and write files
var fs = require("fs");

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var r = require('rotten-api')("YOU_API_KEY");
var userCommand = process.argv[2];
var userInput = process.argv[3];

//write the code you need to grab the data from keys.js. Then store the keys in a variable
var consumerKey=(keys.twitterKeys.consumer_key);
var privateKey=(keys.twitterKeys.consumer_secret);
var accessTokenKey = (keys.twitterKeys.access_token_key);
var privateTokenKey = (keys.twitterKeys.access_token_secret);

//Make it so liri.js can take in one of the following commands:
if (userCommand === undefined || 'liri')
    {
	console.log("available commands in liri.js:\nmy tweets\nspotify this song\nmovie this\n");
}

// my-tweets
if (userCommand === "my-tweets" ) 
    {
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: privateKey,
  access_token_key: accessTokenKey ,
  access_token_secret: privateTokenKey
});
client.get('statuses/user_timeline', { screen_name: 'karinjkarin', count: 10}, function(error, tweets, response) {
    for (i= 0; i<tweets.length; i++)
    {
        console.log("================");
        console.log(tweets[i].text);
        console.log("================");
    }
});
    }
    // spotify-this-song
else if(userCommand === 'spotify-this-song')
    {
            if (userInput=== undefined)
            { userInput = '"The Sign" by Ace of Base'};
        spotify.search({ type: 'track', query: userInput}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else{
    console.log("================");
    console.log( "Artist is " + data.tracks.items[0].artists[0].name);
    console.log("================");
    console.log( "Song is " + data.tracks.items[0].name);
    console.log("================");
    console.log( "Preview is " + data.tracks.items[0].preview_url);
    console.log("================");
    console.log( "Album is " + data.tracks.items[0].album.name);
    }
});
    }
    // movie-this
else if (userCommand === "movie-this")
    {
        if (userInput === undefined)
            {userInput = "Mr.Nobody"};
    request("http://www.omdbapi.com/?t=" + userInput, function (error, response, body) {
    	//title
    console.log("Title: " + JSON.parse(body).Title);
//year
console.log("Released: " + JSON.parse(body).Released);
//imdb rating
console.log("Rating: " + JSON.parse(body).Ratings[0].Source);
//country
console.log("Country: " + JSON.parse(body).Country);
//language
console.log("Language: " + JSON.parse(body).Language);
//plot
console.log("Plot: " + JSON.parse(body).Plot);
//actors
console.log("Actors: " + JSON.parse(body).Actors); 
//imdb for rotten tomatoes search
// var imdbID = JSON.parse(body).imdbID;
// console.log(imdbID);

 
//   // * Rotten Tomatoes Rating.
//   r.alias(imdbID, function (err, res) {
//   	if (!err) {
//         var movie = res || {};
//         console.log(movie);
//     }
//     // * Rotten Tomatoes URL 
//   console.log("Rotten Tomatoes URL: " + "https://www.rottentomatoes.com/")
//     })   
 


 });


         
}else if(userCommand === "do-what-it-says")
    fs.readFile("random.txt", "utf8", function(error, data) {
 
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
userCommand = dataArr[0];
userInput = dataArr[1];
  // We will then re-display the content as an array for later use.
  console.log(userCommand + " " +userInput);

spotify.search({ type: "track", query: userInput}, function(error, data) {
           if (error) {
               console.log('Error occurred: ' + error);
               return;
           } else {
               console.log("======== SONG: " + data.tracks.items[0].name + " ========");
               console.log("Artist: " + data.tracks.items[0].artists[0].name);
               console.log("Album: " + data.tracks.items[0].album.name);
               console.log("======== PREVIEW LINK ========");
               console.log("Preview: " + data.tracks.items[0].preview_url);
               console.log("==================");
           }
       });


});