let url = 'https://api.quotable.io/random';

async function request (url){
    let resposta = await fetch(url);
    return await resposta.json();
};

const resp = async  () => {
    let resposta = await request(url);
    console.log(resposta);
    return resposta;
};

document.querySelector("#gerarFrase").addEventListener('click', () => {
    const p = document.querySelector("#frase");
    console.log(resp());
});