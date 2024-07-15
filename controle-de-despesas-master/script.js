// Script contendo as funções para o aplicativo de despesas/controle de despesas

// Elementos do DOM

const transaction_ul = document.getElementById('transactions');
const income_display = document.querySelector('#money-plus');
const expense_display = document.querySelector('#money-minus');
const balance_display = document.getElementById('balance');
const form = document.querySelector("#form");
const input_transaction_name = document.querySelector("#text");
const input_transaction_amount = document.querySelector("#amount");


const local_storage_transactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? local_storage_transactions : []


const remove_transaction = ID =>{
    transactions = transactions.filter(transaction => transaction.id !== ID);
    update_local_storage();
    init()
}

const add_transactions_into_DOM = ({amount, name, id}) =>{
    const operator = amount < 0 ? '-':'+';
    const CSS_class = amount < 0 ? 'minus':'plus';
    const amount_without_operator = Math.abs(amount);
    const li = document.createElement('li');

    li.classList.add(CSS_class);
    li.innerHTML = `${name} <span>${operator} R$ ${amount_without_operator}</span>
    <button class="delete-btn" onClick="remove_transaction(${id})">x</button>`;
    transaction_ul.append(li)
}

const get_expenses = transactions_amount => Math.abs(transactions_amount.filter((item) =>{item < 0}).reduce((accumulator, value) => accumulator + value, 0)).toFixed(2);

const get_income = (transactions_amount) => transactions_amount.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);

const get_total = (transactions_amount) => transactions_amount.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)

const update_balance_values = () =>{
    let transactions_amount = transactions.map(({amount }) => amount);
    let total = get_total(transactions_amount);
    let income = get_income(transactions_amount);
    let expense = get_expenses(transactions_amount);

    // Add info na página

    balance_display.textContent = `R$ ${total}`
    income_display.textContentb = `R$ ${income}`
    expense_display.textContent = `R$ ${expense}`
}

// loop
const init = () =>{
    transaction_ul.innerHTML = ''
    transactions.forEach(add_transactions_into_DOM);
    update_balance_values()
}

init()

const update_local_storage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generate_id = () => Math.round(Math.random() * 1000)

const add_to_transactions_array = (transaction_name, transaction_amount) => {
    transactions.push({
        id: generate_id(),
        name: transaction_name, 
        amount: Number(transaction_amount)
    });
}

const clean_inputs = () =>{
    input_transaction_name.value = '';
    input_transaction_amount.value = '';
}


const handle_form_submit = event =>{
    event.preventDefault();

    const transaction_name = input_transaction_name.value.trim();
    const transaction_amount = input_transaction_amount.value.trim();
    const is_some_input_empty = transaction_name === '' || transaction_amount === ''

    if(is_some_input_empty){
        alert('Por favor, preencha todos os campos presentes.');
        return;
    }

    add_to_transactions_array(transaction_name, transaction_amount);

    init();

    update_local_storage();

    clean_inputs();
}

form.addEventListener('submit', handle_form_submit);