const expenses=[];
const inputNode=document.querySelector('.js-input');
const buttonNode=document.querySelector('.js-button');

buttonNode.addEventListener('click', function() {
    if (inputNode.value==='') {
        return;
    }
    const expense=parseInt (inputNode.value);
    expenses.push(expense);
    inputNode.value='';
});