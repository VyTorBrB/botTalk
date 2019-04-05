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

require('./dialogFlow/menu')(bot, builder)
require('./cardActionConfigs/messageBack.json')
require('./cardShow/_drinksHeroCard')(bot, builder)
require('./cardShow/pizzaHeroCard')(bot, builder)
require('./dialogFlow/checkout')(bot, builder)
require('./dialogFlow/_welcome')(bot)