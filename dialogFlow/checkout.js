//using function.Array as args
module.exports = function getIntent(bot, builder, params) {

    // let configValues = { ...params[0] }
    let state = {
        nome: "",
        endereco: "",
        pagamento: "",
        // total: configValues.total // this is the value to be read
    }
    
    bot.dialog('/intent', [
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
    ).triggerAction({ matches: /^(finalizar|checar|encerrar|confirmar pedido|terminar)/i })
}