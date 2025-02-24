

const converteBtn = document.querySelector("#converter");

const requisicao = async (url) => {
    let response = await fetch (url);
    let dadosResponse = await response.json();
    return dadosResponse;
}

const loadOptionHTML = (dado) =>{
    return `<option class=sOption value="${dado}">${dado}</option>`;
}

const loadSelectHTML = async (dados) =>{
    let options = '';
    for(let dado in dados){
        options += loadOptionHTML(dado);
    }
    moedaInicial.innerHTML = options;
}
const loadSelectOptions = async (url) =>{
    let request = await requisicao(url);
    await loadSelectHTML(request.conversion_rates);
}

loadSelectOptions(url);

converteBtn.addEventListener("click", async () =>{
    let valor = document.querySelector("#valor").value;
    let moeda = document.querySelector("#moedaInicial").value;
    let dados = await requisicao(url);
    let taxa = dados.conversion_rates;

    let valConv = taxa[moeda];

    document.querySelector("#resposta").innerHTML = `<p>${(valor * valConv)}</p>`;
});