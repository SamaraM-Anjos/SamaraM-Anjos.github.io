import {Livro, Biblioteca} from './classes.js';

let escalbooks = new Biblioteca();

const loadTableData = () => {
    document.querySelector('#allBooksAvailable').innerHTML = escalbooks.listarLivros();
}

document.querySelector("#addBook").addEventListener('click', function() {
    let titulo = document.querySelector("#titleA").value;
    let autor = document.querySelector("#authorA").value;
    let ano = document.querySelector("#anoPublicacaoA").value;
    let id = escalbooks.gerarNovoID();
    
    let livro = new Livro(id, titulo, autor, ano);
    escalbooks.adicionarLivro(livro);
    escalbooks.salvarDados();
    document.querySelector('#addBookP').innerHTML = 'O livro ' + titulo + ' foi adicionado com sucesso!';
    loadTableData();
});

document.querySelector('#updateBook').addEventListener('click', function() {
    let id = document.getElementById('idU').value;
    let titulo = document.getElementById('titleU').value;
    let autor = document.getElementById('authorU').value;
    let anoPublicacao = document.getElementById('anoPublicacaoU').value;
    
    escalbooks.atualizarLivro(id, titulo, autor, anoPublicacao);
    escalbooks.salvarDados();
    document.querySelector('#updateBookP').innerHTML = `O livro com id ${id}  foi atualizado com sucesso!'`;
    loadTableData();
});

document.querySelector('#deleteBook').addEventListener('click', function() {
    let id = document.getElementById('idD').value;
    document.querySelector('#deleteBookP').innerHTML = escalbooks.removerLivro(id);
    escalbooks.salvarDados();
    loadTableData();
});


document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('livros') !== null) {
        escalbooks.carregarDados();
    }
    loadTableData();
});