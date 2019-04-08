var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(3978, function() {
    console.log('Listening to ', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
    // session.send("Olá... Seja bem vindo!")
});

// cart items REGEX
require('./dialogFlow/cartItems')(bot, builder)
////////////////////////////////////////////////////////////////
require ('./dialogFlow/_checkout')
require('./cardShow/candyHeroCard')(bot, builder)
require('./cardShow/menuHeroCard')(bot, builder)
require('./cardShow/_drinksHeroCard')(bot, builder)
require('./cardShow/pizzaHeroCard')(bot, builder)
require('./dialogFlow/_welcome')(bot)