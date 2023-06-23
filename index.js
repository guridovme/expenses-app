
const CURRENCY ='руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';
const CHANGE_LIMIT_TEXT = "Введите новый лимит";


const inputNode=document.getElementById("expenseInput");
const categorySelectNode=document.getElementById("categorySelect");
const addButtonNode=document.getElementById("addButton");
const clearButtonNode = document.getElementById("clearButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList=document.getElementById("historyList");
const changeLimitBtn = document.getElementById("changeLimitBtn");
 

const limitNode = document.getElementById("limitValue");
let limit = parseInt(limitNode.innerText);


let expenses=[]; 


function getTotal() {
    let sum = 0;
    expenses.forEach(function (expense) {
        
        sum += expense.amount;
    });

    return sum;
};


function renderStatus() {
   
    const total = getTotal(expenses);
    totalValueNode.innerText = total;
    
    if (total <= limit) {
        
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats__statusText_positive";
    } else {
        
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};


function renderHistory () {
    historyList.innerHTML = "";
    
    expenses.forEach((expense) => {
    
    const historyItem = document.createElement("li");

   
    historyItem.innerText = `${expense.amount} ${CURRENCY} - ${expense.category}`;

    
    historyList.appendChild(historyItem);
  });
};


function render () {
    
    renderStatus();
    
    renderHistory();
};



function getExpenseFromUser () {
    return parseInt (inputNode.value);
}


function getSelectedCategory() {
    return categorySelectNode.value;
}


const clearInput = function (input) {
    input.value="";
};


function addButtonHandler() {
    
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
    return;
    }

    
    const currentCategory = getSelectedCategory();

    
    if (currentCategory === "Категория") {
    
    return;
    }
 
    
    const newExpense = {amount: currentAmount, category: currentCategory};
    console.log(newExpense);

    
    expenses.push(newExpense);
    
    render();

    
    clearInput(inputNode);
}


function clearButtonHandler() {
    expenses=[];
    render();
};


function changeLimitHandler() {
    
    const newLimit = prompt(CHANGE_LIMIT_TEXT);

    
    const newLimitValue = parseInt(newLimit);

    if(!newLimitValue){
        return;
    }

    
    limitNode.innerText = newLimitValue;
    
    limit = newLimitValue;

    localStorage.setItem('limit',newLimitValue);

    
    render();
}


addButtonNode.addEventListener("click",addButtonHandler);
clearButtonNode.addEventListener("click",clearButtonHandler);
changeLimitBtn.addEventListener("click",changeLimitHandler);