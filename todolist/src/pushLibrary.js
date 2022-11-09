import { PROJECT_LIBRARY } from "./projectLibrary";

/**
 * function to push project library into local storage
 */
export default function pushLibrary() {
    localStorage.clear();
    PROJECT_LIBRARY.forEach(proj => {
        var temp = [];
        proj.todos.forEach(todo => {
            temp.push([todo.title, todo.dueDate, todo.notes, todo.project.name,  todo.priority, todo.status]);
        })
        localStorage.setItem(proj.name, temp)
    }) 
}