//função construtora de objetos Produto
var Produto = function(id, nome, categoria, img, valorUnitario){
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.foto = img;
    this.valorUnitario = valorUnitario;
}

const pesquisaPorId = (vetor, objId) => vetor.find(item => item.id === objId);
const pesquisaPorNome = (vetor, objNome) => vetor.find(item => item.nome === objNome);

// carregamento de cardápio de exemplo
var cardapio = [new Produto(1, "Capuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/capuccino.png",7)
			, new Produto(2, "Espresso", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/espresso.png",4)
			, new Produto(3, "Frapuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/frapuccino.png",8)
			, new Produto(4, "Chococcino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chococcino.png",7)
			, new Produto(5, "Chocolate Quente", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chocolate_quente.png",10)
			, new Produto(6, "Frapê", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/frape.png",12)
			, new Produto(7, "Suco de Laranja", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/suco_laranja.png",10)
            , new Produto(8, "Açaí", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/acai.png",12)
            , new Produto(9, "Bolo de Laranja", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/bolo_laranja.png",8)];
		

const carregarCardapio = lista => {
    const listaObj = document.querySelector("#cardapio")
    lista.forEach(produto => {
        listaObj.innerHTML += `<li><figure>
                                    <img src="${produto.foto}" alt="${produto.nome}">
                                    <figcaption>
                                        ${produto.nome} - <strong>R$ ${produto.valorUnitario}</strong>
                                    </figcaption>
                                    </figure>
                                </li>`
    }); 
}

const geraPedidoLi = (foto, nome, valorPedido) =>{
    return `<li>
                <figure>
                    <img src="${foto}" alt="${nome}">
                    <figcaption>
                    ${nome} - <strong>R$ ${valorPedido}</strong>
                    </figcaption>
                </figure>
            </li>`
}

carregarCardapio(cardapio)
let carrinho = [];

const gerarCarrinho = (produtoNome, produtoPreco, foto) =>{
    let el = (pesquisaPorNome(carrinho, produtoNome));
    if(el == undefined){
        carrinho.push({
            nome: `${produtoNome}`,
            preco: produtoPreco,
            qtdProduto: 1,
            foto: foto
        });
    }
    else{
        el.qtdProduto += 1;
    }
}

const pedidosUl = document.querySelector("#pedidos");
const valorTotal = document.querySelector("#valorTotal");


function salvaTotal (total){
    localStorage.setItem('total', total);
}

const calculaTotal = (carrinho) =>{
    let total = 0;
    carrinho.forEach((el) => {
        total += (el.preco * el.qtdProduto);
    });
    salvaTotal(total);
    return total;
}

function carregaTotal (){
    valorTotal.textContent = `Total - R$ ${JSON.parse(localStorage.getItem('total'))}`;
}

const salvaPedidos = (pedidos) => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}
const carregaPedidos = () =>{
    pedidosUl.innerHTML = '';
    let pedidos = JSON.parse(localStorage.getItem('pedidos'));
    pedidos.forEach((el)=>{
        pedidosUl.innerHTML += geraPedidoLi(el.foto, el. nome, (el.preco * el.qtdProduto));
    })
    carregaTotal();
}

document.querySelector("#cardapio").addEventListener("click", (event) => {
    let produtoSelecionado = event.target.parentNode.lastChild.previousSibling;
    let produtoNome = produtoSelecionado.textContent.split('-', 1);
    let produtoPreco = produtoSelecionado.textContent.split('- R$');
    
    produtoNome = produtoNome[0].trim();
    produtoPreco = produtoPreco[1].trim();
    let foto = pesquisaPorNome(cardapio, produtoNome).foto;
    gerarCarrinho(produtoNome, parseFloat(produtoPreco), foto);
    let lisProdutos = '';
    carrinho.forEach((el) =>{
        lisProdutos += geraPedidoLi(el.foto, el.nome, (el.preco * el.qtdProduto));
    })
    pedidosUl.innerHTML = lisProdutos;
    salvaPedidos(carrinho);
    valorTotal.textContent = `Total - R$ ${calculaTotal(carrinho)}`;
})

carregaPedidos();
carregaTotal();