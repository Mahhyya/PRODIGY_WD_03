document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                cells[a].style.backgroundColor = "lightgreen";
                cells[b].style.backgroundColor = "lightgreen";
                cells[c].style.backgroundColor = "lightgreen";
                gameActive = false;
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return [...cells].every(cell => cell.textContent !== "");
    };

    const handleClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.id);

        if (!gameActive || cell.textContent !== "") return;

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkDraw()) {
            alert("It's a draw!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    const resetGame = () => {
        for (let cell of cells) {
            cell.textContent = "";
            cell.style.backgroundColor = "white";
        }
        currentPlayer = "X";
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});
