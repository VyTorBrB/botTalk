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
        },
        {
            id: 'sc03',
            title: 'Suco dell valle - Morango',
            price: 8.33,
            regex: /^(sc03|SC03)/i,
            total: []
        },
        {
            id: 'sc04',
            title: 'Suco dell valle - Pessego',
            price: 5.00,
            regex: /^(sc04|SC04)/i,
            total: []
        },
        {
            id: 'sc05',
            title: 'Suco dell valle - Limao',
            price: 10.90,
            regex: /^(sc05|SC05)/i,
            total: []
        },
        {
            id: 'pz01',
            title: 'Pizza Calabresa',
            price: 25.00,
            regex: /^(pz01|PZ01)/i,
            total: []
        },
        {
            id: 'pz02',
            title: 'Pizza Vegetariana',
            price: 30.00,
            regex: /^(pz02|PZ02)/i,
            total: []
        },
        {
            id: 'pz03',
            title: 'Pizza Gourmet',
            price: 5.00,
            regex: /^(pz03|PZ03)/i,
            total: []
        },
        {
            id: 'pz04',
            title: 'Pizza 3 queijos',
            price: 15.00,
            regex: /^(pz04|PZ04)/i,
            total: []
        },
        {
            id: 'pz05',
            title: 'Pizza Pao com Ovo',
            price: 90,
            regex: /^(pz05|PZ05)/i,
            total: []
        },
        {
            id: 'cd01',
            title: 'Doce-de-leite',
            price: 4.00,
            regex: /^(cd01|CD01)/i,
            total: []
        },
        {
            id: 'cd02',
            title: 'Algodao',
            price: 4.00,
            regex: /^(cd02|CD02)/i,
            total: []
        },
        {
            id: 'cd03',
            title: 'Manteiga de amendoim',
            price: 10.00,
            regex: /^(cd03|CD03)/i,
            total: []
        }
    ]
    const createRoutes = cartId => {
        cartId.map((obj, i , arr) => {
            // if (!obj.total) {
            //     obj.total.reduce(i => i += i)
            // }
            const newtotal = new total
            newtotal.getTotals(bot, builder, obj, arr)
        })
    }
    createRoutes(cartId)
}