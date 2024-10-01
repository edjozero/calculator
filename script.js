/* 
VARIABLES
*/

let firstNum;

let secondNum;

let operator;

/* 
FUNCTIONS
*/

// math function
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