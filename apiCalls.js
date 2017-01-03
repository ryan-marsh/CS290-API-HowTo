'use strict';

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));

var apiVersion = 'api_version=3';
var clientId = 'client_id='; // insert Twitch Client ID here

app.get('/', function(req, res, next){
	var context = {};
	request('https://api.twitch.tv/kraken/games/top?limit=1&' + apiVersion + '&' + clientId, function(err, response, body){
		if(!err && response.statusCode < 400){
			context.viewers = JSON.parse(body).top[0].viewers;
			context.topGame = JSON.parse(body).top[0].game.name;
			request('https://api.twitch.tv/kraken/chat/LIRIK/emoticons?' + apiVersion + '&' + clientId, function(err, response, body){
				if(!err && response.statusCode < 400){
					var emoticons = JSON.parse(body).emoticons;
					var subEmotes = emoticons.filter(function(current){
						return current.subscriber_only === true;
					});
					var firstFive = [];
					for (var i = 0; i < 5; i++){
						firstFive.push(subEmotes[i].regex);
					}
					context.emotes = firstFive;
					request('https://api.twitch.tv/kraken/channels/LIRIK/teams?' + apiVersion + '&' + clientId, function(err, response, body){
						if(!err && response.statusCode < 400){
							context.team = JSON.parse(body).teams[0].display_name;
							res.render('home', context);
						}
						else{
							console.log(err);
							if(response){
								console.log(response.statusCode);
							}
							next(err);
						}
					});
				}
				else{
					console.log(err);
					if(response){
						console.log(response.statusCode);
					}
					next(err);
				}
			});
		}
		else{
      console.log(err);
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
	});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

const PORT = process.env.PORT || 8080;
app.set('port', PORT);
app.listen(PORT, function(){
  console.log(`Express started app on port ${PORT}.`); 
  console.log('Press Ctrl-C to terminate.');
});
