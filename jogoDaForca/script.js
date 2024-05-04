const sorteiaValor = (arr) =>{
    return arr[(Math.ceil(Math.random()*arr.length-1))];
}


const palavras = ["javascript", "html", "css", "programacao", "computador"];
let palavraOculta = sorteiaValor(palavras);// sorteie uma palavra 
console.log(palavraOculta);
let letrasErradas = [];
let tentativasRestantes = 6;

const palavraOcultaDisplay = document.getElementById("palavra-oculta");
palavraOcultaDisplay.innerText = "";

for(let i = 0; i < palavraOculta.length; i++){
    palavraOcultaDisplay.innerText += " _";
}


let palavraD = (palavraOcultaDisplay.innerText).split("");

document.getElementById("adivinhar").addEventListener("click", function() { 
    const letra = document.getElementById("letra").value.toLowerCase();
    if (letra.length !== 1 || !/^[a-zA-Z]+$/.test(letra)) { 
        alert("Por favor, insira uma letra válida."); 
        return; 
    }
    
    if (palavraOculta.includes(letra)) { 
        // Atualizar exibição da palavra oculta
        let j = 0;
        console.log(palavraD);
        for(let i = 0; i < palavraOculta.length; i++){
            if(palavraOculta[i] == letra){
                palavraD[j] = letra;
            }
            j+=2;
        }

        palavraOcultaDisplay.innerText = "";
        for(let i = 0; i<palavraD.length; i++){
            palavraOcultaDisplay.innerText += ` ${palavraD[i]}`;
        }
        

    } else { 
        letrasErradas.push(letra);
        tentativasRestantes--; 
        // Atualizar exibição das letras erradas e tentativas restantes
        const letrasErradasD = document.getElementById("letras-erradas");
        const qtdTentativas = document.getElementById("tentativas");
        letrasErradasD.innerText = `Letras erradas: ${letrasErradas}`;
        qtdTentativas.innerText = `Tentativas restantes: ${tentativasRestantes}`;
    }
    
    

    if(tentativasRestantes == 0){
        alert(`Você perdeu o jogo. A palavra era: ${palavraOculta}`);
        palavraOcultaDisplay.innerText = "";
    }
    else{
        let palavraCOMP = palavraD;
        palavraCOMP = palavraCOMP.toString();
        palavraCOMP = palavraCOMP.replaceAll(' ,', '');
        palavraCOMP = palavraCOMP.replaceAll(',', '');
        console.log(palavraCOMP);
        if(palavraCOMP === palavraOculta){
            palavraOcultaDisplay.innerText = palavraCOMP;
            alert(`Você ganhou, parabéns. A palavra era: ${palavraOculta}`);
        }
    }
});