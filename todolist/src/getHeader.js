import {PROJECT_LIBRARY} from './projectLibrary';
import getNavbar from './getNavbar';
import showProject from './showProject';
import removeProj from './removeProj';
import pushLibrary from './pushLibrary';

/**
 * function to create the header
 * @returns {HTMLDivElement} div containing header
 */
export default function getHeader() {
    //create header
    let header = document.createElement('div');
    header.classList.add("header");

    //initialize project header
    const myProjects = PROJECT_LIBRARY;
    var project = PROJECT_LIBRARY[0];
    var heading = document.createElement('h1');
    heading.id = "current-project"
    heading.innerText = project.name;
    header.appendChild(heading)    

    //create delete button
    let del = document.createElement('button')
    del.innerHTML = "&times;";
    del.id = "delete-proj";
    header.appendChild(del);
    //when user clicks delete, delete project
    del.addEventListener('click', delProject);
    
    //allow user to change project name on click
    heading.addEventListener('click', (e) => {
        var currentProject = heading.innerHTML;
        myProjects.forEach(proj => {
            if (proj.name == currentProject) {
                project = proj;
            }
        })
        while (header.firstChild) {
            header.removeChild(header.firstChild);
        }
        //create div container
        var container = document.createElement('div');
        container.classList.add('header-edit')
        //create and add input
        var input = document.createElement('input');
        input.classList.add('header-input');
        input.placeholder = project.name;
        input.type = "text";
        container.appendChild(input);
        //create and add error span
        var span = document.createElement('span');
        span.classList.add("heading_error");
        span.classList.add("error");
        span.ariaLive = "polite";
        container.appendChild(span)
        header.appendChild(container);
        //create and add submit button
        var submit = document.createElement('button');
        submit.innerHTML = "&#10003;";
        submit.type = "submit";
        header.appendChild(submit);
        //when user submits, update project name
        submit.addEventListener('click', (e) => {
            //validate input
            titleValidate(input);
            if (input.validity.valid) {
                //update header
                while (header.firstChild) {
                    header.removeChild(header.firstChild);
                }
                if (input.value) {
                    project.name = input.value;
                }
                pushLibrary();
                heading.innerHTML = project.name;
                header.appendChild(heading);
                header.appendChild(del);
                del.addEventListener('click', delProject);
            } else {
                span.textContent = input.validationMessage;
            }
            //update nav
            let navContainer = document.querySelector('.nav-container')
            navContainer.removeChild(navContainer.firstChild)
            let projectNav = getNavbar();
            navContainer.appendChild(projectNav);
        })
    })

    return header;

    /**
     * function to delete project
     */
    function delProject() {
        //remove project from library
        var currentProject = heading.innerHTML;
        removeProj(currentProject);    
        //show first project in library
        project = PROJECT_LIBRARY[0];
        heading.innerText = project.name;
        showProject(project);     
        //update nav
        let navContainer = document.querySelector('.nav-container')
        navContainer.removeChild(navContainer.firstChild)
        let projectNav = getNavbar();
        navContainer.appendChild(projectNav);   
    }

    /**
     * function to validate text input
     * @param {HTMLInputElement} text - project title
     */
    function titleValidate(text) {
        text.setCustomValidity("");
        var lowercase = text.value;
        myProjects.forEach(proj => {
            if (proj.name == text.value) {
                text.setCustomValidity("Please enter a unique project name.");
            }
        })
    }
}

