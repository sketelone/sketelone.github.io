import addProject from "./addProject";
import addTodo from "./addTodo";

/**
 * initialize global constants project library and stored library
 */
export var PROJECT_LIBRARY = [];
addProject("General", PROJECT_LIBRARY);
export var STORED_LIBRARY = [];

/**
 * function to pull stored library from local storage
 */
export default function pullLibrary() {
    if (storageAvailable('localStorage')) {
        //if something is stored, parse stored info
        if (!(localStorage.length === 0)) {
            var projects = Object.keys(localStorage);
            for (var i = 0; i<localStorage.length; i++) {
                var newProject = addProject(projects[i], STORED_LIBRARY);
                var list = localStorage.getItem(projects[i]);
                if (list) {
                    var todos = list.split(";");
                    todos.forEach(todo => {
                        var temp = todo.split(",");
                        var newTodo = addTodo(temp[0], temp[1], temp[2], newProject);
                        if (temp[4] == "true") {
                            newTodo.status = true;
                        } else {
                            newTodo.status = false;
                        }
                        if (temp[5] == "true") {
                            newTodo.priority = true;
                        } else {
                            newTodo.priority = false;
                        }
                    })   
                }
            }
            //if stored library matches project library, clear stored, otherwise update
            if (STORED_LIBRARY == PROJECT_LIBRARY) {
                localStorage.clear();
            } else {
                PROJECT_LIBRARY = STORED_LIBRARY;
            }
        }
    }
}

/**
 * function to check if local storage is available, from MDN web docs
 * @param {string} type - type of storage
 * @returns true if storage is available, error class otherwise
 */
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}