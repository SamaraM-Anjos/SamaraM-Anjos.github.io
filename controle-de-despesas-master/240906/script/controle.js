const addBtn = document.querySelector(".btn")
const ulTransaction = document.querySelector(".transactions");


const categoryList = [{name:"Lazer", type:"despesa"},
    {name:"Alimentação", type:"despesa"},
                        {name:"Estudos", type:"despesa"}, 
                        {name:"Pessoais", type:"despesa"}, 
                        {name:"Saúde", type:"despesa"}, 
                        {name: "Pet", type:"despesa"},
                        {name: "Família", type:"despesa"},
                        {name: "Outros", type:"despesa"},
                        {name: "Salário", type:"receita"},
                        {name: "Bolsa", type:"receita"},
                        {name: "Mesada", type:"receita"},
                        {name: "Auxílio", type:"receita"}]

const getTypeTransactionByName = (transaction,list) => {
    transaction = transaction.toLowerCase()
    const category = (list.find(elem => elem.name.toLowerCase() == transaction))
    return category.type
}


// carregar as categorias na página...
const loadCategory = (lista, seletor) => {
    // carregando o datalist 
    document.querySelector(seletor).innerHTML = lista.reduce(
        (acum, elem)=> acum + `<option value="${elem.name}">`, "")
}

loadCategory(categoryList, "#category-list")

/**
 * Function that returns an object with form data
 * @returns value:Number, name:string, total:Number, categoryName:string, categoryType:string, dateTransaction: string
 */
const getFormValues = () => {
    //dados da nova entrada
    const transactionName = document.querySelector("#transaction-name").value
    const amount = parseFloat(document.querySelector("#amount").value)
    //categoria da nova entrada
    const categoryName = document.querySelector("#category").value
    const categoryType = getTypeTransactionByName(categoryName,categoryList)

    //valor total 
    let total = document.querySelector("#balance").textContent
    total = parseFloat(total.substring(3,total.length))
    // Identificar o valor da despesa/receita
    total = (categoryType=="receita")? amount + total : total - amount

    let dataTransacao = document.querySelector("#dateTransaction").value;
    return {value: amount, 
            name:transactionName, 
            total:total, 
            categoryName:categoryName, 
            categoryType: categoryType,
            dateTransaction: dataTransacao
        }
}

/**
 * Converts a currency to number type
 * @param {currency} value 
 * @returns {Number} value 
 */

const currencyToNumber = value => parseFloat(("" + value).substring(4,value.length))

/**
 * Converts a string to currency type
 * @param {String} value 
 * @returns currency
 */
const stringToCurrency = value => `R$ ${value.toFixed(2)}`

function reloadBalance(){
    let saldoAtual = 0;
    let receita = 0;
    let despesa = 0;
    let balanceDisplay = document.querySelector("#balance").textContent;
 
    saldoAtual = parseFloat((balanceDisplay).substring(3, balanceDisplay.length));

    const lis = document.querySelectorAll('#transactions li');
    if(lis.length == 0){
        saldoAtual = 0;
    }
    else{
        lis.forEach(function(el){
            let valor = parseFloat((el.firstChild.nextSibling.nextSibling.textContent).substring(4, el.firstChild.nextSibling.nextSibling.textContent.length));
            if(el.classList.contains('minus')){
                despesa = (despesa + valor)*(-1);             
            }
            else{
                receita += valor;
            }
    
            saldoAtual = (receita + despesa);
        });
    }
    document.querySelector('#balance').textContent = stringToCurrency(saldoAtual);
    document.querySelector('#money-plus').textContent = `R$ ${stringToCurrency(receita)}`;
    document.querySelector('#money-minus').textContent = `R$ ${stringToCurrency(despesa)}`;
}

// Função para retornar os elementos para serem salvos no web storage
function returnLiComponents(li){
    let textoLi = '';
    let elementoPreco = li.firstChild.nextSibling.nextSibling.textContent;
    let valorLi = (elementoPreco).substring(4, elementoPreco.lenght);
    let tipoTransacao = li.classList.contains("plus") ? "plus" : "minus";
    let operador = tipoTransacao == "plus" ? "+" : "-";
    let data = (li.firstChild.nextSibling).textContent;
    textoLi = (li.firstChild.textContent);
    valorLi = parseFloat(valorLi);
    return [
        tipoTransacao,
        textoLi,
        operador,
        valorLi,
        data
    ]
}
// SALVANDO A LISTA DE GASTOS NO WEB STORAGE
const saveTransactions = () => {
    let lis = document.querySelectorAll("#transactions li");
    let transactionsArr = [];
    lis.forEach((el) => {
        transactionsArr.push(returnLiComponents(el));
    });
    localStorage.setItem('transactions', JSON.stringify(transactionsArr));
}

// => CRIAR UMA FUNÇÃO PARA RETORNAR UM ELEMENTO LI
const liCreator = (transactionClass, textoLi, operador, valor, dateTransaction) =>{
    return `<li class="${transactionClass}"><span>${textoLi}</span><span>${dateTransaction}</span><span>${operador}${stringToCurrency(valor)}</span><button class="delete-btn">x</button></li>`
}
// RETORNANDO COM OS DADOS SALVOS PARA A TELA
const loadTransactions = () =>{
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach((el) =>{
        ulTransaction.innerHTML += liCreator(el[0], (el[1]), el[2], el[3], el[4]);
        reloadBalance();
    });
}

const clearForm = () => {
    document.querySelector("#transaction-name").value = ""
    document.querySelector("#amount").value = ""
    document.querySelector("#category").value = ""
}
const loadBalance = () => {
    //a. Recuperar os valores digitados
    const formData = getFormValues()
    //atualizar o DOM
    document.querySelector("#balance").textContent = stringToCurrency(formData.total)

    //adicionar a transacao em despesa (#money-minus) ou receita (#money-plus)
    //se for receita
        // recuperar o valor #money-plus
    let moneySelector = (formData.categoryType=="receita")?"#money-plus": "#money-minus"

     // soma o valor ao #money-plus
        document.querySelector(moneySelector).textContent = stringToCurrency(formData.value)
    //adicionar a transação na lista #transactions
        const transactionClass = (formData.categoryType=="receita")?"plus": "minus";
        const operator = (formData.categoryType=="receita")?"+": "-";
        ulTransaction.innerHTML += liCreator(transactionClass, formData.name, operator, formData.value, formData.dateTransaction);
     
    // salvar as transações no localStorage
    clearForm()
}

addBtn.addEventListener("click", () => {
    loadBalance();
    saveTransactions();
});

ulTransaction.addEventListener('click', function(event){
    if((event.target).classList == "delete-btn"){
        ulTransaction.removeChild(event.target.parentNode);
    }
    reloadBalance();
    saveTransactions();
});
loadTransactions();