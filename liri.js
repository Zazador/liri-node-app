var Twitter = require("twitter");
var Spotify = require("spotify");
var Request = require("request");

var keys = require("./keys");

var command = process.argv[2];

if (command === "my-tweets") {
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