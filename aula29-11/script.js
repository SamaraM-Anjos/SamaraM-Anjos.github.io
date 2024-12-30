/*
    Questão número 1
 */
class Pessoa {
    constructor (nome, idade, sexo){
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
    }
    apresentar(){
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.sexo}`;
    }
}

class Aluno extends Pessoa {
    constructor (nome, idade, sexo, matricula, curso){
        super(nome, idade, sexo);
        this.matricula = matricula;
        this.curso = curso;
    }
    apresentar(){
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, sou ${this.sexo} e estou no curso ${this.curso}`;
    }
}

const aluno = new Aluno('Escalfoni', 25, 'homem', 96, 'Informática');

console.log(aluno.apresentar());

/*
    Questão número 2
 */

class ContaBancaria {
    constructor (titular, saldo){
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar (valor) {
        this.saldo += valor;
    }
    sacar (valor) {
        if((this.saldo - valor) < 0){
            console.log('Você não tem saldo sufiente');
        }
        else{
            this.saldo -= valor;
        }
    }
    mostrarSaldo(){
        console.log( this.saldo );
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(titular, saldo, limite){
        super(titular, saldo);
        this.limite = limite;
        this.saldo += limite;
    }

    sacar (valor){
        if ((this.saldo - valor) < 0 || valor > this.limite) {
            console.log('Você não tem saldo sufiente ou o limite foi atingido');
        }
        else{
                this.saldo -= valor;

        }
    }
}

let contaBancaria = new ContaBancaria ('Rose', 5000);
contaBancaria.depositar(2000);

contaBancaria.mostrarSaldo();

contaBancaria.sacar(100);

contaBancaria.mostrarSaldo();


let contaCorrente = new ContaCorrente ('Rose', 3500, 20000);
contaCorrente.depositar(3000);
contaCorrente.mostrarSaldo();
contaCorrente.sacar(10000);
contaCorrente.mostrarSaldo();
contaCorrente.sacar(20000);
contaCorrente.mostrarSaldo();


/*
    Questão número 3
 */

class Produto {
    constructor ( nome, preco, quantidadeEmEstoque ) {
        this.nome = nome;
        this.preco = preco;
        this.quantidadeEmEstoque = quantidadeEmEstoque;
    }

    atualizarEstoque ( quantidade ) {
        if ( quantidade < 0 && (this.quantidadeEmEstoque + quantidade) >= 0 ) {
            this.quantidadeEmEstoque = quantidade;
        }
        else{
            console.log('Não há estoque suficiente para realizar essa ação');
        }
    }

    calculaValorEstoque ( ) {
        return this.preco * this.quantidadeEmEstoque;
    }
}

class ProdutoPerecivel extends Produto{
    constructor (nome, preco, quantidadeEmEstoque, dataVencimento) {
        super(nome, preco, quantidadeEmEstoque);
        this.dataVencimento = new Date (dataVencimento);
    }

    verificarValidade (dataAtual) {
        this.dataAtual = new Date(dataAtual);
        return ( this.dataVencimento <= this.dataAtual )? 'O alimento está na validade.' : 'O alimento não está na validade.';
    }
}

const produto1 = new ProdutoPerecivel ( 'Iogurte', 2.50, 20, '02/12/2024');
const produto2 = new ProdutoPerecivel ( 'Pão', 12.00, 53, '11/21/2021');
const produtos = [produto1, produto2];
console.table(produtos);
console.log(produto1.verificarValidade('11/30/2024'));


/*
    QUESTÃO 4
*/

class Veiculo {
    constructor ( marca, modelo, ano ) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano =  ano;
    }

    descrever () {
        return `Modelo: ${this.modelo}
        Marca.: ${this.marca}
        Ano...: ${this.ano}`;
    }
}
class Carro extends Veiculo{
    constructor ( marca, modelo, ano, portas ) {
        super ( marca, modelo, ano );
        this.portas = portas;
    }

    descrever () {
        return `Modelo: ${this.modelo}\nMarca.: ${this.marca}\nAno...: ${this.ano}\nPortas: ${this.portas}\n`;
    }
}

class Moto extends Veiculo {
    constructor ( marca, modelo, ano, cilindradas ) {
        super ( marca, modelo, ano);
        this.cilindradas = cilindradas;
    }

    descrever () {
        return `Modelo.....: ${this.modelo}\nMarca......: ${this.marca}\nAno........: ${this.ano}\nCilindradas: ${this.cilindradas}\n`;
    }
}
let carro = new Carro("Toyota", "Corolla", 2020, 4);
console.log(carro.descrever());

let moto = new Moto("Honda", "CB500", 2021, 500);
console.log(moto.descrever());

/*
    QUESTÃO 5
*/

class Funcionario {
    constructor ( nome, salario ) {
        this.nome = nome;
        this.salario = salario;
    }

