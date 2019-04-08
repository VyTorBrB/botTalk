module.exports = class Card {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params
    }
    // construtor do card
    getCard(bot, builder, params) {
        // captura valores da configuracao inicial contidos na primeira posicao do array `params`
        let configValues = { ...params[0] }
        // inicia o dialogo
        bot.dialog(`${configValues.path}`, function (session) {
            var msg = new builder.Message(session);

            const cardItem = (obj) => {
                return (new builder.HeroCard(session)
                    .title(`${obj.title}`)
                    .text(`R$ ${obj.price}`)
                    .images([builder.CardImage.create(session, `${obj.img}`)])
                    .buttons([
                        builder.CardAction.postBack(session, `${obj.id}`, 'Adicionar ao carrinho')
                    ])
                )
            }
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(
                // executa o codigo JS contido dentro da propria chamada de eval()
                eval(params.map(obj => cardItem(obj)))
                );
            session.send(msg).endDialog()
        }).triggerAction({ matches: configValues.regex });
    }
}