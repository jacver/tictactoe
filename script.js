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

let activePlayer = 1;
let turn = 1;

const btnReset = document.querySelector(".btn-reset");

// =======================
// ======Functions========
// =======================

// iterating through each loop to make them interactive
squares.forEach((square) =>
  square.addEventListener("click", function () {
    // mark selected square with proper symbol
    if (activePlayer === 1) {
      square.innerText = "X";
    } else {
      square.innerText = "O";
    }
    // disable element
    square.disabled = true;
    // cycle activePlayer and turn counter
    turnCounter();
  })
);

function turnCounter() {
  // alternate players based on turn # (even or odd)
  turn % 2 === 0 ? (activePlayer = 1) : (activePlayer = 2);
  // add 1 to turn counter each time invoked
  turn++;
  displayActivePlayer.innerText = `${activePlayer}`;
  // if turn hits 9 (max), send message to player and reset turns
  if (turn === 10) {
    console.log(`Game over - turn ${turn}`);
    turn = 1;
  }
}
