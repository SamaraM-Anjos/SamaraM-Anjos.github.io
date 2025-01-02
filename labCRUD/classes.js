// Criação da classe Livro

class Livro {
    constructor ( id, titulo, autor, anoPublicacao, disponivel = true ) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }

    detalhes () {
        return `ID...............: ${this.id}\nTítulo...........: ${this.titulo}\nAutor............: ${this.autor}\nAno de Publicação: ${this.anoPublicacao}\nDisponível.......: ${this.disponivel}`;
    }

    getID () {
        return this.id;
    }
    getTitulo () {
        return this.titulo;
    }
    getAutor () {
        return this.autor;
    }
    getAnoPublicacao () {
        return this.anoPublicacao;
    }
    getDisponivel () {
        return this.disponivel;
    }

    setTitulo ( titulo ) {
        this.titulo = titulo;
    }
    setAutor ( autor ) {
        this.autor = autor;
    }
    setAnoPublicacao ( anoPublicacao ) {
        this.anoPublicacao = anoPublicacao;
    }
    setDisponivel ( disponivel ) {
        this.disponivel = disponivel;
    }
}

// Criação da classe Biblioteca

class Biblioteca {
    #livros = [];
    constructor ( ) {

    }

    adicionarLivro ( livro ) {
        this.#livros.push(livro);
    }
    listarLivros () {
        let tableData = '';
        let listaDeLivros = '';
        this.#livros.forEach(livro => {
            listaDeLivros += livro.detalhes() + '\n\n';
        });

        console.log(listaDeLivros);

        this.#livros.forEach(livro => {
            tableData += `<tr> <td>${livro.getID()}</td> <td>${livro.getTitulo()}</td> <td>${livro.getAutor()}</td> <td>${livro.getAnoPublicacao()}</td> </tr>`;
        });
        return tableData;
    };

    atualizarLivro ( id, tituloNovo, autorNovo, anoPublicacaoNovo, disponivelNovo ) {
        let livro = this.#livros.find(livroProcurado => livroProcurado.id == id);
        if(livro !== undefined) {
            if (tituloNovo != '') {
                livro.setTitulo(tituloNovo);
            }
            if (autorNovo != '') {
                livro.setAutor(autorNovo);
            }
            if (anoPublicacaoNovo != '') {
                livro.setAnoPublicacao(anoPublicacaoNovo);
            }
            if (disponivelNovo != '') {
                livro.setDisponivel(disponivelNovo);
            }
        }
        else{
            alert( 'Livro não encontrado! Utilize um ID válido' );
        }
    }

    removerLivro ( id ) {
        let existe = this.#livros.some(livro => livro.getID() == id);
        if (existe) {
            this.#livros = this.#livros.filter(livro => livro.getID() != id);
            return `O livro com id ${id} foi deletado com sucesso!`;
        }
        else{
            return 'Livro não encontrado! Utilize um ID válido';
        }
    }

    salvarDados () {
        localStorage.setItem('livros', JSON.stringify(this.#livros));
    }

    carregarDados () {
        let livros = JSON.parse(localStorage.getItem('livros'));
        this.#livros = livros.map(livro => {
            return new Livro ( livro.id, livro.titulo, livro.autor, livro.anoPublicacao, livro.disponivel );
        });
    }

    gerarNovoID () {
        return this.#livros.length + 1;
    }
}

export { Livro, Biblioteca };