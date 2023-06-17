const LIMIT = 10000;
const CURRENCY ='руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';


const inputNode=document.querySelector('.js-input');
const buttonNode=document.querySelector('.js-button');
const historyNode=document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const clearButtonNode = document.getElementById("clearButton");

let expenses=[];

init(expenses);

const calculateExpenses = () => {
    let sum = 0;

    expenses.forEach((expense) => {
        sum += expense;
    });

    return sum;

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




function render (expenses){
    const sum = calculateExpenses(expenses);
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);

};


function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    }); 
    
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
};
function renderSum(sum) {

    sumNode.innerText = sum;

};
function renderStatus(sum){
    
    if (sum<=LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};

const clearButtonHandler = () => {
    expenses=[];
    render();
};

clearButtonNode.addEventListener("click",clearButtonHandler);