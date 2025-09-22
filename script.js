function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function createGrid(size = 16) {
    const gridContainer = document.getElementById('grid-container');

    // Clear existing grid
    gridContainer.innerHTML = '';

    // Update CSS custom property for grid size
    gridContainer.style.setProperty('--grid-size', size);

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        // Initialize interaction count
        gridSquare.dataset.interactions = '0';

        gridSquare.addEventListener('mouseenter', function() {
            let interactions = parseInt(this.dataset.interactions);

            if (interactions === 0) {
                // First interaction: set random color
                const rgb = getRandomRGB();
                this.dataset.baseR = rgb.r;
                this.dataset.baseG = rgb.g;
                this.dataset.baseB = rgb.b;
            }

            // Increment interaction count
            interactions++;
            this.dataset.interactions = interactions;

            // Calculate darkening factor (10% darker each time)
            const darkeningFactor = Math.max(0, 1 - (interactions * 0.1));

            // Get base colors
            const baseR = parseInt(this.dataset.baseR);
            const baseG = parseInt(this.dataset.baseG);
            const baseB = parseInt(this.dataset.baseB);

            // Apply darkening
            const newR = Math.floor(baseR * darkeningFactor);
            const newG = Math.floor(baseG * darkeningFactor);
            const newB = Math.floor(baseB * darkeningFactor);

            this.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
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