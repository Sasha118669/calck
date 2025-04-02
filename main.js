const main = document.querySelector('.main');
const input = document.querySelector('#userChoice');
const btn = document.querySelectorAll('.btn');
const remover =  document.getElementById('remover');
let operand = null,
     operator = null,
     concat = true;

main.addEventListener('click', event => {
    
    if(event.target.classList.contains('btn')){   
        let keyValue = event.target.textContent;
       
        if(! isNaN(keyValue) || keyValue === '.'){

          if(concat){
            if(keyValue === '.'){
              input.value += keyValue;
            } else {
              input.value = keyValue;
            }
            concat = false;
          return;
        }
  
          if(input.value === '0' && keyValue !== '.'){
          input.value = keyValue;
          return;
          }
          if(( keyValue === '.') && input.value.includes('.') || input.value.length > 9){
          return;
          }
          input.value += keyValue;

        } else if(keyValue === "AC"){
          input.value = "0"; 
         operand = null;
         operator = null;
         concat = true;

        } else if(keyValue === '+/-' && input.value !== '0'){
          input.value = -parseFloat(input.value);
        
        } else if(keyValue === '%'){
          if(operator ==='+'){
           input.value = parseFloat(operand) + (parseFloat(operand) * parseFloat(input.value)) / 100;
          
          } if(operator ==='-'){
            input.value = parseFloat(operand) - (parseFloat(operand) * parseFloat(input.value)) / 100;
           
           } else if (operator === "*") {
            input.value = parseFloat(operand) * (parseFloat(input.value) / 100);

          } else if (operator === "/") {
            input.value = parseFloat(operand) / (parseFloat(input.value) / 100);

          } else {
            input.value = parseFloat(input.value) / 100;
          }

        } else if(['+' , '-', '*', '/'].includes(keyValue)){
        if(operand !== null && operator !== null){
          input.value = doOperation(operand, operator, input.value);
          operand = input.value;
        } else{ 
          operand = input.value;
        }
        operator = keyValue;
        concat = true;
        return;
        
        } else if(keyValue === '='){
          if(operand === null && operator === null){
            concat = true;  
            return;
          }
         if(operand !== null && operator !== null && input.value !== ''){
          input.value = doOperation(operand, operator, input.value);
          operand = null;
          operator = null;
          concat = true;
         } 
        }
    }
})


const doOperation = (operand1, operator, operand2) =>{
  if(operator === "/" && parseFloat(operand2) === 0){
    return '(－‸ლ)';
  }
  switch (operator) {
    case "+": return parseFloat(operand1) + parseFloat(operand2);
    case "-": return parseFloat(operand1) - parseFloat(operand2);
    case "*": return parseFloat(operand1) * parseFloat(operand2);
    case "/": return parseFloat(operand1) / parseFloat(operand2);
    case "**": return parseFloat(operand1) ** parseFloat(operand2);
    default: return null;
}
}
