/**
 * Está é uma função para criar um novo objeto que conterá as informações de algum livro da biblioteca
 *
 * ---
 *
 * @param {string} title  Parâmetro obrigatório
 * @param {string} author  Parâmetro obrigatório
 * @param {boolean} isAvailable  Parâmetro obrigatório
 * @param {int} amountOfLoans  Parâmetro obrigatório
 *
 * ---
 *
 * @returns {Object}
 * */
let Book = function (title, author, isAvailable = true, amountOfLoans = 0) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
    this.amountOfLoans = amountOfLoans;
}

// Lista que conterá os livros adicionados
let books = [];

/**
 * - Está função é responsável por criar um novo Objeto de Livro para poder adicionar no site
 *
 * ---
 *
 * @param {string} title  Parâmetro obrigatório
 * @param {string} author  Parâmetro obrigatório
 * @param {boolean} isAvailable  Parâmetro desnecessário
 * @param {int} amountOfLoans  Parâmetro desnecessário
 *
 * ---
 *
 * - Os livros adicionados já são considerados aptos para serem emprestados e eles iniciam sem uma quantidade de
 * empréstimos.
 * **/

function addBook(title, author) {
    return (books.push(new Book(title, author)));
}

/**
 * - Essa função é responsável por retornar o objeto {Book} que possui um determinado título que será enviado pelo
 * usuário. Se não existir, ela retorna {undefined}
 *
 * ---
 *
 * @param {list} array Parâmetro obrigatório
 * @param {string} title Parâmetro obrigatório
 *
 * ---
 *
 * @return {object}
 * */

const searchBookByName = (array, title) => array.find(item => item.title === title);

/**
 * - Essa função é responsável por devolver um livro que o usuário irá enviar
 *
 * ---
 *
 * @param {list} books Parâmetro obrigatório -> Recebe o array que contém os livros do banco de livros
 * @param {string} title Parâmetro obrigatório -> Recebe o título do livro que vai ser devolvido
 *
 * ---
 *
 * @return {string} mensagem -> Contém uma mensagem para o usuário, confirmando ou não a devolução do livro
 * */

function returnBook(books, title) {
    let searchBook = searchBookByName(books, title);
    let mensagem = '';
    if(searchBook !== undefined) {
        if(searchBook.isAvailable !== true) {
            searchBook.isAvailable = true;
            mensagem = `O livro ${title} foi devolvido com sucesso! Escolha outro livro ou devolva`;
        }
        else{
            mensagem = `O livro ${title} não pode ser devolvido pois ele ainda não foi emprestado. Devolva outro livro.`;
        }
    }
    else {
        mensagem = `O livro ${title} não está presente no nosso banco de livros. Se quiser adicione-o ao nosso banco de livros.`;
    }
    return mensagem;
}

/**
 * - Essa função vai retornar o array de livros emprestados a partir do array de livros disponíveis, por meio do
 * nome dos livros requisitados
 *
 * @param {list} books Parâmetro obrigatório
 * @param {string} wantedBook Parâmetro obrigatório
 *
 * ---
 *
 * - O que essa função faz:
 *      - Essa função vai verificar se a quantidade de livros disponíveis é maior do que zero, ou seja, há livros disponíveis
 *          - Se não tiver nenhum livro disponível, ele retorna uma mensagem para o usuário informando a falta de
 *          livros no banco de livros.
 *      - Depois essa função vai varrer o array contendo os livros disponíveis em busca do livro que o usuário digitou
 *          - Se ela encontrar o livro, será retornado o livro com o acréscimo da quantidade de vezes que o livro
 *          foi emprestado. Além disso, ela vai setar a propriedade 'isAvailable' como false e enviará uma mensagem
 *          de sucesso para o usuário;
 *          - Caso contrário, retornará uma mensagem de falha para o usuário
 *
 * @return {string}
 * */

function borrowBook (books, wantedBook) {
    let mensagem = '';
    let searchForBook = searchBookByName(books, wantedBook);
    if(searchForBook !== undefined) {
        if(searchForBook.isAvailable === true) {
            searchForBook.isAvailable = false;
            searchForBook.amountOfLoans = searchForBook.amountOfLoans + 1;
            mensagem = `O livro foi emprestado? Sim! O livro ${searchForBook.title} foi emprestado para você, cuide bem dele!`;
        }
    }
    if(mensagem === ''){
        if(books.length === 0){
            mensagem = `O livro digitado foi emprestado? Não, ainda não há nenhum livro no banco de livros. Que tal adicionar esse livro no banco de livros ou escolher outro?`;
        }
        else{
            mensagem = 'O livro digitado foi emprestado? Não, esse livro digitado está emprestado ou não existe no' +
                ' banco de livros';
        }
    }
    return mensagem;
}

/**
 * - Função para gerar uma linha de tabela com os dados dos livros
 *
 * ---
 *
 * @param {string} bookName Parâmetro obrigatório
 * @param {string} bookAuthor Parâmetro obrigatório
 *
 * ---
 *
 * @return {string} HTML ELEMENT STRING
 * */

