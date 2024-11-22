function borrowBook(availableBooks, wantedBook) {
    let book = [];
    let p = document.querySelector("#borrowBookP");
    if ((availableBooks.lenght) > 0) {
        book = availableBooks.filter((bookEl, index)=>{
            if(book.title == wantedBook){
                bookEl.amountOfLoans = bookEl.amountOfLoans + 1;
                availableBooks.splice(index,1);
                console.log(bookEl, bookEl.amountOfLoans, availableBooks);
                return bookEl;
            }
        });
        if(book.length > 0){
            livrosEmprestados.push(book);
            return livrosEmprestados;
        }
        else{
            p.innerHTML = 'O livro digitado foi emprestado? Não, esse livro digitado foi emprestado ou não existe no bando de livros. Tente outro título disponível';
        }
    }
    else{
        p.innerHTML = 'O livro digitado foi emprestado? Não, ainda não há nenhum livro no banco de livros. Que tal adicionar algum ou esperar alguém adicionar um livro?'
    }
}


//---------

function borrowBook (books, wantedBook) {
    let p = document.querySelector("#borrowBookP");
    let mensagem = '';
    let searchForBook = searchBookByName(books, wantedBook);
    if(searchForBook !== undefined) {
        if(searchForBook.isAvailable === true) {
        
        }
    }
    books.forEach(book => {
        if(book.title === wantedBook){
            book.isAvailable = false;
            book.amountOfLoans = book.amountOfLoans + 1;
            mensagem = `O livro foi emprestado? Sim! O livro ${book.title} foi emprestado para você, cuide bem dele!`;
        }
    });
    if(mensagem === ''){
        if(books.length === 0){
            mensagem = 'O livro digitado foi emprestado? Não, ainda não há nenhum livro no banco de livros. Que tal' +
                ' adicionar algum ou esperar alguém adicionar um livro?';
        }
        else{
            mensagem = 'O livro digitado foi emprestado? Não, esse livro digitado foi emprestado ou não existe no' +
                ' bando de livros. Tente outro título disponível';
        }
    }
    p.innerHTML = mensagem;
}