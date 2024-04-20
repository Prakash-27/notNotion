const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const message = document.getElementById("message");

let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];


function updateStatistics() {
    const updatedIncome = transactions
                            .filter(transaction => transaction.amount > 0)
                            .reduce((total, transaction) => total += transaction.amount, 0);
    // console.log(updatedIncome);                        

    const updatedExpense = transactions
                             .filter(transaction => transaction.amount < 0)
                             .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);
    // console.log(updatedExpense);

    updatedBalance = updatedIncome - updatedExpense;
    balance.textContent = updatedBalance;
    income.textContent = updatedIncome;
    expense.textContent = updatedExpense;
}


function generateTemplate(id, source, amount, time) {
    return `<li data-id="${id}">
                <p>
                    <span>${source}</span>
                    <span id="time">${time}</span>
                </p>
                <span>$${Math.abs(amount)}</span>
                <i class="bi bi-trash delete"></i>
            </li>`;
}


function addTransactionDOM(id, source, amount, time) {
    if (amount > 0) {
        incomeList.innerHTML += generateTemplate(id, source, amount, time);
    } else {
        expenseList.innerHTML += generateTemplate(id, source, amount, time);
    }
}


function addTransaction(sourceValue, amountValue) {
    const time = new Date();
    const transaction = {
        id: Math.floor(Math.random()*100000),
        source: sourceValue,
        amount: amountValue,
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransactionDOM(transaction.id, sourceValue, amountValue, transaction.time);
}

form.addEventListener("submit", event => {
    event.preventDefault();
    // console.log(form.source.value, form.amount.value);
    if (form.source.value.trim() === "" || form.amount.value.trim() === "") { 
            message.style.color = "red";
            return message.innerText = "Please add proper values!";
        // return alert("Required: Please add proper values!");
    }
    addTransaction(form.source.value.trim(), Number(form.amount.value.trim()));
    updateStatistics();
    form.reset();
});


function getTransaction() {
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            incomeList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        } else {
            expenseList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }
    });
}


function deleteTransaction(id) {
    // console.log(id);
    transactions = transactions.filter(transaction => {
        // console.log(transaction.id, id);
        return transaction.id !== id;
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


incomeList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        // console.log(event.target);
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics();
    }
});


expenseList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        // console.log(event.target);
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics();
    }
});


function initializationOfPage() {
    // initialization of page we have to call this function and also after every reload of page we gonna call it.
    updateStatistics();
    getTransaction();
}

initializationOfPage();
