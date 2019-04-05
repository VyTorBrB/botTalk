module.exports = class GetMenu {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params
    }

    getMenu(bot, builder, params) {
        let configValues = { ...params[0] }

        bot.dialog(`${configValues.path}`, function (session) {
            var msg = new builder.Message(session);

            const cardItem = (obj) => {
                return (new builder.HeroCard(session)
                    .buttons([
                        builder.CardAction.postBack(session, `${obj.goto}`, `${obj.title}`)
                    ])
                )
            }
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(
                eval(params.map(obj => cardItem(obj)))
            );
            session.send(msg).endDialog()
        }).triggerAction({ matches: configValues.regex });
    }
}