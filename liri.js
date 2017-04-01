var Twitter = require("twitter");
var Spotify = require("spotify");
var Request = require("request");
var fs = require("fs");

var keys = require("./keys");

var command = process.argv[2];
var input = process.argv[3];

if (command === "my-tweets") {
    twitter();
} else if (command === "spotify-this-song") {
    spotify();
} else if (command === "movie-this") {
    movies();
} else if (command === "do-what-it-says") {
    random();
} else {
    console.log("Please use a valid command line argument: my-tweets, spotify-this-song, movie-this, do-what-it-says")
}

function twitter() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    })

    client.get("statuses/user_timeline", {screen_name: "vyvanze_", count: 20}, function(error, tweets, response) {
        if (error) throw error;
        for (var i = 0; i < 20; i++) {
            console.log(tweets[i].created_at + " " + tweets[i].text);   
        }

    });
}

function spotify() {
    if (input) {
        Spotify.search({ type: 'track', query: input }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    } else {
        Spotify.search({ type: 'track', query: "artist:Ace of Base&track:The Sign" }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }
}

function movies() {
    if (input) {
        Request('http://www.omdbapi.com/?t=' + input, function (error, response, body) {
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title);
            console.log("Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Country of Origin: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Rotten TOmatoes URL: ");
        });
    } else {
        Request('http://www.omdbapi.com/?t=Mr.+Nobody', function (error, response, body) {
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title);
            console.log("Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Country of Origin: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Rotten TOmatoes URL: ");
        });
    }
}

function random() {
    fs.readFile('random.txt', 'utf-8',function(err, data) {
        console.log(data);
        var commandArray = data.split(",");
        command = commandArray[0];
        input = commandArray[1];

        if (command === "my-tweets") {
            twitter();
        } else if (command === "spotify-this-song") {
            spotify();
        } else if (command === "movie-this") {
            movies();
        } else if (command === "do-what-it-says") {
            random();
        } else {
            console.log("Please use a valid command line argument: my-tweets, spotify-this-song, movie-this, do-what-it-says")
        }
    });
}