import getNavbar from "./getNavbar";

/**
 * function to create the sidebar
 * @returns {HTMLDivElement} div containing sidebar
 */
export default function getSidebar() {
    //create div container
    let sidebar = document.createElement('div');
    sidebar.classList.add("sidebar");

    //create and add logo
    let logo = document.createElement('h1');
    logo.innerHTML = "To Do<br>List";
    sidebar.appendChild(logo);

    //create and add project container with project nav
    let projectContainer = document.createElement('div');
    projectContainer.classList.add("project-container");
    let projectNav = getNavbar();
    projectContainer.appendChild(projectNav);
    sidebar.appendChild(projectContainer);

    //create and add hide container with hide completed button
    let hideContainer = document.createElement('div');
    hideContainer.classList.add("hide-container");
    let hideOpt = document.createElement('span');
    hideOpt.classList.add("material-symbols-outlined");
    hideOpt.id = "hide-opt";
    hideOpt.innerHTML = "check_box_outline_blank";
    hideOpt.addEventListener('click', hideCompleted);
    let hideText = document.createElement('text');
    hideText.innerHTML = "Hide completed tasks";
    hideContainer.appendChild(hideOpt)
    hideContainer.appendChild(hideText)
    sidebar.appendChild(hideContainer);

    return sidebar;

    /**
     * function to hide completed todo list items
     */
    function hideCompleted() {
        var todos = document.querySelectorAll(".todo")
        if (hideOpt.innerHTML == "check_box_outline_blank") {
            hideOpt.innerHTML = "check_box";
            todos.forEach(todo => {
                if (todo.classList.contains("complete")) {
                    todo.style.display = "none";
                }
            })
        } else {
            hideOpt.innerHTML = "check_box_outline_blank";
            todos.forEach(todo => {
                if (todo.classList.contains("complete")) {
                    todo.style.display = "grid";
                }
            })
        }
    }     
}

