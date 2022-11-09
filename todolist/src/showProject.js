
import showTodo from "./showTodo"

/**
 * shows to do list for current project
 * @param {Project} project - current project
 */
export default function showProject(project) {
    const todoContainer = document.querySelector(".todo-container");
    var i = 0;
    //remove previous todo list
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild)
    }
    //show current todo list
    if (project.todos) {
        project.todos.forEach (todo => {
            showTodo(todo, i);
            i++;
        })    
    }
}