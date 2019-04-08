const total = require('../../constructors/totalConstructor')
// const params = require('../../cardShow/_drinksHeroCard')
module.exports = function (bot, builder) {

    const cartId = {
        id: 'sc01',
        title: 'Suco Dell Valle - Laranja',
        price: 8.00,
        total: [],
        regex: /^(sc01|SC01)/i
    }

    const newtotal = new total
    newtotal.getTotals(bot, builder, cartId)
}