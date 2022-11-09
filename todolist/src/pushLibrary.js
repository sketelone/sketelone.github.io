import { PROJECT_LIBRARY } from "./projectLibrary";

/**
 * function to push project library into local storage
 */
export default function pushLibrary() {
    localStorage.clear();
    var i = 0;
    PROJECT_LIBRARY.forEach(proj => {
        var temp = [];
        temp.push(proj.name + ";")
        proj.todos.forEach(todo => {
            temp.push([todo.title, todo.dueDate, todo.notes, todo.project.name,todo.priority, todo.status] + ';');
        })
        localStorage.setItem(i, temp)
        i++;
    }) 
}