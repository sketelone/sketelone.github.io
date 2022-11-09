import { isPast, isToday, parseISO } from "date-fns";
import addTodo from "./addTodo";
import showProject from "./showProject";
import {PROJECT_LIBRARY} from "./projectLibrary";
import pushLibrary from "./pushLibrary";

/**
 * function to get form and update page
 */
export default function getForm() {
    //get info from form
    const form = document.querySelector('.form-todo');
    const title = document.getElementById('title');
    const dueDate = document.getElementById('dueDate');
    const notes = document.getElementById('notes');
    const submit = form.querySelector('#submit');
    const inputs = document.querySelectorAll("input");
    const currentProject = document.getElementById("current-project");
    const myProjects = PROJECT_LIBRARY;

    //add custom date validation
    dateValidation(dueDate);

    //when user inputs anything, validate input
    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            validate(input);
        })
    })

    //when user submits form, add todo to current project
    submit.addEventListener('click', function(event) {
        event.preventDefault();
        var formValid = true;
        var project;
        //validate form
        inputs.forEach(input => {
            if (validate(input) == false) {
                formValid = false;
            }
        }) 
        //if form is valid, add todo to current project and show project
        if (formValid == true) {
            myProjects.forEach(proj => {
                if (proj.name == currentProject.textContent) {
                    project = proj;
                }
            })
            addTodo(title.value, dueDate.value, notes.value, project);
            pushLibrary();
            showProject(project)
            form.reset();
            form.style.display = "none";
        } 
    })

}

/*VALIDATION*/
/**
 * function to validate date input
 * @param {HTMLInputElement} dueDate - todo due date
 */
function dateValidation(dueDate) {
    dueDate.addEventListener('input', (e) => {
        dueDate.setCustomValidity("");
        //check date is not in the past
        if (isPast(parseISO(dueDate.value)) && !isToday(parseISO(dueDate.value))) {
            dueDate.setCustomValidity("Please select future date.");
        } else {
            dueDate.setCustomValidity("");
        }
    })
}

/**
 * function to show error if input is invalid 
 * @param {HTMLInputElement} i - input
 * @returns {false} if input is invalid
 */
function validate(i) {
    if (i.validity.valid) {
        clearError(i);
    } else {
        showError(i);
        return false
    }
}

/**
 * function to clear errors if input is updated to be valid
 * @param {HTMLInputElement} i - input
 */
function clearError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = "";
}

/**
 * function to show validation message as error
 * @param {HTMLInputElement} i input
 */
function showError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = i.validationMessage;
}
