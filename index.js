const expenses=[];
const inputNode=document.querySelector('.js-input');
const buttonNode=document.querySelector('.js-button');

buttonNode.addEventListener('click', function() {
    if (inputNode.value==='') {
        console.log('пустая строка в поле ввода');
    }
    const expense=parseInt (inputNode.value);
    expenses.push(expense);
    inputNode.value='';
});