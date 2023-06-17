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

function renderHistory(expenses) {
    historyList.innerHTML = '';

    expenses.forEach((expense) => {
        const historyItem = document.createElement("li");
        historyItem.className = "rub";
        historyItem.innerText = expense;

        historyList.appendChild(historyItem) ;
    }); 
};


function render (expenses){
    const sum = calculateExpenses(expenses);
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);

};








buttonNode.addEventListener('click', function() {
    const expense = getExpanseFromUser();
    if (!expense) {

        return;
    }
    
    trackExpanse(expense);

    render(expenses);
}); 

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT; 
    sumNode.innerText = calculateExpenses(expenses);
};

function trackExpanse(expense) {
    expenses.push(expense);
};

function getExpanseFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense=parseInt (inputNode.value);

    clearInput();

    inputNode.value='';

    return expense;

};

function clearInput() {

    inputNode.value='';
};









function renderSum(sum) {

    sumNode.innerText = sum;

};


const clearButtonHandler = () => {
    expenses=[];
    render();
};

clearButtonNode.addEventListener("click",clearButtonHandler);