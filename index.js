const CURRENCY ='руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode=document.getElementById("expenseInput");
const addButtonNode=document.getElementById("addButton");
const clearButtonNode = document.getElementById("clearButton");
const limitNode = document.getElementById("limitValue");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList=document.getElementById("historyList");

let expenses=[];
const limit = parseInt(limitNode.innerText);

const getTotal = () => {
    let sum = 0;
    expenses.forEach((expense) => {
        sum += expense;
    });

    return sum;
};

const renderStatus = () => {
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};

const renderHistory = () => {
    historyList.innerHTML = "";

    expenses.forEach((expense) => {
        const historyItem = document.createElement("li");
        historyItem.className = "rub";
        historyItem.innerText = expense;

        historyList.appendChild(historyItem) ;
    }); 
};


const render = () => {
    renderStatus();
    renderHistory();
};


const getExpenseFromUser = () => parseInt (inputNode.value);

const clearInput = () => {
    inputNode.value="";
};

function addButtonHandler() {
    const expense = getExpenseFromUser();
    if (!expense) {
    return;
    }
    expenses.push(expense);
    console.log(expenses);
    render();
    clearInput();
}

const clearButtonHandler = () => {
    expenses=[];
    render();
};

addButtonNode.addEventListener("click",addButtonHandler);
clearButtonNode.addEventListener("click",clearButtonHandler);