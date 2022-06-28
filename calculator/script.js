/* This code takes input from the html and emulates 
a calculator with basic addition, subtraction, 
multiplication and division capabilities. It includes 
negative and decimal number functionalities. */

//initialize variables
let result = "";
let num = "";
let oper = "";
let stored = "";
let displayValue = "";
let historyValue = "";
let newDisplay = true; //tracks whether display should be refreshed
let newHistory = true; //tracks whether history should be refreshed

//create constants for referring to html elements
const display = document.querySelector('.display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('button');

//when a button is clicked, run calculator
buttons.forEach(button => {
    button.addEventListener('click', calculate)
});

//when a key is pressed, start calculation
window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "0") {
        // Trigger the button element with a click
        document.getElementById("0").click();
    } else if (event.key === "1") {
        document.getElementById("1").click();
    } else if (event.key === "2") {
        document.getElementById("2").click();
    } else if (event.key === "3") {
        document.getElementById("3").click();
    } else if (event.key === "4") {
        document.getElementById("4").click();
    } else if (event.key === "5") {
        document.getElementById("5").click();
    } else if (event.key === "6") {
        document.getElementById("6").click();
    } else if (event.key === "7") {
        document.getElementById("7").click();
    } else if (event.key === "8") {
        document.getElementById("8").click();
    } else if (event.key === "9") {
        document.getElementById("9").click();
    } else if (event.key === "Period") {
        document.getElementById(".").click();
    } else if (event.key === "Enter") {
        document.getElementById("enter").click();
    } else if (event.key === "+") {
        document.getElementById("add").click();
    } else if (event.key === "-") {
        document.getElementById("subtract").click();
    } else if (event.key === "*") {
        document.getElementById("multiply").click();
    } else if (event.key === "/") {
        document.getElementById("divide").click();
    }
  });

//runs calculator
function calculate(e) {
    console.log("calculate",result, num, oper)
    //if we just had an error, start new calc
    if (typeof displayValue == "string" && displayValue.includes("MOO!") == true) {
        console.log("clear the error")
        clear();
        newDisplay == true;
    } else if (e.srcElement.id == "clear") {
        clear();
        return;
    } else {
        //get and display input
        displayResult(getInput(e));

        //get and display history
        displayHistory(getHistory(e));
    }
    console.log("end of calculate",result, num, oper)
};

//gets result from buttons
function getInput(e) {
    console.log("getInput",result, num, oper)
    //get number
    if (e.srcElement.className == "num") {
        //if hitting a new number after getting result, start new calc
        if (result !="" && oper == "") {
            clear();
            num += e.srcElement.id;
            return(num);
        } else {
            num += e.srcElement.id;
            return(num);
        }
    //get operator
    } else if (e.srcElement.className == "oper") {
        if (result=="" && num=="" && oper=="") {
            return("")
        }
        //if operator is pressed twice, set operator to latest operator
        if (oper != "") {
            if (num == "") {
                stored = result;
                return(result);
            } else {
                result = getResult(e);
                if (typeof result == "number" && result%1 !==0) {
                    stored = result.toFixed(4);
                } else if (typeof result == "number" && result>1000000) {
                    stored = result.toExponential(2);
                } else {
                    stored = result;
                }
                oper = e.srcElement.id;
                return(result);
            }
        } else if (result == "") {
            console.log("filling in result")
            result = num;
            num = "";
            oper = e.srcElement.id;
            return(result);
        } else if (newDisplay == true) {
            return;
        } else {
            oper = e.srcElement.id;
            return(result);
        }
    //get result
    } else if (e.srcElement.id == "enter") {
        if (result=="" && num=="" && oper=="") {
            return("")
        } else {
            return(getResult());
        }
    }
}

