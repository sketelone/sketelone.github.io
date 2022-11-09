import 'date-fns'
import { format, parseISO, isPast } from 'date-fns';
import 'material-symbols';
import pushLibrary from './pushLibrary';
import removeTodo from './removeTodo';

/**
 * function to show todo list item
 * @param {Todo} todo - todo
 * @param {num} i - index of todo in project list
 */
export default function showTodo(todo, i) {
    // get root HTML container
    const todoContainer = document.querySelector(".todo-container");

    //create div container
    let item = document.createElement('div');
    item.classList.add("todo");
    item.id = i;

    //create checkbox
    let checkbox = document.createElement('span');
    checkbox.classList.add("material-symbols-outlined")
    checkbox.innerHTML = "check_box_outline_blank";
    checkbox.addEventListener('click', toggleCompleted);

    //create priority toggle and set it
    let itemPriority = document.createElement('span');
    itemPriority.classList.add("material-symbols-outlined")
    itemPriority.innerHTML = "priority_high";
    itemPriority.style.fontSize = "20px";
    setPriority();
    //when user click priority button, toggle priority
    itemPriority.addEventListener("click", function(e) {
        if (todo.priority == true) {
            todo.priority = false;
            setPriority();
        } else {
            todo.priority = true;
            setPriority();
        }
        pushLibrary();
    })

    //create todo text
    let itemText = document.createElement('div');
    itemText.classList.add("item-text");
    let itemTitle = document.createElement('div');
    itemTitle.innerHTML = todo.title;
    itemText.appendChild(itemTitle);
    
    //allow user to change todo title on click
    itemTitle.addEventListener('click', (e) => {
        itemText.removeChild(itemText.firstChild)
        //create and add input
        var input = document.createElement('input');
        input.placeholder = todo.title;
        input.type = "text";
        itemText.appendChild(input);
        //create and add submit button
        var submit = document.createElement('button');
        submit.innerHTML = "&#10003;";
        submit.type = "submit";
        itemText.appendChild(submit);
        //when user submits, update todo title
        submit.addEventListener('click', (e) => {
            itemText.removeChild(itemText.firstChild);
            itemText.removeChild(itemText.firstChild);
            if (input.value) {
                todo.title = input.value;
                pushLibrary();
            }
            itemTitle.innerHTML = todo.title;
            itemText.appendChild(itemTitle);
        })
    })

    //create due date text
    let itemDate = document.createElement('div');
    itemDate.classList.add("item-date");
    let dateText = document.createElement('div');
    dateText.innerHTML = "due " + format(parseISO(todo.dueDate), 'MM/dd/yy') ;
    itemDate.appendChild(dateText);

    //allow user to change due date on click
    dateText.addEventListener('click', (e) => {
        itemDate.removeChild(itemDate.firstChild)
        //create div container
        var container = document.createElement('div');
        //create and add input
        var input = document.createElement('input');
        input.type = "date";
        input.required = true;
        input.style.height = "20px";
        //create and add error span
        var span = document.createElement('span');
        span.classList.add("date_error");
        span.classList.add("error");
        span.ariaLive = "polite";
        container.appendChild(input);
        container.appendChild(span)
        itemDate.appendChild(container);
        //validate date input
        dateValidation(input);
        //create and add submit button
        var submit = document.createElement('button');
        submit.innerHTML = "&#10003;";
        submit.type = "submit";
        itemDate.appendChild(submit);
        //when user submits, update due date or show error
        submit.addEventListener('click', (e) => {
            if (input.validity.valid) {
                while (itemDate.firstChild) {
                    itemDate.removeChild(itemDate.firstChild);
                }
                todo.dueDate = input.value;
                pushLibrary();
                dateText.innerHTML = "due " + format(parseISO(todo.dueDate), 'MM/dd/yy') ;
                itemDate.appendChild(dateText);
            } else {
                span.textContent = input.validationMessage;
            }
        })
    })

    //create expand buttond
    let expand = document.createElement('span')
    expand.classList.add("material-symbols-outlined")
    expand.innerHTML = "chevron_left";
    //when user clicks expand, expand todo
    expand.addEventListener('click', expandTodo);

    //create delete button
    let del = document.createElement('button')
    del.innerHTML = "&times;";
    del.id = "delete-todo";
    //when user clicks delete, delete todo
    del.addEventListener('click', delTodo);

    //if todo is completed, show as completed
    if (todo.status) {
        toggleCompleted();
    }

    //if hide completed tasks is selected, hide completed todo
    var hideOpt = document.getElementById("hide-opt");
    if(todo.status && hideOpt.innerHTML == "check_box") {
        item.style.display = "none";
    }

    //append all to todo div
    item.appendChild(checkbox)
    item.appendChild(itemPriority);
    item.appendChild(itemText);
    item.appendChild(itemDate);
    item.appendChild(expand);
    item.appendChild(del);

    //append todo div to root
    todoContainer.appendChild(item);

    /**
     * function to style todo as priority, if it is marked as a priority
     */
    function setPriority() {
        if (todo.priority == true) {
            itemPriority.style.opacity = 1;
            itemPriority.style.color = "red";
            item.style.backgroundColor = "rgb(236, 227, 236)"
        } else {
            itemPriority.style.opacity = 0.5;
            itemPriority.style.color = "black";
            item.style.backgroundColor = "rgb(255, 248, 255)"
        }
    }

    /**
     * function to toggle completion status of todo
     */
    function toggleCompleted() {
        if (checkbox.innerHTML == "check_box_outline_blank") {
            checkbox.innerHTML = "check_box";
            item.classList.add("complete")
            todo.status = true;

        } else {
            checkbox.innerHTML = "check_box_outline_blank";
            todo.status = false;
            item.classList.remove("complete")
        }
        pushLibrary();
        //if hide completed tasks is selected, hide completed todos
        var hideOpt = document.getElementById("hide-opt");
        if(hideOpt.innerHTML == "check_box") {
            item.style.display = "none";
        }
    }

    /**
     * function to delete todo
     * @param {MouseEvent} e 
     */
    function delTodo(e) {
        //hide todo
        var currentTodo = e.target.parentElement;
        currentTodo.style.display = "none";
        //remove todo from project todo list 
        removeTodo(currentTodo.id)    
    }

    /**
     * function to expand todo to show notes
     */
    function expandTodo() {
        if (expand.innerHTML == "chevron_left") {
            let itemNotes = document.createElement('div');
            itemNotes.classList.add("item-notes");
            itemNotes.innerHTML = todo.notes;
            item.appendChild(itemNotes);
            expand.innerHTML = "expand_more";

            //allow user to change notes on click
            itemNotes.addEventListener('click', (e) => {
                item.removeChild(item.lastChild)
                //create and add input
                var input = document.createElement('input');
                input.classList.add("item-notes");
                input.placeholder = todo.notes;
                input.type = "text";
                item.appendChild(input);
                //create and add submit
                var submit = document.createElement('button');
                submit.innerHTML = "&#10003;";
                submit.type = "submit";
                item.appendChild(submit);
                //when user submits, update notes
                submit.addEventListener('click', (e) => {
                    item.removeChild(item.lastChild);
                    item.removeChild(item.lastChild);
                    if (input.value) {
                        todo.notes = input.value;
                        pushLibrary();
                    }
                    itemNotes.innerHTML = todo.notes;
                    item.appendChild(itemNotes);
                })
            })
        } else {
            item.removeChild(item.lastChild);
            expand.innerHTML = "chevron_left";
        }

    }
}

/**
 * function to validate date input
 * @param {HTMLInputElement} dueDate - todo due date
 */
function dateValidation(dueDate) {
    dueDate.addEventListener('input', (e) => {
        dueDate.setCustomValidity("");
        if (dueDate.validity.valueMissing) {
            dueDate.setCustomvalidity("Please select a due date.");
        } else if (isPast(parseISO(dueDate.value))) {
            dueDate.setCustomValidity("Please select future date.");
        } else {
            dueDate.setCustomValidity("");
        }
    })
}

