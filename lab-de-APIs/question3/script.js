const apiKey = '7cbfb46cc08a495c68f01daf47b82629';

async function request (url) {
    let request = await fetch(url);
    return await request.json();
}

function getIcon(icon){
    let imgId = '01';
    if(icon <= 232){
        imgId = '11';
    }
    if((icon >= 300 && icon <= 321) || (icon >= 520 && icon <= 531)){
        imgId = '09';
    }
    if( icon >= 500 && icon <= 504 ){
        imgId = '10';
    }
    if((icon >= 600 && icon <= 622) || icon == 511){
        imgId = '13';
    }
    if( (icon >= 701 && icon <= 781)){
        imgId = '50';
    }
    if(icon == 800){
        imgId = '01';
    }
    if(icon == 801){
        imgId = '02';
    }
    if (icon == 802){
        imgId = '03';
    }
    if (icon == 803 || icon == 804){
        imgId = '04';
    }
    return imgId;
}

function returnIcon(icon, time, tamImg = '4x') {
    let imgId = getIcon(icon);
    let diaOuNoite = (time <= '18:00:00') && (time >= '04:00:00') ? 'd':'n';
    let iconHTML = `<img src="./imagens/${imgId}${diaOuNoite}_t@${tamImg}.png" alt='Openweather icon'>`;
    return iconHTML;
}

function gerarCard(icon, nomeDoLocal, descricao, tempAtual, sensTermica, umidade, velVento, hora){
        return `<div class="card"> 
                    <div class="icon">
                        ${returnIcon(icon, hora)}
                    </div>
                    <div class="info">
                        <h4>${nomeDoLocal}</h4>

                        <ul class="clima">
                            <li>Codição atual: ${((descricao).charAt(0).toUpperCase() + descricao.slice(1))}</li>
                            <li>Temperatura:
                                <ul class="temperatura">
                                    <li>Temperatura atual: ${tempAtual}ºC</li>
                                    <li>Sensação térmica: ${sensTermica}ºC</li>
                                </ul>
                            </li>
                            <li>Umidade: ${umidade}%</li>
                            <li>Velocidade do vento: ${velVento}Km/h</li>
                        </ul>
                    </div>
                </div>`;
};
function gerarLiFiltrada (nomeDoLocal, time, tempAtual, icon) {
    return `<li>
                ${returnIcon(icon, time, '2x')}
                <ul class="ulLocalF">
                    <li>${nomeDoLocal}</li>
                    <li>${tempAtual}ºC</li>
                </ul>
            </li>`;
}

const salvarLocalStorage = (dados) => {
    localStorage.clear();
    localStorage.setItem('cidadesPesquisadas', JSON.stringify(dados));
};

let cidadesPesquisadas = [];

document.querySelector('#pesquisar').addEventListener("click", async function (){
    let cidade = await document.getElementById('cidade').value;
    let pais = await document.getElementById('pais').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${pais}&units=metric&lang=pt_br&appid=${apiKey}`;

    let response = await request(url);
    let icon = response.weather[0].id;
    let descricao = response.weather[0].description;
    let tempAtual = response.main.temp;
    let sensTermica = response.main.feels_like;
    let umidade = response.main.humidity;
    let velVento = response.wind.speed;
    let hora = (new Date((response.dt * 1000))).toLocaleTimeString('pt-br');

    document.querySelector("#resposta").innerHTML = gerarCard(icon, cidade, descricao, tempAtual, sensTermica, umidade, velVento, hora);

    cidadesPesquisadas.push(
        {
            'icon': icon, 
            'cidade': cidade,
            'descricao': descricao,
            'tempAtual': tempAtual, 
            'sensTermica': sensTermica, 
            'umidade': umidade, 
            'velVento': velVento,
            'hora': hora
        });
        document.querySelector("#cidade").value = '';
        salvarLocalStorage(cidadesPesquisadas);
});

document.getElementById("filtrar").addEventListener('click', function(){
    let ulFiltrada = document.getElementById('locaisFiltrados');
    let cidadesFiltradas = cidadesPesquisadas.filter((el) => el.tempAtual > 35 || el.tempAtual > 5);
    if(cidadesFiltradas.length === 0) {
        alert ('Nenhuma das cidades pesquisadas está dentro das codições especificadas');
    }
    else{
        ulFiltrada.innerHTML = '';
        cidadesFiltradas.forEach(el => {
            ulFiltrada.innerHTML += gerarLiFiltrada(el.cidade, el.hora, el.tempAtual, el.icon);
        });
    }
});

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('cidadesPesquisadas') !== null){
        cidadesPesquisadas = JSON.parse(localStorage.getItem('cidadesPesquisadas'));
    }
});