const generateTableRow = (bookName, bookAuthor) => {
    return `<tr class="borrowedBooksRow">
              <td>${bookName}</td>
              <td>${bookAuthor}</td>
            </tr>`
}

/**
 * - Função para gerar toda a tabela de dados por meio de um array com as informações necessárias para completar a
 * tabela
 * - Essa função precisa da função anterior, **generateTableRow()**
 *
 * ---
 *
 * @param {list} books Parâmetro obrigatório
 *
 * ---
 *
 * @return {string} HTML ELEMENT STRING
 * */

const generateCompleteTableData = (books) => {
    let completeData = '';
    books.forEach((book) => {completeData += generateTableRow(book.title, book.author)});
    return completeData;
}

/**
 * - Função para carregar todos os livros que estão no banco de livros da livraria, disponíveis ou não
 * - Essa função precisa da função **generateCompleteTableRow()**
 *
 * ---
 *
 * @param {list} books Parâmetro obrigatório
 *
 * ---
 *
 * @return {void}
 * */
function loadAllBooks (books) {
    const tBody = document.querySelector('#allBooksTableBody');
    tBody.innerHTML = generateCompleteTableData(books);
}

/**
 * - Função para carregar todos os livros que estão disponíveis para empréstimo no banco de livros da livraria
 * - Essa função precisa da função **generateCompleteTableRow()**
 *
 * ---
 *
 * @param {list} books Parâmetro obrigatório
 *
 * ---
 *
 * @return {void}
 * */
function loadAvailableBooks (books) {
    const tBody = document.querySelector('#availableBooksTableBody');
    let availableBooks = books.filter((book) => book.isAvailable === true);
    tBody.innerHTML = generateCompleteTableData(availableBooks);
}

/**
 * - Função para carregar todos os livros que não estão disponíveis para empréstimo no banco de livros da livraria
 * - Essa função precisa da função **generateCompleteTableRow()**
 *
 * ---
 *
 * @param {list} books Parâmetro obrigatório
 *
 * ---
 *
 * @return {void}
 * */
function loadBorrowedBooks (books) {
    const tBody = document.querySelector('#borrowedBooksTableBody');
    let borrowedBooks = books.filter((book) => book.isAvailable === false);
    tBody.innerHTML = generateCompleteTableData(borrowedBooks);
}

const borrowedBooksQuantity = books => books.reduce((total, book) => total + book.amountOfLoans, 0);

// Função para pegar o novo livro -> TEM QUE ADICIONAR A FUNÇÃO PARA A CADA LIVRO ADICIONADO ATUALIZAR A LISTAGEM
// DOS LIVROS

document.querySelector("#addBook").addEventListener('click', function(){
    const bookTitleEl = document.querySelector("#titleA");
    const bookAuthorEl = document.querySelector("#author");
    const p = document.querySelector("#addBookP");
    const bookTitle = (bookTitleEl.value).toUpperCase();
    const bookAuthor = (bookAuthorEl.value).toUpperCase();
    let searchBook = searchBookByName(books, bookTitle);
    
    if(bookTitle !== '' && bookAuthor !== ''){
        if(searchBook === undefined){
            addBook(bookTitle, bookAuthor);
            p.innerHTML = `O livro ${bookTitle} foi adicionado ao banco de livros. Muito obrigada pela contribuição!`;
            loadAllBooks(books);
            loadAvailableBooks(books);
        }
        else{
            p.innerHTML = `O livro ${bookTitle} já está presente no banco de livros, que tal cadastrar outro?`;
        }
    }
    else{
        p.innerText = `Digite todas as informações corretamente. Não deixe nada vazio, por favor.`;
    }
    bookTitleEl.value = "";
    bookAuthorEl.value = "";
});

document.querySelector("#borrowBook").addEventListener('click', () =>{
    const bookTitleEl = document.querySelector("#titleB");
    const p = document.querySelector("#borrowBookP");
    const p2 = document.querySelector("#borrowedBooksQuantityP");
    const book = (bookTitleEl.value).toUpperCase();
    
    if(bookTitleEl.value !== ""){
        p.innerHTML = borrowBook(books, book);
        loadBorrowedBooks(books);
        loadAvailableBooks(books);
        p2.innerHTML = `Quantidade de empréstimos totais: ${borrowedBooksQuantity(books)}`;
    }
    else{
        p.innerHTML = 'Digite o título do livro, por favor.';
    }
    bookTitleEl.value = '';
});

document.querySelector("#returnBook").addEventListener('click', () =>{
    const bookTitleEl = document.querySelector("#titleR");
    const p = document.querySelector("#returnBookP");
    const book = (bookTitleEl.value).toUpperCase();
    
    if(book !== ""){
        p.innerHTML = returnBook(books, book);
        loadBorrowedBooks(books);
        loadAvailableBooks(books);
    }
    else{
        p.innerHTML = 'Digite o título do livro que você quer devolver, por favor.';
    }
    bookTitleEl.value = '';
});