(function () {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for the form's submit event
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the input fields
        var width = document.querySelector('#width').value;
        var height = document.querySelector('#width').value;
        var interval = document.querySelector('#interval').value;

        const dance_floor = document.getElementById('dance-floor');

        // Clean previous table
        dance_floor.innerHTML = '';

        // Loop to create a table row for each height value and appends it to the dance_floor element.
        for (let i = 0; i < height; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < width; j++) {
                const cell = document.createElement('td');
                const hatColors = ['blue', 'white', 'red'];
                const randomColor = hatColors[Math.floor(Math.random() * hatColors.length)];
                cell.dataset.color = randomColor;
                cell.classList.add(randomColor);
                row.appendChild(cell);
            }
            dance_floor.appendChild(row);
        }

        function switchHats() {
            // Get all the cells in the dance floor
            const cells = document.querySelectorAll('#dance-floor td');

            // Iterate over each cell
            cells.forEach((cell) => {
                // Get the color of the current cell
                const color = cell.dataset.color;

                // Get the neighbors of the current cell
                const neighbors = getNeighbors(cell);

                // Check if the current cell is red and has at least 3 white neighbors
                if (color === 'red' && countNeighborsWithColor(neighbors, 'white') >= 3) {
                    // Change the color of the cell to white
                    cell.dataset.color = 'white';
                    cell.className = '';
                    cell.classList.add('white');
                }
                // Check if the current cell is white and has at least 3 blue neighbors
                else if (color === 'white' && countNeighborsWithColor(neighbors, 'blue') >= 3) {
                    // Change the color of the cell to blue
                    cell.dataset.color = 'blue';
                    cell.className = '';
                    cell.classList.add('blue');

                }
                // Check if the current cell is blue and has at least 3 red neighbors
                else if (color === 'blue' && countNeighborsWithColor(neighbors, 'red') >= 3) {
                    // Change the color of the cell to red
                    cell.dataset.color = 'red';
                    cell.className = '';
                    cell.classList.add('red');
                }
            });
        }

        // What is the neightor color
        function getNeighbors(cell) {
            // Initialize an empty array to store the neighbors
            const neighbors = [];

            // Get the row index and cell index of the current cell
            const rowIndex = cell.parentNode.rowIndex;
            const cellIndex = cell.cellIndex;

            // Loop through the neighbor cells
            for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = cellIndex - 1; j <= cellIndex + 1; j++) {
                    // Check if the neighboring cell is within the limit of the dance floor
                    if (i >= 0 && i < height && j >= 0 && j < width && !(i === rowIndex && j === cellIndex)) {
                        // Get the neighbor cell based on the row and cell index
                        const neighborCell = dance_floor.rows[i].cells[j];
                        // Push the color of the neighbor cell to the neighbors array
                        neighbors.push(neighborCell.dataset.color);
                    }
                }
            }

            return neighbors;
        }

        function countNeighborsWithColor(neighbors, color) {
            // Return the count of neighbors with the specified color
            return neighbors.filter((neighbor) => neighbor === color).length;
        }

        setInterval(switchHats, interval);
    });
})();