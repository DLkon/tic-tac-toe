
let playerX, playerO, playerTurn; 
const cells = document.querySelectorAll('.cell');
const statusSpan = document.querySelector('.status span');
const resetBtn = document.getElementById('reset-btn');
playerO = 'O';
playerX = 'X';
playerTurn = 'X';
let moveCounter = 0;
let gameBoard = [
      ['','',''],
      ['','',''],
      ['','','']
];



cells.forEach(cell => {
    cell.addEventListener('click',  () => {
        
    
        if (playerTurn == playerX) {

            let rowId = cell.getAttribute('data-row');
            let columnId = cell.getAttribute('data-col');

            console.log(rowId);
            console.log(columnId);
            gameBoard[rowId][columnId] = playerTurn;
            cell.classList.add(playerTurn.toLowerCase());
            
    
            cell.textContent = playerTurn;
            playerTurn = playerO;
            statusSpan.textContent = playerTurn;
            moveCounter++;



        } else if (playerTurn == playerO) {

            let rowId = cell.getAttribute('data-row');
            let columnId = cell.getAttribute('data-col');

            console.log(rowId);
            console.log(columnId);
             gameBoard[rowId][columnId] = playerTurn;
            cell.classList.add(playerTurn.toLowerCase());
            cell.textContent = playerTurn;
            playerTurn = playerX;
            statusSpan.textContent = playerTurn;
            moveCounter++;
        }

        if(moveCounter >= 5) {
            let result =  check_Game();
            end_game(result);
            console.log('result' + result);

        }
   

    }, { once: true })
})


function check_diagonals(){
  let primary = [];
  let secondary = [];
  let j = 2;
  for(n = 0; n <= 2; n++){ 
    primary.push(gameBoard[n][n]);
    secondary.push(gameBoard[n][j]);
    j = j -1;
  }
  
  return [primary, secondary];
}

function check_Game() {

    let thereIsWinner = false;
    let col;
    diagonals = check_diagonals();
    
    console.log(gameBoard);
    for (let n = 0; n <= 2; n++) { 
            //checking rows
            console.log('n' + n);
        if( gameBoard[n].every(move => move != null && move == gameBoard[n][0])){
            thereIsWinner = true;
            return gameBoard[n][0];
            //checking columns 
        } else {
            col = gameBoard.map(row => row[n]);
            if(col.every(move => move != null && move == col[n])) {
                thereIsWinner = true;
                return col[n];
            }
        }

    }

    diagonals = check_diagonals();
    
    for(let n = 0; n <=1; n++) {
        console.log('hi');
        if(diagonals[n].every(move => move != null && move == diagonals[n][0])){
            return diagonals[n][0];
        }
    }

    
}

function end_game(result) {
       if (result == playerO) {
                console.log('hi o ');
                statusSpan.textContent = `${playerO} Wins!`;
                document.getElementById('board').style.pointerEvents = 'none';

        } else if (result == playerX) {
                console.log('hi x ');
                statusSpan.textContent = `${[playerX]} Wins!`;
                document.getElementById('board').style.pointerEvents = 'none';
            }

}
