/* 
VARIABLES
*/

let firstNum;

let secondNum;

let operator;

const buttons = document.querySelectorAll("button");

let display = document.querySelector("#daDisplay");

/* 
FUNCTIONS
*/

// math functions

function add(a, b){
    return a + b;
}

function subtract(a,b){
    return a - b
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

// calculator display functions

// adding clicked buttons to the display
function appendValue(value){
    display.value += value;
}

// clearing the display
function clearDisplay(){
    display.value = '';
}

// backspace/delete one value at a time
function deleteBackspace(){
    let currentValue = display.value;
    display.value = currentValue.slice(0, -1);
}


// function that takes number variables and operator, then calls one of the math functions

function operate(ope, num1, num2){
    if(ope === "+"){
        return add(num1, num2);
    }else if(ope === "-"){
        return subtract(num1, num2);
    }else if(ope === "*"){
        return multiply(num1, num2);
    }else if(ope === "/"){
        return divide(num1, num2);
    }
}

/* 
LISTENERS 
*/

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        appendValue(e.target.value);

        if(e.target.classList.contains("clear")){
            clearDisplay();
        }

        if(e.target.classList.contains("delete")){
            deleteBackspace();
        }
    });
});