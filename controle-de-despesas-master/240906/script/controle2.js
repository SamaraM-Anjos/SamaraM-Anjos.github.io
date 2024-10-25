function getDateValues(){
    let dataInicio = document.querySelector("#dataInicio").value;
    let dataFinal = document.querySelector("#dataFinal").value;
    return {dataInicio: dataInicio, dataTermino: dataFinal}
}
function createTableRow (data) {
    return `<tr><td class="date">${data[4]}</td><td class="descricao">${data[1]}</td><td>R$ ${data[3]}</td></tr>`
}

function createHeaderTableRow (type){
    return `<tr colspan="2"><th>${type}</th></tr>`
}

function createTables (data){
    let receitasDados = '';
    let despesasDados = '';
    data.forEach(el =>{
        if(el[0] == "plus"){
            receitasDados += createTableRow(el);
        }
        else{
            despesasDados += createTableRow(el);
        }
    })
    document.querySelector("#tableReceitas").innerHTML = createHeaderTableRow("Receitas") + receitasDados;
    document.querySelector("#tableDespesas").innerHTML = createHeaderTableRow("Despesas") + despesasDados;
}

function getTransactionsByDate(startDate, finalDate){
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    let startDateOb = new Date(startDate).getTime();
    let finalDateOb =new Date(finalDate).getTime();
    let transactionsFiltered = [];
    transactions.forEach(el => {
        let dateEl = new Date(el[4]).getTime();
        if(dateEl >= startDateOb && dateEl <= finalDateOb){
            transactionsFiltered.push(el);
        }
    });
    return transactionsFiltered;
}

document.querySelector(".form .btn").addEventListener("click", () =>{
    let periodo = getDateValues();
    let transactions = getTransactionsByDate(periodo.dataInicio, periodo.dataTermino);
    createTables(transactions);
})