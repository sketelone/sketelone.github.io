import { PROJECT_LIBRARY } from './projectLibrary';

/**
 * function to remove todo from project
 * @param {string} todo - id of todo = index of todo in project list
 */
export default function removeTodo(todo) {
    const myProjects = PROJECT_LIBRARY;
    const currentProject = document.getElementById('current-project').innerHTML;
    var project;

    //get current project
    myProjects.forEach(proj => {
        if (proj.name == currentProject) {
            project = proj;
        }
    })

    //remove todo from current project todo list
    var index = parseInt(todo);
    if (index > -1) {
        var temp = project.todos.splice(index, 1)
    }
    pushLibrary();
}
