// const Checkout = require('../dialogFlow/_checkout')
module.exports = class Card {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params
    }

    getCard(bot, builder, params) {
        let configValues = { ...params[0] }

        bot.dialog(`${configValues.path}`, function (session) {
            var msg = new builder.Message(session);

            const cardItem = (obj) => {
                return (new builder.HeroCard(session)
                    .title(`${obj.title}`)
                    .text(`R$ ${obj.price}`)
                    .images([builder.CardImage.create(session, `${obj.img}`)])
                    .buttons([
                        builder.CardAction.imBack(session, `${obj.title} adicionado!, Voce deseja finalizar ou seguir comprando é só digitar pelo que buscas :)`, 'Adicionar ao carrinho')
                        // !onClick event must add the current obj.price to the configValues.total(configValues.total += obj.price)!
                    ])
                )
            }
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(
                eval(params.map(obj => cardItem(obj)))
            );
            //!in here before end the dialog is where i want to update the configValues.total so i can show it in the -> Checkout module
            session.send(msg).endDialog()
        }).triggerAction({ matches: configValues.regex });
    }
}