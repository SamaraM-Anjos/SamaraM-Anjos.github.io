let api_key = '8a7d6dd3';

let filmes = [];

async function request (url){
    return await ((await (fetch(url))).json());
}

function gerarListaFilme(titulo, anoLancamento, autor){
    return `<li>Nome do filme/série: ${titulo}</li>
            <li>Ano de lançamento: ${anoLancamento}</li>
            <li>Autor: ${autor}</li></br>`;
}

document.querySelector("#procurar").addEventListener("click", async () =>{
    let tituloFilme = document.getElementById("nomeFilme").value;
    let url = `http://www.omdbapi.com/?apikey=${api_key}&t=${tituloFilme}`;
    let requisicao = await request(url);
    let ulFilme = document.querySelector("#filme");
    filmes.push(requisicao);
    ulFilme.innerHTML = gerarListaFilme(requisicao.Title, requisicao.Year, requisicao.Writer);
    console.log(filmes);
});

const ulFilmesFiltrados = document.querySelector("#filmesFiltrados");

document.querySelector("#filtrar").addEventListener("click", async () =>{
    let filmesFiltrados = filmes.filter((el)=> el.Year >= "2000");
    filmesFiltrados.forEach((el) => {
        ulFilmesFiltrados.innerHTML += gerarListaFilme(el.Title, el.Year, el.Writer);
    });
});