/**
 * function to convert an array into an unordered list of buttons
 * @param {HTMLUListElement} ul - unordered list to append items to
 * @param {array} array - string list of items to add
 */
export default function arrayToUl (ul, array) {
    array.forEach( item => {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.innerText = item;
        btn.ariaLabel = item;
        btn.ariaSelected = false;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}