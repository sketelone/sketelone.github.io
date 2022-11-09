import './style.css';
import 'material-symbols';
import homePage from './homePage';
import getForm from './getForm';
import showProject from './showProject';
import { PROJECT_LIBRARY } from './projectLibrary';

//create and add home page
var page = homePage();
document.body.appendChild(page);

//show current project
const currentProject = document.getElementById("current-project");
var project;
PROJECT_LIBRARY.forEach(proj => {
    if (proj.name == currentProject.textContent) {
        project = proj;
    }
})
showProject(project);

//launch form listeners
getForm();

