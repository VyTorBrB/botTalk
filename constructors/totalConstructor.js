const checkout = require('../dialogFlow/checkout')
module.exports = class Total {
    constructor(bot, builder, cartID) {
        this.bot = bot,
            this.builder = builder,
            this.cartID = cartID
    }

    getTotals(bot, builder, cartID) {
        // cria o dialogo para finalizar ou continar comprando
        const newCheckout = new checkout
        bot.dialog(`/${cartID.id}`,
            [
                function (session) {
                    builder.Prompts.text(session, `${cartID.title} adicionado!, Voce deseja finalizar ou seguir comprando é só digitar pelo que buscas :)`)
                },
                function (session, results) {
                    if (results.response == 'finalizar' || results.response == 'FINALIZAR') {
                        cartID.total.push(cartID.price)
                        newCheckout.getCheckout(bot, builder, cartID)
                        return session.beginDialog('*:/checkout')
                    } else {
                        return session.endDialog()
                    }
                }
            ]
        ).triggerAction({ matches: cartID.regex })
    }
}