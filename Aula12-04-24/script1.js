const btnAdd = document.querySelector("#adicionar");

/**
 * 
 * @param {string} seletor 
 * @returns valor do input
 */
const lerConteudo = (seletor) => document.querySelector(seletor).value;

/**
 * 
 * @param {string} tagName
 * @param {string} seletorElemPai
 * @param {string} conteudoTextual
 * @returns void
 */
const criarElementoHTML = (tagName, seletorElemPai, conteudoTextual) => {
    //  cria o elemento
    const obj = document.createElement(tagName);
    // joga na árvore 
    document.querySelector(seletorElemPai).appendChild(obj);
    // adicionando o texto no elemento
    obj.textContent = conteudoTextual;
};


const criarElementoA = (tagName, conteudoTextual) => {
    const obj = document.createElement(tagName);

    obj.href = "#"
    // adicionando o texto no elemento
    obj.textContent = conteudoTextual;
}

document.addEventListener('DOMContentLoaded', function () {
     // Seu código aqui

    btnAdd.addEventListener("click", () =>{
        const entrada = lerConteudo("#tarefa");
        // criarElementoHTML("li", "#lista-tarefas", entrada);
        if(entrada){
            const objLI = document.createElement("li");
            objLI.textContent = entrada;
            const objA1 = document.createElement("a");
            const objA2 = document.createElement("a");

            objA1.textContent = " Apagar";
            objA2.textContent = " Concluir";
            objA1.href = "#";
            objA2.href = "#";
            

            objLI.appendChild(objA1);
            objLI.appendChild(objA2);
            document.querySelector("#lista-tarefas").appendChild(objLI);
            document.querySelector("#tarefa").value = "";
        }

        
    })

    const listaDeLinks = document.querySelector("#lista-tarefas");

    listaDeLinks.addEventListener("click", (event)=>{
        if(event.target.nodeName == "A" && event.target.textContent == " Apagar"){
            event.target.parentElement.remove();
        }
        if(event.target.nodeName == "A" && event.target.textContent == " Concluir"){
            // event.target.parentElement.style.textDecoration = "line-through";
            event.target.parentElement.setAttribute("class", "concluido");
        }
    })
});
