const promptBtn = document.querySelector('#prompt-btn');
const gridContainer = document.querySelector('#container');
const pickColorBtn = document.querySelector('#pick-color-btn');
const colorPicker = document.querySelector('#color-picker');
const eraseBtn = document.querySelector('#erase-btn')
const randomColorBtn = document.querySelector('#random-color-btn');
const clearBtn = document.querySelector('#clear-btn');


let pickedColor;
let pickColorMode = true;
let eraseMode = false;
let isMouseDown = false;

// DEFAULT GRID WILL BE 16X16 FOR FIRST TIME LOADING THE PAGE
window.addEventListener('load', () => {
    pickedColor = 'black'
    changeGrid(16);
});

pickColorBtn.addEventListener('click', () => {
    colorPicker.click();
    pickColorMode = true;
    eraseMode = false;
    updateButtonStyle();
})

randomColorBtn.addEventListener('click', () => {
    pickedColor = null;
    pickColorMode = false;
    eraseMode = false;
    updateButtonStyle();
})

colorPicker.addEventListener('input', (event) => {
    pickedColor = event.target.value;
    eraseMode = false;
    updateButtonStyle();
})


eraseBtn.addEventListener('click', () => {
    eraseMode = !eraseMode;
    updateButtonStyle();
});

clearBtn.addEventListener('click', () => {
    const cells = gridContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
});

gridContainer.addEventListener('mousedown', () => {
    isMouseDown = true;
});

gridContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Mouse over event listener to track when mouse moves over grid cells
gridContainer.addEventListener('mouseover', (event) => {
    if (isMouseDown && event.target.classList.contains('cell')) {
        applyColorOrErase(event.target);
    }
});


function changeGrid(size) {

    gridContainer.innerHTML = '';
    gridContainer.style.setProperty('--grid-size', size);

    for(let i = 0; i < size * size; i++) {
        // EACH ITERATION WILL CREATE A NEW DIV (cell) AND APPEND IT TO THE gridContainer
        const cell = document.createElement('div'); 
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
        cell.addEventListener('mouseup', () => {
            applyColorOrErase(cell);
        });
    }

}

function applyColorOrErase(cell) {
    if (eraseMode) {
        cell.style.backgroundColor = '';
    } else {
        if(pickedColor) {
            cell.style.backgroundColor = pickedColor;
        } else {
            cell.style.backgroundColor = generateRandomColor();
        }
    }
}

// GENERATES A RANDOM COLOR USING RGB FORMAT
function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`
}

function userPromptSize() {
    let gridSize;

    do {
        gridSize = prompt('Enter grid size between 16 - 100: ');
        
        
        // CANCEL THE FUNTION IF THERE WAS NO INPUT
        if(gridSize === null) {
            return;
        }

        // IF USER INPUT SOMETHING CONVERT IT TO A INTEGER
        gridSize = parseInt(gridSize);
    
        // CHECK IF THE INPUT IS NOT A NUMBER, LESS THAN OR EQUAL TO 15 AND NOT EXCEEDING 100
        if (isNaN(gridSize) || gridSize <= 15 || gridSize > 100) {
            alert('INVALID INPUT. ENTER BETWEEN 16 - 100 ONLY.');
        } 

    } while (isNaN(gridSize) || gridSize <= 15 || gridSize > 100);
 

    changeGrid(gridSize);
        
}

function updateButtonStyle() {
    eraseBtn.style.backgroundColor = eraseMode ? 'rgba(186, 112, 255, 0.8)' : 'rgba(186, 112, 255, 0.367)';
    pickColorBtn.style.backgroundColor = pickColorMode ? 'rgba(186, 112, 255, 0.8)' : 'rgba(186, 112, 255, 0.367)';
    randomColorBtn.style.backgroundColor = pickColorMode ? 'rgba(186, 112, 255, 0.367)' : 'rgba(186, 112, 255, 0.8)';
}



// RUN THE userPromptSize() WHEN CLICKED
promptBtn.addEventListener('click', () => {
    userPromptSize();
})


