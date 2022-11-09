import { PROJECT_LIBRARY } from './projectLibrary';
import pushLibrary from './pushLibrary';

/**
 * function to remove project from library
 * @param {string} currentProject - project name
 */
export default function removeProj(currentProject) {
    const myProjects = PROJECT_LIBRARY;
    var index;

    //find index of current project
    for (var i=0; i<myProjects.length; i++) {
        if (myProjects[i].name == currentProject) {
            index = i;
            break;
        }
    }
    
    //remove project from library
    if (index > -1 && myProjects.length > 1) {
        var temp = myProjects.splice(index, 1)
    }
    pushLibrary();
}
