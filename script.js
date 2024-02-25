// CONTAINERS REFERENCES
const gridContainer = document.querySelector('#grid-container');


// BUTTON REFERENCE FROM DOM
const colorBtn = document.querySelector('#color-picker');
const randomBtn = document.querySelector('#random-btn');
const eraseBtn = document.querySelector('#erase-btn');
const resizeBtn = document.querySelector('#resize-btn');
const clearBtn = document.querySelector('#clear-btn');

// TOGGLE VARIABLES
let currentColor;
let colorMode = true;
let eraseMode = false;
let isMouseDown = false;

// THIS WILL LOAD AUTOMATICALY WHEN THE PAGE LOADS
window.addEventListener('load', () => {
    currentColor = 'black';
    createGrid(16);
})


// EVENT LISTENERS FOR TOOLS-NAV BUTTONS
colorBtn.addEventListener('input', (event) => {
    currentColor = event.target.value;
    colorMode = true;
    eraseMode = false;
    colorBtn.style.borderTop = '1px solid white';
    colorBtn.style.borderBottom = '1px solid white';
    randomBtn.style.borderTop = 'none';
    randomBtn.style.borderBottom = 'none';
    eraseBtn.style.borderTop = 'none';
    eraseBtn.style.borderBottom = 'none';
})

randomBtn.addEventListener('click', () => {
    currentColor = null;
    colorMode = false;
    eraseMode = false;
    colorBtn.style.borderTop = 'none';
    colorBtn.style.borderBottom = 'none';
    randomBtn.style.borderTop = '1px solid white';
    randomBtn.style.borderBottom = '1px solid white';
    eraseBtn.style.borderTop = 'none';
    eraseBtn.style.borderBottom = 'none';
})

eraseBtn.addEventListener('click', () => {
    eraseMode = !eraseMode;
    colorBtn.style.borderTop = 'none';
    colorBtn.style.borderBottom = 'none';
    randomBtn.style.borderTop = 'none';
    randomBtn.style.borderBottom = 'none';
    eraseBtn.style.borderTop = '1px solid white';
    eraseBtn.style.borderBottom = '1px solid white';
})

clearBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
})

resizeBtn.addEventListener('click', () => {
    resizePropmt();
})


// THIS APPLIES A CLICK AND DRAG AND ENSURES ONLY THE CELLS WILL CHANGE COLOR
gridContainer.addEventListener('mousedown', () => isMouseDown = true);
gridContainer.addEventListener('mouseup', () => isMouseDown = false);
gridContainer.addEventListener('mouseover', (event) => {
    if (isMouseDown && event.target.classList.contains('cell')) {
        applyOrErase(event.target);
    }
})



function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.setProperty('--grid-size', size);

    for (let i = 0; i < size * size; i++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        gridContainer.appendChild(cellDiv);
        cellDiv.addEventListener('click', () => {
            applyOrErase(cellDiv);
        })
    }
}

function applyOrErase(cell) {
    if (eraseMode) {
        cell.style.backgroundColor = '';
    } else {
        if (currentColor) {
            cell.style.backgroundColor = currentColor
        } else {
            cell.style.backgroundColor = generateRandomColor();
        }
    }
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`
}

function resizePropmt() {
    let sizeInput;

    do {
        sizeInput = prompt('ENTER NUMBER OF CELLS IN GRID (16-100): ');

        if (sizeInput === null) {
            return;
        }

        sizeInput = parseInt(sizeInput);

        if (isNaN(sizeInput) || sizeInput <= 15 || sizeInput > 100) {
            alert("INVALID INPUT! PLEASE ENTER 16-100 ONLY.");
        }

    } while (isNaN(sizeInput) || sizeInput <= 15 || sizeInput > 100)

    createGrid(sizeInput);
}