//gets history from buttons
function getHistory(e) {
    if (result=="" && num=="" && oper=="") {
        return("");
    }
    //if button is a number, add number to history value and display
    if (e.srcElement.className == "num") {
        stored += e.srcElement.id;
        return(stored);
    //if button is an operator, add number to history value with spaces and display
    } else if (e.srcElement.className == "oper") {
        stored += " " + e.srcElement.outerText + " ";
        return(stored);
    //if button is enter, add enter to history value with spaces, display, refresh history and set history to result
    } else if (e.srcElement.id == "enter") {
        stored += " " + e.srcElement.outerText + " ";
        var v = stored;
        newHistory = true;
        if (typeof result == "number" && result%1 !==0) {
            stored = result.toFixed(4);
        } else if (typeof result == "number" && result>1000000) {
            stored = result.toExponential(2);
        } else {
            stored = result;
        }
        return(v);
    }
}

//get result
function getResult(e) {
    console.log("getting result...")
    //convert result to float
    if (result != "") {
        result = parseFloat(result);
    }
    //convert num to float
    if (num != "") {
        num = parseFloat(num);
    }
    //if no operator is present, just display the number
    if (oper=="") {
        if (result == "") {
            result = num;                
        }
        num = "";
        console.log("no oper")
        return(result);
    //smooooth operator  
    } else {
        if (result !== "" && num !== "" && oper !== "") {
            result = operate(result,num,oper);
            console.log("oper", result, num, oper)
            num = "";
            oper = "";
        }
        return(result);
    }
}

//calls operations on numbers input by user
function operate(result,num,oper) {
    if (oper == "add") {
        result = add(result,num);
        return result;
    } else if (oper =="subtract") {
        result = subtract(result,num)
        return result;

    } else if (oper =="multiply") {
        result = multiply(result,num)
        return result;

    } else if (oper =="divide") {
        result = divide(result,num)
        return result;
    } 
};

//displays result or current value in lower part of window
function displayResult(value) {
    //if we're in an error state, skip
    if (typeof displayValue == "string" && displayValue.includes("MOO!") == true) {
        console.log("skip display result")
        return;
    // if nothing to show, return
    } else if (result=="" && num=="") {
        return;
    }
    // if not a new display, remove existing content
    if (displayValue != "") {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
    }
    var v = document.createElement('text');
    if (value == "divByZero") {
        displayError(2);
        return;
    } else if (value == "-" || value == ".") {
        v.textContent = value;
    } else if (isNaN(value) == true) {
        console.log("NaN error")
        displayError(1);
        return;
    } else if (typeof value == "number" && value%1 !==0) {
        v.textContent = value.toFixed(4);
    } else if (typeof value == "number" && value>1000000) {
        v.textContent = value.toExponential(2);
    } else {
        v.textContent = value;
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v.textContent;
    newDisplay = false;
}

//displays history in upper part of window
function displayHistory(value) {
    //if we're in an error state, skip
    if (typeof displayValue == "string" && displayValue.includes("MOO!") == true) {
        console.log("skip display history")
        return;
    // if nothing to show, return
    } else if (result=="" && num=="") {
        return;
    }
    //if not a new display, remove existing content
    if (historyValue != "") {
        var v = document.querySelector('.historyValue');
        history.removeChild(v);
    }
    var v = document.createElement('text');
    v.textContent = value;    
    v.classList.add('historyValue');
    history.appendChild(v);
    historyValue = v.textContent;
}

//displays errors in lower part of window
function displayError(a) {
    var v = document.createElement('text');
    if (a == 1) {
        v.textContent="MOO! ERROR"
    } else if (a == 2) {
        v.textContent="MOO! DIV BY 0"
    } else {
        v.textContent="ERROR"
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v.textContent;
}

//resets values and clears display
function clear() {
    if (newDisplay == false) {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
        var w = document.querySelector('.historyValue');
        history.removeChild(w);
        newDisplay = true;
    }
    displayValue = "";
    historyValue = "";
    stored = "";
    result = "";
    num = "";
    oper = "";
};

//core calculation functions
const add = function(a,b) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
  };
  
const subtract = function(a,b) {
if (typeof a === "number" && typeof b === "number") {
    return a - b;
}
};

const multiply = function(a,b) {
if (typeof a === "number" && typeof b === "number") {
    return a * b;
    }
};

const divide = function(a,b) {
if (typeof a === "number" && typeof b === "number") {
    if (b == 0) {
        return "divByZero";
        } else {
        return a / b;
        }
    }
};