const GetMenu = require('../constructors/menuConstructor')
module.exports = function showMenu(bot, builder) {
    const params = [
        {
            type: 'Cardapio',
            path: '/menu',
            regex: /^(cardapio|menu)/i,
            title: 'Pizzas',
            goto: 'pizza'
        },
        {
            title: 'Bebidas',
            goto: 'suco'
        },
        {
            title: 'Doces',
            goto: 'doce'
        }
    ]
    const novoMenu = new GetMenu
    novoMenu.getMenu(bot, builder, params)
}