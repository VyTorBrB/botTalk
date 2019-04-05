// const Checkout = require('../dialogFlow/_checkout')
module.exports = class Card {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params
    }

    getCard(bot, builder, params) {
        let configValues = { ...params[0] }
        let cartItem = ''
        // let newCheckout = new Checkout

        bot.dialog(`${configValues.path}`, function (session) {
            var msg = new builder.Message(session);

            const cardItem = (obj) => {
                return (new builder.HeroCard(session)
                    .title(`${obj.title}`)
                    .text(`R$ ${obj.price}`)
                    .images([builder.CardImage.create(session, `${obj.img}`)])
                    .buttons([
                        builder.CardAction.imBack(session, 'Item adicionado!, Voce deseja finalizar ou seguir comprando é só digitar pelo que buscas :)', 'Adicionar ao carrinho')
                    ])
                )
            }
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(
                eval(params.map(obj => cardItem(obj)))
            );
            // configValues.cart.forEach(e => console.log(e))
            
            // checkout.setTotals(cartItem)
            session.send(msg).endDialog()
        }).triggerAction({ matches: configValues.regex });
    }
}