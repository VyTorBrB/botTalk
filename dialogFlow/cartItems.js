const total = require('../constructors/totalConstructor')
module.exports = function (bot, builder) {
    
    // cria os paths para cada item no menu
    const cartId = [
        {
            id: 'sc01',
            title: 'Suco Dell Valle - Laranja',
            price: 7.5,
            regex: /^(sc01|SC01)/i,
            total: []
        },
        {
            id: 'sc02',
            title: 'Suco Dell Valle - Uva',
            price: 7.00,
            regex: /^(sc02|SC02)/i,
            total: []
        }
    ]
    const createRoutes = cartId => {
        cartId.map(obj => {
            // if (!obj.total) {
            //     obj.total.reduce(i => i += i)
            // }
            const newtotal = new total
            newtotal.getTotals(bot, builder, obj)
        })
    }
    createRoutes(cartId)
}