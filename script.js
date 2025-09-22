function createGrid(size = 16) {
    const gridContainer = document.getElementById('grid-container');

    // Clear existing grid
    gridContainer.innerHTML = '';

    // Update CSS custom property for grid size
    gridContainer.style.setProperty('--grid-size', size);

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        gridSquare.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#333';
        });

        gridContainer.appendChild(gridSquare);
    }
}

function changeGridSize() {
    let newSize = prompt('Enter the number of squares per side (max 100):');

    if (newSize === null) return; // User cancelled

    newSize = parseInt(newSize);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    createGrid(newSize);
}

document.addEventListener('DOMContentLoaded', function() {
    createGrid();

    const changeButton = document.getElementById('change-size-btn');
    changeButton.addEventListener('click', changeGridSize);
});