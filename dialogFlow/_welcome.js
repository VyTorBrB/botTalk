module.exports = function (bot) {
    bot.dialog('/welcome', (session, results) => {
        session.send('Pizzaria 2 sabores Bem Vindo!')
        session.send('Em que posso ajudalo?')
    }).triggerAction({ matches: /^(oi|ola|tudo bem|como vai|como esta)/i })
}