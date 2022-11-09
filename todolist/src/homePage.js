import getHeader from './getHeader';
import getSidebar from './getSidebar';
import gitIcon from './assets/GitHub-Mark-32px.png';
import showForm from './showForm';
import pullLibrary, {PROJECT_LIBRARY} from './projectLibrary';

/**
 * function to create home page elements and layout
 * @returns {HTMLDivElement} website home page
 */
export default function homePage() {
    pullLibrary();
    //create div container
    let page = document.createElement('div');
    page.classList.add("page");

    //create header
    let header = getHeader();

    //create sidebar
    let sidebar = getSidebar();

    //create to do list container
    let container = document.createElement('div');
    container.classList.add("container");
    //create and add todo list header
    let todoHeader = document.createElement('div');
    todoHeader.classList.add("todo-header");
    let textContent = ["", "To Do", "Due Date"];
    textContent.forEach(txt => {
        var text = document.createElement('text');
        text.innerHTML = txt;
        todoHeader.appendChild(text);
    })
    let todoContainer = document.createElement('div');
    todoContainer.classList.add("todo-container");
    container.appendChild(todoHeader)
    container.appendChild(todoContainer)
    //create and add todo form
    //intialize items: variable name, label, input type, placeholder, required?
    let items = [
        ["title","Do:", "text", "Do something...", true],
        ["dueDate", "By:", "date", false, true],
        ["notes", "Notes", "text", "Additional notes", false]
    ]
    var formTodo = showForm(items);
    container.appendChild(formTodo);
    //create and add new todo section
    let addContainer = document.createElement('div');
    addContainer.classList.add("add-container");
    let add = document.createElement('span');
    add.classList.add("material-symbols-outlined")
    add.innerHTML = "add_circle";
    //when user clicks add, add new todo
    add.addEventListener('click', function (e) {
        // console.log("show form")
        document.querySelector(".form-todo").style.display = "grid";
    })
    addContainer.appendChild(add);

    //create footer
    let footer = document.createElement('div');
    footer.classList.add("footer");
    let para = document.createElement('p');
    para.innerHTML = "Copyright &#169; 2022 sketelone";
    let link = document.createElement('a');
    let icon = new Image();
    icon.src = gitIcon;
    link.href = "https://github.com/sketelone";
    link.appendChild(icon)
    footer.appendChild(link);
    footer.appendChild(para);

    //append all elements to page
    page.appendChild(header);
    page.appendChild(sidebar);
    page.appendChild(container);
    page.appendChild(addContainer);
    page.appendChild(footer);
    
    return page;

}

