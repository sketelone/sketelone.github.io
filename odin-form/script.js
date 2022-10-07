/* This code validates input from html form
and */ 

//create constants for referring to html elements
const submit = document.getElementById('submit');
const phone = document.getElementById('phone_number');
const inputs = document.querySelectorAll("input");
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');


//when user submits form, check if passwords match
submit.addEventListener("click",function(event) {
    var pass = password.value;
    var conPass = confirm_password.value;
    if (passwordMatch(pass,conPass) == false) {
            console.log(pass,conPass)
            confirm_password.setCustomValidity("Passwords do not match!");
            confirm_password.reportValidity();
    } else {
        confirm_password.setCustomValidity("");
    }
    inputs.forEach(input => {
        validate(input);
    })
})

//when user input phone number, validate input
phone.addEventListener('input', (event) => {
    phone.setCustomValidity("");
    if (phone.validity.valueMissing) {
        phone.setCustomValidity("Please fill out this field.");
    } else if (phone.validity.patternMismatch) {
        phone.setCustomValidity("Please enter a valid 9-digit phone number.");
    } else {
        phone.setCustomValidity("");
    }
})

//when user inputs anything, validate input
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        validate(input);
    })
})

//show error if input is invalid 
function validate(i) {
    console.log("validation")
    if (i.validity.valid) {
        var inputError = document.querySelector("." + i.name + "_error");
        console.log(inputError)    
        inputError.textContent = "";
    } else {
        showError(i);
    }
}

// check if passwords match
function passwordMatch(a, b) {
    console.log("password match", a, b)
    if (a != b) {
        return(false);
        console.log()
    } else {
        return(true);
    }
}

//show validation message as error
function showError(i) {
    console.log("show an error")
    var inputError = document.querySelector("." + i.name + "_error");
    console.log(inputError)
    inputError.textContent = i.validationMessage;
}