/*
whiteboarding
need 9 squares
2 players -> X and O
    a way to specify or choose who goes first
    once a square is taken it can't be replaced by another
    win condition -> 3 of same in a row
    players turn on screen and have them be able to put X or O on screen

end game logic - when board is full, it is a tie, game is over
    9 turns is maximums
    a way to tell player they've won
    make a scoreboard to show wins/losses
    reset button
*/
/*
pseudocoding
9 squares -> divs or buttons
    div.addEventListener
    style squares -> flexbox or grid

value of turns / turn counter
    use modulus to control turn X or O
    turns % 2 = 0 .... player1 (x)
    if turns % 2 = 1 ... player 2(o)
    if turns = 9 .... show tie and restart game


*/

// =======================
// ======Selectors========
// =======================

const gridContainer = document.querySelector("#grid-container");
const squares = document.querySelectorAll(".square");

const displayActivePlayer = document.querySelector(".active-player");

const btnReset = document.querySelector(".btn-reset");

const square1 = document.querySelector(".one");
const square2 = document.querySelector(".two");
const square3 = document.querySelector(".three");
const square4 = document.querySelector(".four");
const square5 = document.querySelector(".five");
const square6 = document.querySelector(".six");
const square7 = document.querySelector(".seven");
const square8 = document.querySelector(".eight");
const square9 = document.querySelector(".nine");

let activePlayer = 1;
let turn = 1;
let playerOneWins = 0;
let player2Wins = 0;

// =============================
// ======Event Listeners========
// =============================

squares.forEach((square) =>
  square.addEventListener("click", () => {
    // complete 1 turn by clicking a live square
    runTurn(square);
  })
);

// reset game
btnReset.addEventListener("click", gameInit);

// ================================
// ======Callback Functions========
// ================================

function gameInit() {
  squares.forEach((square) => {
    // clear out buttons and re-enable them
    square.innerText = "";
    square.disabled = false;
    // set active player to 1 in game and header
    activePlayer = 1;
    displayActivePlayer.innerText = `${activePlayer}`;
    // set turn to 1
    turn = 1;
  });
}

function runTurn(square) {
  // alternate players based on turn # (even or odd)
  turn % 2 === 0 ? (activePlayer = 1) : (activePlayer = 2);

  // mark selected square with proper symbol
  if (activePlayer === 1) {
    square.innerText = "X";
  } else {
    square.innerText = "O";
  }
  // disable element after selection is made
  square.disabled = true;

  // add 1 to turn counter each time invoked
  turn++;
  displayActivePlayer.innerText = `${activePlayer}`;
  // CHECK WIN CONDITION
  win();
}

function win() {
  if (
    (square1.innerText === "X" &&
      square2.innerText === "X" &&
      square3.innerText === "X") ||
    (square7.innerText === "X" &&
      square8.innerText === "X" &&
      square9.innerText === "X") ||
    (square4.innerText === "X" &&
      square5.innerText === "X" &&
      square6.innerText === "X") ||
    (square1.innerText === "X" &&
      square4.innerText === "X" &&
      square7.innerText === "X") ||
    (square2.innerText === "X" &&
      square5.innerText === "X" &&
      square8.innerText === "X") ||
    (square3.innerText === "X" &&
      square6.innerText === "X" &&
      square9.innerText === "X") ||
    (square1.innerText === "X" &&
      square5.innerText === "X" &&
      square9.innerText === "X") ||
    (square3.innerText === "X" &&
      square5.innerText === "X" &&
      square7.innerText === "X")
  ) {
    console.log("win");
    playerOneWins++;
    alert("Player 1 Wins!");
    document.querySelector(
      ".player1"
    ).innerText = `Player 1 Wins = ${playerOneWins}`;
  } else if (
    (square1.innerText === "O" &&
      square2.innerText === "O" &&
      square3.innerText === "O") ||
    (square7.innerText === "O" &&
      square8.innerText === "O" &&
      square9.innerText === "O") ||
    (square4.innerText === "O" &&
      square5.innerText === "O" &&
      square6.innerText === "O") ||
    (square1.innerText === "O" &&
      square4.innerText === "O" &&
      square7.innerText === "O") ||
    (square2.innerText === "O" &&
      square5.innerText === "O" &&
      square8.innerText === "O") ||
    (square3.innerText === "O" &&
      square6.innerText === "O" &&
      square9.innerText === "O") ||
    (square1.innerText === "O" &&
      square5.innerText === "O" &&
      square9.innerText === "O") ||
    (square3.innerText === "O" &&
      square5.innerText === "O" &&
      square7.innerText === "O")
  ) {
    console.log("win");
    player2Wins++;
    alert("Player 2 Wins!");
    document.querySelector(
      ".player2"
    ).innerText = `Player 2 Wins = ${player2Wins}`;
  }
}

// TO REFACTOR WIN CONDITION:
/*

BUILDING GRID (CSS):
grid container{
    display: grid
    grid-template: "a b c" "e f g" "h i j"
    grid-template-columns: repeat(3, 5vh)
    grid-template-row: repeat(3, 5vh)
}

.square {
    background-color: red
}

square:nth-child(even) {
    background-color: blue
}

const markSquare = ev =>{ if(!ev.target.innerText){
    ev.target.innerText = ['X', 'O'][Math.round(Math.random() ]
  }  
}

squares.forEach(square => square.addEventListener("click", handleClick))

array.from(squares) ==> nodelist to array

const getValues = array.from(squares).map(square => square.innerText) ==> new array with inner values. Can harness indices .

Could create a WinningCombo array. In connect 4 this needs to be create dynamically to allow for board size to change

winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],   // represents ROWS
    [0,3,6],
    [1,4,6],
    [2,5,8],  // COLUMNS
    [0,4,8],
    [2,4,6],  // DIAGS
]

can compare winning combo array to getVALUES array above with map

winningCombo.map(indices => [valuesindices[0]]], [values[indices[1]], [values[indices[2]]) each one is possibiltiies for ROWS COLS or DIAGS

will return lots of arrays 

const getRowsColsDiag = () => {
    const values = getValues(squares)
    

    return winningCombo.map(indices = > [valuesindices[0]], [values[indices[1]], [values[indices[2]]
    ]
})

// then move this function into event listener so it's run on every attempt and it gives you the "State of the game"
  
chaining maps and filters to clean data, add things etc 



*/
