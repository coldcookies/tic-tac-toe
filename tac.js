 const Game = (() => {
   let board = ['', '', '', '', '', '', '', '', ''];
   let turn = 0;
   const getTurn = () => turn;
   const clearGame = () => {
     board = ['', '', '', '', '', '', '', '', ''];
   };
   const checkFin = () => {
     let gameState = 0;
     let winner = null;
     const winCombos = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
     ];
     for (let combo of winCombos) {
       if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
         if (board[combo[0]]) {
           gameState = 1;
           winner = board[combo[0]];
           return {
             gameState,
             winner
           };
         }
       }
     }
     if (board.find(t => t === "") !== "") {
       gameState = -1; // board full w/ no win(tie)
     } else {
       gameState = 0;
     }
     return {
       gameState,
       winner
     };
   };
   
   const Player = (sym) => {
     const move = (pos) => {
       if (checkFin().gameState === 0 && !board[pos]){
       	board[pos] = sym;
        turn += 1;
        return true;
        }
        return false;
     };
     return {
       sym,
       move
     };
   };
   const players = [Player("X"), Player("O")];
   
   return {
     board,
     //printBoard,
     checkFin,
     getTurn,
     players,
     clearGame
   };
 })();

 let cells = document.querySelectorAll("#gameBoard > div");
 let message = document.getElementById("message");
 message.textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
 
 for (let i = 0; i < cells.length; i++) {
 	 const j = i;
   cells[i].setAttribute("style", `
grid-column-start: ${i % 3 + 1};
grid-column-end: ${i % 3 + 2};
grid-row-start: ${i % 3 + 1}
grid-row-end: ${i % 3 + 2}`);
	cells[i].addEventListener("click", function() {
  	let currentPlayerIndex = Game.getTurn() % 2;
  	if (Game.players[currentPlayerIndex].move(j)) {
    	this.textContent = Game.players[currentPlayerIndex].sym;
    }
  });
}

document.getElementById("gameBoard").addEventListener("click", function(){
	let isFin = Game.checkFin();
  switch (isFin.gameState) {
  	case -1:
   		message.textContent = "Tie";
    	break
    case 1:
    	message.textContent = `Winner: ${isFin.winner}`;
      break
    case 0:
     message.textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
     break
  }
});