    aumentarSalario ( percentual ) {
        this.salario += ((this.salario * percentual)/100);
    }

    mostrarInformacoes () {
        console.log(`Nome do funcionário...: ${this.nome}\nSalário do funcionário: ${this.salario}`);
    }
}

class Gerente extends Funcionario {
    constructor ( nome, salario, departamento ) {
        super ( nome, salario );
        this.departamento = departamento;
    }

    mostrarInformacoes () {
        console.log(`Nome do funcionário...: ${this.nome}\nSalário do funcionário: ${this.salario}\nDepartamento..........: ${this.departamento}\n`);
    }
}

class Estagiario extends Funcionario {
    constructor ( nome, salario ) {
        super( nome, salario );
    }
    aumentarSalario ( percentual ) {
        if(percentual > 10){
            console.log('O percentual ofertado não pode ser maior que 10%');
        }
        else{
            this.salario += ((this.salario * percentual)/100);
        }
    }
}

let funcionario = new Funcionario("João", 2000);
funcionario.mostrarInformacoes();
funcionario.aumentarSalario(20);
funcionario.mostrarInformacoes();

let gerente = new Gerente("Maria", 5000, "Financeiro");
gerente.mostrarInformacoes();
gerente.aumentarSalario(15);
gerente.mostrarInformacoes();

let estagiario = new Estagiario("Ana", 1000);
estagiario.mostrarInformacoes();
estagiario.aumentarSalario(5);
estagiario.mostrarInformacoes();
estagiario.aumentarSalario(12);
estagiario.mostrarInformacoes();

/*
    QUESTÃO 6
*/

class Livro {
    constructor ( titulo, autor, disponivel ) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }

    emprestar ( ) {
        if(this.disponivel == true) {
            this.disponivel = false;
        }
        else{
            console.log('Aparentemente o livro já foi emprestado. Tente novamente depois.');
        }
    }

    devolver ( ) {
        if(this.disponivel == false){
            this.disponivel = true;
        }
        else{
            console.log('O livro não pode ser devolvido, ele pode ser pego emprestado.')
        }
    }

    status ( ) {
        let disponibilidade = this.disponivel == true ? 'disponível' : 'indisponível';
        console.log(`O livro ${this.titulo} está ${disponibilidade} p/ empréstimo.`)
    }
}

class Biblioteca {
    #livros = [];
    constructor ( nome ) {
        this.nome = nome;
    }

    adicionarLivro (livro) {
        this.#livros.push(livro);
    }

    listarLivros () {
        console.table(this.#livros, ['titulo', 'autor', 'disponivel']);
    }

    buscarLivro (nomeLivro) {
        let livroBuscado = this.#livros.filter(livro => livro.titulo.toLowerCase().includes(nomeLivro.toLowerCase()));
        console.table(livroBuscado, ['titulo', 'autor', 'disponivel']);
        if( livroBuscado == null ) {
            console.log('Esse livro não existe na biblioteca');
        }
    }
}

let livro1 = new Livro ('O Retrato de Dorian Grey', 'Oscar Wilde', true);
let livro2 = new Livro ('1984', 'George Orwell', true);
let livro3 = new Livro ('Carrossel Sombrio e Outras histórias', 'Joe Hill', true);


let biblioteca = new Biblioteca('Escalbooks');

biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarLivro(livro3);

biblioteca.listarLivros();
biblioteca.buscarLivro('Carrossel');


/*
    QUESTÃO 7
*/

class Jogador {
    constructor (nome, nivel = 1, experiencia = 0) {
        this.nome = nome;
        this.nivel = nivel;
        this.experiencia = experiencia;
    }
    
    subirNivel () {
        this.nivel += 1;
    }

    ganharExperiencia (pontos) {
        this.experiencia += pontos;
        if(this.experiencia >= 100) {
            this.subirNivel();
            this.experiencia -= 100;
        }
    }
}

class Guerreiro extends Jogador {
    constructor (nome, nivel = 1, experiencia = 0, forca = 5) {
        super(nome, nivel, experiencia);
        this.forca = forca;
    }


    subirNivel () {
        this.nivel += 1;
        this.subirForca ();
    }

