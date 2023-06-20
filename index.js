// Объявление переменных - строковых констант
const CURRENCY ='руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

// Объявление переменных - ссылок на html элементы
const inputNode=document.getElementById("expenseInput");
const categorySelectNode=document.getElementById("categorySelect");
const addButtonNode=document.getElementById("addButton");
const clearButtonNode = document.getElementById("clearButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList=document.getElementById("historyList");

// Получает лимит из элемента HTML с id limitValue
const limitNode = document.getElementById("limitValue");
const limit = parseInt(limitNode.innerText);

// Объявление нашей основной переменной
// При запуске она содержит пустой массив
// который мы пополняем по нажатию на кнопку Добавить
let expenses=[]; 

// ---ФУНКЦИИ------------------------------------- 

// Подсчитывает и возвращает сумму всех трат
function getTotal() {
    let sum = 0;
    expenses.forEach(function (expense) {
        // пробегаем по массиву объектов expense, берем из каждого поле amount
        // и прибавляем к пепременной sum
        sum += expense.amount;
    });

    return sum;
};

// Отрисовывает (обновляет) блок с "Всего", "Лимит" и "Статус"
function renderStatus() {
    // создаем переменную total (всего) и записываем в нее результат выполнения getTotal
    const total = getTotal(expenses);
    totalValueNode.innerText = total;
    // условие сравнение - что больше: всего или лимит
    if (total <= limit) {
        // всего меньше чем лимит - все хорошо
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats__statusText_positive";
    } else {
        // всего больше чем лимит - все плохо
        // шаблонная строка  - строка в которую можно вставить переменные
        // тут вставлена переменная STATUS_OUT_OF_LIMI
        // и будет вставлено значение разницы между лимитом и общей суммой расходов
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};

// отрисовывает (обновляет) блок
function renderHistory () {
    historyList.innerHTML = "";
    // сокращенная запись
    // expenses.foreach((expense) => {

    // цикл по массиву expenses, где каждый элемент - запись о расходе (сумма и категория)
    expenses.forEach((expense) => {
    // создание элемента li  (он пока создан только в памяти)
    const historyItem = document.createElement("li");

    // через свойство className также можно прописывать классы
    // historyItem.className = "rub";

    // снова создаем шаблонную строку
    // формата "категория" - "сумма" (а не наоборот, чтобы не усложнять html)
    historyItem.innerText = `${expense.amount} ${CURRENCY} - ${expense.category}`;

    // берем наш li из памяти и вставляем в документ, в конец historyList
    historyList.appendChild(historyItem);
  });
};

//Отрисовывает (обновляет) весь интерфейс (в нашем случае - историю, всего, статус)
function render () {
    //вызываем функцию обновления статуса и "всего"
    renderStatus();
    //вызываем функцию обновления истории
    renderHistory();
};

//Возвращает введенную пользователем сумму

function getExpenseFromUser () {
    return parseInt (inputNode.value);
}

// Возвращает выбранную пользователем категорию
function getSelectedCategory() {
    return categorySelectNode.value;
}


// функция очистки поля ввода суммы
// на вход получает переменную input, в которой мы ожидаем html элемент input

// альтернативы
/*
function clearInput(input) {
    input.value = "";
}
*/


const clearInput = function (input) {
    input.value="";
};


// const clearInput = (input) => {
//     input.value = "";
// }


// функция-обработчик, которая будет вызвана при нажатии на кнопку Добавить
function addButtonHandler() {
    // сохранияем в переменную currentAmount введенную сумму
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
    return;
    }

    // сохраняем в переменную currentCategory выбранную категорию
    const currentCategory = getSelectedCategory();

    // если текущая Категория равна значению Категория
    if (currentCategory === "Категория") {
    // тогда выйди из функции, т.к. это значение говорит нам о том  
    // что пользователь не выбрал категорию
    return;
    }
 
    // из полученных переменных собираем объект newExpense(новыйРасход) 
    // который состоит из двух полей - amount, в которое записано значение currentAmount
    // и category, в которое записано значение currentCategory
    const newExpense = {amount: currentAmount, category: currentCategory};
    console.log(newExpense);

    //Добавляем наш новыйРасход в массив расходов
    expenses.push(newExpense);
    
    // console.log(expenses);

    // перерисовываем интерфейс
    render();

    // сбрасываем введенную сумму
    clearInput(inputNode);
}

// функция-обработчик кнопки Сбросить расходы
function clearButtonHandler() {
    expenses=[];
    render();
};

// Привязка функций-обработчиков к кнопкам
addButtonNode.addEventListener("click",addButtonHandler);
clearButtonNode.addEventListener("click",clearButtonHandler);