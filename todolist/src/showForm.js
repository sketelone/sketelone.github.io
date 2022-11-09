import 'date-fns'

/**
 * function to create form element 
 * @param {array} items - list of form inputs
 * @returns {HTMLFormElement} constructed form
 */
export default function showForm (items){
    //create html elements
    let form = document.createElement('form');
    form.classList.add("form-popup", "form-todo");
    form.noValidate = true;

    //create and add inputs for each item except notes
    let temp = [];
    temp = items.pop();
    items.forEach (item => {
        var container = makeTodoDiv(item, 'todo-input');
        form.appendChild(container);

    })

    //create and add close form button
    let close = document.createElement('button');
    close.innerHTML = "&times;";
    close.type = "button";
    close.id = "close";
    close.addEventListener('click', closeForm);
    form.appendChild(close);

    //create and add input for notes
    var container = makeTodoDiv(temp, 'todo-notes');
    form.appendChild(container);

    //create and add submit form button
    let submit = document.createElement('button');
    submit.innerHTML = "&#10003;";
    submit.type = "submit";
    submit.id = "submit";
    form.appendChild(submit);

    return form;

    /**
     * function to hide form 
     */
    function closeForm() {
        document.getElementsByClassName("form-todo")[0].style.display = "none";
        document.getElementsByClassName("form-todo")[0].reset();
    }

    /**
     * 
     * @param {array} item - input with list of properties
     * @param {string} className - class name for divs
     * @returns {HTMLDivElement} constructed div
     */
    function makeTodoDiv(item, className) {
        //create HTML element
        var container = document.createElement('div');
        container.classList.add(className)

        //create input
        var input = document.createElement('input');
        input.autocomplete="off";
        input.type = item[2];
        input.id = item[0];
        input.name = item[0];
        if (item[3]) {
            input.placeholder = item[3];
        }
        input.required = item[4];

        //create error span
        var span = document.createElement('span');
        span.classList.add(item[0] + "_error");
        span.classList.add("error");
        span.innerHTML = "";
        span.ariaLive = "polite";

        container.appendChild(input);
        container.appendChild(span);
        
        return container;

    }
}



