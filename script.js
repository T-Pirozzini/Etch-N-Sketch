// initialize settings
let currentColor = '#000000'
let currentMode = 'color'
let currentSize = 16

// set/change color
const setCurrentColor = (newColor) => {  
    currentColor = newColor;
};

// set/change mode
const setCurrentMode = (newMode) => {
    activateButton(newMode)
    currentMode = newMode
};

// set/change mode
const setCurrentSize = (newSize) => {
    currentSize = newSize
};

// settings variables
const colorPicker = document.getElementById('color-picker')
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser-btn')
const clearBtn = document.getElementById('clear-btn')
const sizeValue = document.getElementById('size-value')
const sizeSlider = document.getElementById('size-slider')
const grid = document.getElementById('grid')

// settings buttons
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorPicker.onmouseout = () => setCurrentMode('color');
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow'); 
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value); 

// initialize grid
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.addEventListener('mouseover', changeColor)
      grid.appendChild(gridElement)
    }
  }
  
  // switch between color modes
   function changeColor(e) {
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = 'whitesmoke'
    }
  }

  // change the size of the grid  
  function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
  }

  function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }

  function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
  }

  function clearGrid() {
    grid.innerHTML = ''
  }

// toggle modes on and off
function activateButton(newMode) {
    if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
    colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
    }
  }


  window.onload = () => {
    setupGrid(currentSize)
    activateButton(currentMode)
  }