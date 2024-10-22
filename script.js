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
    return a + b;
}

function subtract(a,b){
    return a - b;
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

// function to split what is entered into the display into the previously created variables 
function splitValue(){
    let currValue = display.value; 

    const valueArr = currValue.split("");

    for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] === "+" || 
            valueArr[i] === "-" || 
            valueArr[i] === "x" || 
            valueArr[i] === "÷") {

            if(numOne === ""){
                numOne = parseFloat(valueArr.slice(0, i).join(""));
            }

            oper = valueArr[i];

            numTwo = parseFloat(valueArr.slice(i + 1).join(""));

            break; 

        }
    }

    if(numOne !== "" && numTwo !== ""){
        let result = operate(oper, numOne, numTwo);
        display.value = result;
        numOne = result;
        numTwo = "";
        resultDisplayed = true;
    }

    // display.value = operate(oper, numOne, numTwo);

    // console.log(display.value);
}

/* 
LISTENERS 
*/

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let buttonValue = e.target.value;

        if(e.target.classList.contains("submitMath")){
            splitValue();
        }

        else if(e.target.classList.contains("clear")){
            clearDisplay();
        }

        else if(e.target.classList.contains("delete")){
            deleteBackspace();
        }

        else{
            appendValue(buttonValue);
            updateExpression(buttonValue);
        }
    });
});