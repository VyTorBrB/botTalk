module.exports = class Card {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params
    }

    getTotal(params) {
        let configValues = { ...params[0] }
        return configValues.total
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
                        builder.CardAction.imBack(session, `${obj.total += obj.price} Item adicionado!, Voce deseja finalizar ou seguir comprando é só digitar pelo que buscas :)`, 'Adicionar ao carrinho')
                    ])
                )
            }
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(
                eval(params.map(obj => cardItem(obj)))
            );
            this.getTotal(params)
            session.send(msg).endDialog()
        }).triggerAction({ matches: configValues.regex });
    }

    getCheckout(bot, builder, params) {
        let state = {
            nome: "",
            endereco: "",
            pagamento: "",
            // total: newContext.getTotal()
        }
    
        bot.dialog('/intent', [
            function (session) {
                builder.Prompts.text(session, 'Ok, antes de enviar precisarei do seu Nome:')
                console.log('!!!' + params)
            },
            function (session, results) {
                state.nome = results.response
                builder.Prompts.text(session, `Certo ${state.nome} poderia informar seu endereco: `)
            },
            function (session, results) {
                state.endereco = results.response
                builder.Prompts.text(session, `Como sera o pagamento? Sr. ${state.nome}`)
            },
            (session, results) => {
                state.pagamento = results.response
                session.send(
                    JSON.stringify(state)
                )
                session.send('A informacao esta correta?')
                builder.Prompts.text(session, `! Se a informacao estiver errada digite: REVER `)
            },
            (session, results) => {
                let info = results.response
                if (info == 'sim' || info == 'SIM') {
                    session.endDialog('Concluido!')
                } else if (info == 'rever' || info == 'REVER') {
                    session.beginDialog('*:/intent')
                }
            }
        ]
        ).triggerAction({ matches: /^(finalizar|checar|encerrar|confirmar pedido|terminar)/i })
    }
}