function refreshPage() {
    location.reload();
}

let moves = 0;
let row = -1;
let col = -1;
let game = false;
let timer;

const create = (n, m) => {
    row = n;
    col = m;
    moves = 0;
    document.getElementById('number').innerText = moves;
    let inst = document.getElementById('Instructions');
    inst.style.display = "none";
    const board = document.getElementById('board');
    board.innerHTML = ''; 

    document.getElementById('btn1').disabled = true;
    document.getElementById('btn2').disabled = true;
    document.getElementById('btn3').disabled = true;
    document.getElementById('btn4').disabled = false;

    for (let i = 0; i < n; i++) {
        const cell_row = document.createElement('div');
        cell_row.setAttribute('id', 'cell_row' + i);
        cell_row.style.width = '100%';
        if (n == 3) {
            cell_row.style.height = '32%';
        } else if (n == 4) {
            cell_row.style.height = '24%';
        } else if (n == 5) {
            cell_row.style.height = '19%';
        }
        board.appendChild(cell_row);

        for (let j = 0; j < m; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', 'cell' + i + j);
            cell.style.textAlign = "center";
            cell.style.backgroundColor = 'pink';
            cell.style.borderRadius = "3px";
            cell.style.height = '100%';
            cell.classList.add('cell');
            if (n == 3) {
                cell.style.width = '32%';
                cell.style.paddingTop = "63px";
            } else if (n == 4) {
                cell.style.width = '24%';
                cell.style.paddingTop = "38px";
            } else if (n == 5) {
                cell.style.width = '19%';
                cell.style.paddingTop = "19px";
            }
            cell.addEventListener('click', () => checks('cell' + i + j, i, j));
            cell_row.appendChild(cell);
        }
    }

    let count = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const cell = document.getElementById('cell' + i + j);
            cell.innerHTML = count;
            count++;
            if (i == n - 1 && j == m - 1) {
                cell.style.backgroundColor = 'rgba(0,0,0,0.5)';
                cell.innerHTML = '';
            }
        }
    }
}

const swapTiles = (cell1, cell2) => {
    let c1 = document.getElementById(cell1);
    let c2 = document.getElementById(cell2);
    let temp = c1.innerHTML;
    c1.innerHTML = c2.innerHTML;
    c2.innerHTML = temp;
    let temp1 = c1.style.backgroundColor;
    c1.style.backgroundColor = c2.style.backgroundColor;
    c2.style.backgroundColor = temp1;
}

const shuffle = () => {
    game = true;
    document.getElementById('btn4').disabled = true;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let row2 = Math.floor(Math.random() * row);
            let col2 = Math.floor(Math.random() * col);
            swapTiles('cell' + i + j, 'cell' + row2 + col2);
        }
    }
    startTimer();
}

const checks = (cel, rows, cols) => {
    if (!game) {
        return;
    }
    const c4 = document.getElementById(cel);
    const totalRows = row;
    const totalCols = col;

    if (rows < totalRows - 1 && document.getElementById('cell' + (rows + 1) + cols).innerHTML == '') {
        moves++;
        swapTiles(cel, 'cell' + (rows + 1) + cols);

    } else if (rows > 0 && document.getElementById('cell' + (rows - 1) + cols).innerHTML == '') {
        moves++;
        swapTiles(cel, 'cell' + (rows - 1) + cols);

    } else if (cols < totalCols - 1 && document.getElementById('cell' + rows + (cols + 1)).innerHTML == '') {
        moves++;
        swapTiles(cel, 'cell' + rows + (cols + 1));

    } else if (cols > 0 && document.getElementById('cell' + rows + (cols - 1)).innerHTML == '') {
        moves++;
        swapTiles(cel, 'cell' + rows + (cols - 1));
    }
    document.getElementById('number').innerText = moves;
    checkWin();
};

const checkWin = () => {
    let k = 1;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (document.getElementById('cell' + i + j).innerHTML == k) {
                k++;
            } else if (!(i == row - 1 && j == col - 1)) {
                return;
            }
        }
    }
    document.getElementById('Instructions').style.display = "block";
    document.getElementById('Instructions').innerHTML = "Congrats!";
    clearInterval(timer); // Stop the timer
};

const startTimer = () => {
    let sec = 0;
    let min = 0;
    const secElement = document.getElementById("sec");
    const minElement = document.getElementById("min");

    timer = setInterval(() => {
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
        secElement.innerText = sec;
        minElement.innerText = min;
    }, 1000);
};
