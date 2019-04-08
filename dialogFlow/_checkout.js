module.exports = function checkout(bot, builder, cartId, arr) {
    let total = cartId.total.reduce((i) => i += i) // total de cada item
    // let selectedTotal = arr.map(obj => obj.total) // seleciona todas as propriedades total: [] de cada obj
    // let totals = selectedTotal.map(i => {
    //     if (!i) { return i.reduce(i => i += i) }
    // }).reduce(i => i += i) tentativa de somar valores de cartID`s diferentes - !Not Working!
    const state = {
        nome: "",
        endereco: "",
        pagamento: "",
        total: total
    }

    bot.dialog(`/checkout`, [
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
                cartId.total.forEach((i) => i = 0)
                session.endDialog('Concluido!')
            } else if (info == 'rever' || info == 'REVER') {
                session.beginDialog('*:/checkout')
            }
        }
    ]
    )
}