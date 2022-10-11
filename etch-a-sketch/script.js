

const container = document.querySelector('.container');
const btn = document.querySelector('#new');

let input = 16;
createGrid();
btn.addEventListener('click', newGrid)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGrid(gridSize=16) {
    let squares = gridSize*gridSize;
    for (i=0;i<squares;i++) {
        var v = document.createElement('div');
        v.id = "div" + i;
        v.classList.add('etch');
        v.style.width = 850/(gridSize+1) + "px";
        v.style.height = v.style.width;
        container.appendChild(v);
        console.log("add one!")
    }
    const etch = document.querySelectorAll('.etch');
    etch.forEach(etch => {
        etch.addEventListener('mouseover', changeRGB);
     });    
}

function changeColor(e) {
    // console.log(e);
    if (e.type === 'mouseover' && !mouseDown) return;
    this.classList.add('hover');
};

function changeRGB(e) {
    // console.log(e);
    if (e.type === 'mouseover' && !mouseDown) return;
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

function changeShade(e) {
    // console.log(e);
    if (e.type === 'mouseover' && !mouseDown) return;
    let rgb = getComputedStyle(this).getPropertyValue("background-color");
    rgb = rgb.replace(/[^\d,.]/g, '').split(',');
    let inc = 25;
    let r = parseInt(rgb[0]) - inc;
    let g = parseInt(rgb[1]) - inc;
    let b = parseInt(rgb[2]) - inc;
    this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

function newGrid(e) {
    removeGrid(input);
    input = parseInt(prompt("Pick a number 0-100!", 16))
    while (validateInput(input)==false) {
        input = parseInt(prompt("You must enter a number 0-100!",16));
    }
    createGrid(input);
}

function removeGrid(gridSize=16) {
    let squares = gridSize*gridSize;
    for (i=0;i<squares;i++) {
        var v = document.querySelector(`div[id="div${i}"`);
        v.remove();
        console.log("drop one!")
    }
}

function validateInput(input) {
    //validates user input
    const regex = new RegExp("^[0-9]*$")
    if (input == null) {
        return false;
    } else if (!regex.test(input)) {
        return false;
    } else if (parseInt(input) > 100) {
        return false;
    } else {
        return true;
    }
}