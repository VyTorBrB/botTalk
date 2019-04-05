//using function.Array as args
module.exports = class getIntent {
    constructor(bot, builder, params) {
        this.bot = bot,
            this.builder = builder,
            this.params = params,
            this.setTotals
    }

    setTotals(total) {
        let configValues = { ...params }
        configValues.cart += total
    }
    setCheckout(bot, builder, params) {
        let state = {
            nome: "",
            endereco: "",
            pagamento: "",
            total: params.total
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
                    JSON.stringify(state),
                    // configValues.cart
                    // configValues.cart.map(item => JSON.parse(item))
                )
                session.send('A informacao esta correta?')
                builder.Prompts.text(session, `! Se a informacao estiver errada digite: REVER `)
            },
            (session, results) => {
                let info = results.response
            }
        ]
        ).triggerAction({ matches: /^(finalizar|checar|encerrar|confirmar pedido|terminar)/i })
    }
}