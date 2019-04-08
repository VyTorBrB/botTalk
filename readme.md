[![npm version](https://badge.fury.io/js/nodemon.svg)](https://badge.fury.io/js/nodemon)

<strong>Setup</strong>
<ol>
<li>Instalar as deps com npm i </li>
<li>Inicializar o server com npm start </li>
<li>depois de executar 1 vez ate o final no Bot Emulator Framework e recomendado que reinicie o servidor atraves do comando "rs" no prompt </li>
</ol>

<br/>
<strong>Inserindo items</strong>
<p>
    1.1- Para inserir um item em uma nova categoria: 
</p>

<ul>
 <li>criar uma estrutura similar as existentes no diretorio ./cardShow e inserir no array [params] um novo {}, como um primeiro item desse array as propriedades (id, title, img, price, path, regex, type[opicional]) e para inserir novos items nessa mesma categoria basta seguir o passo descrito no item 1.2 dessa mesma sessao.</li>
</ul>

<br/>
<p>
    1.2- Para inserir um item em uma categoria ja existente:
</p>

 <ul>
 <li>criar um novo {} no array [params] e passar as propriedades (id, title, price, img)</li>
 </ul>

<strong>Adicionado o item criado ao carrinho</strong>
<p>
    Para adicionar o item criado ao carrinho afim de ser contabilizado o total de uma compra é necessário adicionar o id do item ao array [cartItems]:
</p>

<ul>
<li>Em ./dialogFlow/cartItems.js inserir no array [cartId] um novo {} contendo as propriedades (id, title, price, regex, total = []) referente a cada item criado em ./cardShow</li>
</ul>