/**
 * function to construct new project and add to the library
 * @param {string} name - project name
 * @param {list} library - library containing project
 * @returns {Project} new Project object
 */

export default function addProject(name, library) {
    
    var myProjects = library;
    var newProject = new Project(name)

    myProjects.push(newProject);

    return newProject;
}

/**
 * factory function to construct project
 * @param {string} name - project name 
 */
function Project(name) {
    this.name = name;
    this.todos = [];
}