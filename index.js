const expenses=[];

const inputNode=document.querySelector('.js-input');
const buttonNode=document.querySelector('.js-button');
const historyNode=document.querySelector('.js-history');


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
        const elementHTML = `<li>${expense}</li>`;
        expensesListHTML += elementHTML;
    }); 
    
    
    const html=`<ol><li>${expense}</li></ol>`;
    historyNode.innerHtml = `<ol>${expensesListHTML}</ol>`;
}); 