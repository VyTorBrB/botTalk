module.exports = class checkout {

    constructor(bot, builder, cartId) {
        this.bot = bot,
            this.builder = builder,
            this.cartId = cartId
    }

    getCheckout(bot, builder, cartId) {
        let total = cartId.total.map((i) => i += i)
        let state = {
            nome: "",
            endereco: "",
            pagamento: "",
            total: total
        }

        bot.dialog('/checkout', [
            (session) => {
                builder.Prompts.text(session, 'Ok, antes de enviar precisarei do seu Nome:')
            },
            (session, results) => {
                state.nome = results.response
                builder.Prompts.text(session, `Certo ${state.nome} poderia informar seu endereco: `)
            },
            (session, results) => {
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
        )//.triggerAction({ matches: /^(finalizar|checar|encerrar|confirmar pedido|terminar)/i })
    }
}