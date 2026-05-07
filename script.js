/* 
VARIABLES
*/

let numOne = "";
let oper = "";
let numTwo = "";
let resultDisplayed = false;

const buttons = document.querySelectorAll("button");

let display = document.querySelector("#daDisplay");
let mathExpression = document.querySelector("#expressionInput");


/* 
FUNCTIONS
*/

// math functions

function add(a, b){
    let addition = a + b;

    if(!Number.isInteger(addition)){
        return parseFloat(addition.toFixed(2));
    }

    return addition;
}

function subtract(a,b){
    let subtraction = a - b;

    if(!Number.isInteger(subtraction)){
        return parseFloat(subtraction.toFixed(2));
    }

    return subtraction;
}

function multiply(a,b){
    let multi = a * b;

    if(!Number.isInteger(multi)){
        return parseFloat(multi.toFixed(2));
    }

    return multi;
}

function divide(a,b){
    let division = a / b;

    if(!Number.isInteger(division)){
        return parseFloat(division.toFixed(2));
    }

    return division;
}

// calculator display functions

// adding clicked buttons to the display
function appendValue(value){
    if(resultDisplayed && !isNaN(value)){
        display.value = "";
        resultDisplayed = false;
    }
    display.value += value;
}

// update expression input
function updateExpression(value){
    mathExpression.value += value;
}

// clearing the display
function clearDisplay(){
    display.value = "";
    mathExpression.value = "";
    numOne = "";
    numTwo = "";
    oper = "";
    resultDisplayed = false;
}

// backspace/delete one value at a time
function deleteBackspace(){
    display.value = display.value.slice(0, -1);
    mathExpression.value = mathExpression.value.slice(0, -1);
}


// function that takes number variables and operator, then calls one of the math functions

function operate(ope, num1, num2){
    if(ope === "+"){
        return add(num1, num2);
    }else if(ope === "-"){
        return subtract(num1, num2);
    }else if(ope === "x"){
        return multiply(num1, num2);
    }else if(ope === "÷"){
        return divide(num1, num2);
    }
}

// function to split what is entered into the display into the previously created variables and allow chaining operations

function chainingOperations(op){
    if(numOne === ""){
        // if numOne is still empty, take the current display as numOne
        numOne = parseFloat(display.value); 
    }else if(numTwo === "" && oper){
        // if oper is filled (meaning true here) and numTwo is empty, take the current display value as numTwo
        numTwo = parseFloat(display.value);

        // perform the math and show the result
        let result = operate(oper, numOne, numTwo);
        display.value = result;
        numOne = result; // store the result in numOne for the next operation
        numTwo = ""; // clear numTwo for next user input 
    }

    oper = op; // sets the new operator to chain operations
    resultDisplayed = true; 
}

// function that will handle the final calculation via the equals sign
function finalCalculation(){

    if(numOne !== "" && oper){

        numTwo = parseFloat(display.value);

        let result = operate(oper, numOne, numTwo);

        display.value = result;

        mathExpression.value = `${numOne} ${oper} ${numTwo} =`;

        numOne = result;
        numTwo = "";
        oper = "";

        resultDisplayed = true;
    }
}


/* 
LISTENERS 
*/

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let buttonValue = e.target.value;

        if(e.target.classList.contains("submitMath")){
            finalCalculation();
        }

        else if(e.target.classList.contains("clear")){
            clearDisplay();
        }

        else if(e.target.classList.contains("delete")){
            deleteBackspace();
        }

        else if(e.target.classList.contains("operators")){

            // if result was just displayed, reset expression
            if(resultDisplayed){
                mathExpression.value = `${display.value} ${buttonValue}`;
            }
            else{
                updateExpression(buttonValue);
            }

            chainingOperations(buttonValue);
        }

        else{
            appendValue(buttonValue);
            updateExpression(buttonValue);
        }
    });
});

document.addEventListener("keydown", (e) => {

    let key = e.key;

    // numbers and decimal
    if(!isNaN(key) || key === "."){
        appendValue(key);
        updateExpression(key);
    }

    // operators
    else if(key === "+" || key === "-"){
        if(resultDisplayed){
            mathExpression.value = `${display.value} ${key}`;
        }
        else{
            updateExpression(key);
        }

        chainingOperations(key);
    }

    // multiplication
    else if(key === "*"){
        if(resultDisplayed){
            mathExpression.value = `${display.value} ${key}`;
        }
        else{
            updateExpression(key);
        }

        chainingOperations(key);
    }

    // division
    else if(key === "/"){
        if(resultDisplayed){
            mathExpression.value = `${display.value} ${key}`;
        }
        else{
            updateExpression(key);
        }

        chainingOperations(key);
    }

    // equals / enter
    else if(key === "Enter" || key === "="){
        finalCalculation();
    }

    // backspace
    else if(key === "Backspace"){
        deleteBackspace();
    }

    // clear calculator
    else if(key.toLowerCase() === "c"){
        clearDisplay();
    }
});