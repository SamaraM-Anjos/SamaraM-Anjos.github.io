const produtos = [ 
        { nome: 'Laptop', preco: 1000, quantidade: 5 },
        { nome: 'Mouse', preco: 20, quantidade: 10 }, 
        { nome: 'Teclado', preco: 30, quantidade: 8 } ];

function calcularValorTotalEstoque(produtos) { 
    // Sua implementação aqui
    let resultado=0;
    produtos.forEach((elemento) => {
       resultado += (elemento['preco'] * elemento['quantidade']);
    });
    return resultado;
}
const valorTotal = calcularValorTotalEstoque(produtos);
console.log('Valor total do estoque:', valorTotal);