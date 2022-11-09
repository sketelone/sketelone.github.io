import arrayToUl from './arrayToUl';
import switchProject from './switchProject';
import addProject from './addProject';
import showProject from './showProject';
import { PROJECT_LIBRARY } from './projectLibrary';
import pushLibrary from './pushLibrary';

let index = 1;
/**
 * function to create the project navigation bar
 * @returns {HTMLDivElement} div containing project nav elements
 */
export default function getNavbar() {
    //create  div container
    let navContainer = document.createElement('div');
    navContainer.classList.add("nav-container");
    let projectNav = document.createElement('ul');
    projectNav.classList.add("project-nav");

    //create and append project nav and add project button
    let list = [];
    for (var i=0; i<PROJECT_LIBRARY.length; i++) {
        list[i] = PROJECT_LIBRARY[i].name;
    }
    list.push("+");
    arrayToUl(projectNav, list);

    //when user selects a project, switch to that project
    //when user hits add, add new project and switch to it
    var buttons = projectNav.querySelectorAll('button');
    buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (button.innerHTML == "+") {
                    getNewProject(index);
                    index++;
              } else {
                    switchProject(e);
                }
            })
    })

    navContainer.appendChild(projectNav);

    return navContainer;
}

/**
 * function to construct and show new project
 * @param {num} index index 
 */
function getNewProject(index) {
    //construct new project
    var newProject = addProject("New Project " + index, PROJECT_LIBRARY);
    pushLibrary();

    //set and show current project
    var heading = document.querySelector('#current-project')
    if (heading) {
        heading.innerHTML = newProject.name;
        showProject(newProject);
    }

    //update project nav
    let navContainer = document.querySelector('.nav-container')
    navContainer.removeChild(navContainer.firstChild)
    let projectNav = getNavbar();
    navContainer.appendChild(projectNav);
    console.log(index)

}