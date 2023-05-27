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


const expenses=[];


init();

function init() {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT; 
    sumNode.innerText = 0;
};

buttonNode.addEventListener('click', function() {
    // 1. Получаем значение из поля ввода
    if (!inputNode.value) {
        return;
    }

    const expense=parseInt (inputNode.value);
    inputNode.value='';

    // 2. Сохраняем трату в список
    expenses.push(expense);

    // 3. Выведем новый список трат
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    }); 
    
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 3. Посчитать сумму и вывести ее
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });
    
    sumNode.innerText = sum;

    // 3. Сравнение с лимитом и вывод статуса
    if (sum<=LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }

}); 