    subirForca () {
        this.forca += 1;
    }
}

let jogador = new Jogador ('Escalf', 100);
let jogadorG = new Guerreiro ("EscalfG", 100);

console.log("Experiência antes de usar o método: ", jogador.experiencia);
jogador.ganharExperiencia (50);
console.log("Experiência depois de usar o método: ", jogador.experiencia);
jogador.ganharExperiencia (55);
console.log("Experiência antes de usar o método novamente: ", jogador.experiencia, '\n');

console.log("Experiência antes de usar o método: ", jogadorG.experiencia);
console.log("Força do personagem antes de subir o level: ", jogadorG.forca);
jogadorG.ganharExperiencia (50);
console.log("Experiência depois de usar o método: ", jogadorG.experiencia);
jogadorG.ganharExperiencia (55);
console.log("Experiência depois de usar o método novamente: ", jogadorG.experiencia);
console.log("Força do personagem depois de subir o level: ", jogadorG.forca);

/*
    QUESTÃO 8
*/

class Turma {
    #curso = '';

    constructor ( curso, alunos ) {
        this.#curso = curso;
        this.alunos = alunos;
    }

    adicionarAluno ( nomeAluno ) {
        this.alunos.push(nomeAluno);
    }

    removerAluno ( nomeAluno ) {
        this.alunos = this.alunos.filter(aluno => aluno != nomeAluno);
    }

    listarAlunos () {
        console.table(this.alunos);
    }
}

class TurmaOnline extends Turma {
    #linkDeAcesso = '';
    constructor ( curso, alunos, linkDeAcesso ) {
        super( curso, alunos );
        this.#linkDeAcesso = linkDeAcesso;
    }

    listarAlunos () {
        console.table(this.alunos);
        console.log('Link de acesso da turma: ', this.#linkDeAcesso);
    }
}

let alunos = ['Ana', 'Joana', 'João'];
let linkAcesso = 'www.linkDeAcesso';
let turma = new Turma ('Informática Presencial', alunos);

turma.listarAlunos();
turma.removerAluno('Ana');
turma.adicionarAluno('Ana Júlia');
turma.listarAlunos();

/*
    QUESTÃO 9
*/

class Tarefa {
    constructor ( descricao, concluida ) {
        this.descricao = descricao;
        this.concluida = concluida;
    }

    marcarConcluida () {
        this.concluida = true;
    }

    descrever () {
        console.log(`A tarefa: 
                    ${this.descricao}
                    está concluída? ${this.concluida} `);
    }
}

class ListaTarefas {
    #listaTarefas = [];
    constructor () {
        
    }

    adicionarTarefa (tarefa) {
        this.#listaTarefas.push(tarefa);
    }

    listarTarefasConcluidas () {
        let tarefas = this.#listaTarefas.filter(tarefa => tarefa.concluida === true);
        console.table(tarefas, ['descricao', 'concluida']);
    }
}

let tarefa1 = new Tarefa('Fazer trabalho de história', false);
let tarefa2 = new Tarefa('Fazer trabalho de química', false);
let tarefa3 = new Tarefa('Ir ao mercado', false);

let listaDeTarefas = new ListaTarefas();
listaDeTarefas.adicionarTarefa(tarefa1);
listaDeTarefas.adicionarTarefa(tarefa2);
listaDeTarefas.adicionarTarefa(tarefa3);

listaDeTarefas.listarTarefasConcluidas();

/*
    QUESTÃO 10
*/

class Carro2 {
    constructor ( placa, modelo ) {
        this.placa = placa;
        this.modelo = modelo;
    }

    descrever () {
        console.log (`Placa.: ${this.placa}
                      Modelo: ${this.modelo}`);
    }
}

class Estacionamento {
    #carros = [];
    constructor ( vagasTotais ) {
        this.vagasTotais = vagasTotais;
        this.vagasOcupadas = 0;
    }

    adicionarCarro ( carro ) {
        if ((this.vagasTotais - this.vagasOcupadas) > 0) {
            this.#carros.push(carro);
            this.vagasOcupadas++;
        }
        else{
            console.log('Todas as vagas do estacionamento estão completas.');
        }
    }

    removerCarro (placaCarro) {
        this.#carros = this.#carros.filter(carro => carro.placa !== placaCarro);
        this.vagasOcupadas = this.#carros.length;
    }

    listarCarros () {
        console.table(this.#carros, ['placa', 'modelo']);
    }
}

let carro1 = new Carro2 ('XBL2024', 'BMW');
let carro2 = new Carro2 ('MDDFEHA', 'Fusca');
let carro3 = new Carro2 ('JSX4DFH', 'Vectra');

let estacionamento = new Estacionamento (2);

estacionamento.adicionarCarro(carro1);
estacionamento.adicionarCarro(carro2);
estacionamento.adicionarCarro(carro3);

estacionamento.listarCarros();

estacionamento.removerCarro('MDDFEHA');
estacionamento.adicionarCarro(carro3);
estacionamento.listarCarros();