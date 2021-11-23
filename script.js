'use strict'

let first;
let second;
let array = [];
const game = (() => { 
    let board = ["","","","","","","","",""];
    let back = () => {
        const container = document.querySelector('.game');
        const section = document.querySelector('.info');
        container.style.display = "none";
        section.style.display = "flex";  
    };

    let start = () => {
        const container = document.querySelector('.game');
        const section = document.querySelector('.info');
        container.style.display = "flex";
        section.style.display = "none";    
        first = player(document.getElementById('Player1').value,1,"X");
        second = player(document.getElementById('Player2').value,2,"O")      
    };
    
    let restart = () => { 
    const btn = document.querySelectorAll('button');    
    const div = document.querySelector('.textBox');
    div.textContent = '';
    btn.forEach(function(button){

    if(button.id == "back"){
        button.textContent = "Back";
    }
    else if (button.id == "restart"){
        button.textContent = "Restart game";
    }
    else if (button.id == "submit"){
        button.textContent = "Start Game";
    }
    else {
    button.textContent = "";
    game.board = ["","","","","","","","",""];
    button.disabled = false;

    };
});
};
    return {board,back,start,restart}

})();

let start = document.querySelector('#submit');
let back = document.querySelector('.back');
let restart = document.querySelector('.restart');

const player = (name,position,symbol)  => { 
    
    return {name,position,symbol}
};

back.addEventListener('click',game.back);
start.addEventListener('click',game.start);
restart.addEventListener('click',game.restart);


const checkGame = (() => {
   
    const win = () => {
        if  (game.board[0] == "X" && game.board[1] == "X" && game.board[2] == 'X' || game.board[3] == "X"
        && game.board[4] == "X" && game.board[5]=="X" || game.board[6] == "X" && game.board[7] == "X"
        && game.board[8] == "X" || game.board[0] == "X" && game.board[3] == "X" && game.board[6] == "X"
        || game.board[1] == "X" && game.board[4] == "X" && game.board[7] == "X" || game.board[2] == "X"
        && game.board[5] == "X" && game.board[8] =="X" || game.board[0] == "X" && game.board[4] == "X" &&
        game.board[8] == "X" || game.board[2] == "X" && game.board[4]=="X" && game.board[6] == "X")
        {   
            const btn = document.querySelectorAll('div.container button');
            const div = document.querySelector('.textBox');
            div.textContent = first.name + " " + "wins";
            btn.forEach(function(button){
                button.disabled = true;
        });
    }
         else if (game.board[0] == "O" && game.board[1] == "O" && game.board[2] == 'O' || game.board[3] == "O"
        && game.board[4] == "O" && game.board[5]=="O" || game.board[6] == "O" && game.board[7] == "O"
        && game.board[8] == "O" || game.board[0] == "O" && game.board[3] == "O" && game.board[6] == "O"
        || game.board[1] == "O" && game.board[4] == "O" && game.board[7] == "O" || game.board[2] == "O"
        && game.board[5] == "O" && game.board[8] || game.board[0] == "O" && game.board[4] == "O" &&
        game.board[8] == "O" || game.board[2] == "O" && game.board[4]=="O" && game.board[6] == "O"){
        const div = document.querySelector('.textBox');    
        const btn = document.querySelectorAll('div.container button');
        div.textContent = second.name + " " + "wins";
        btn.forEach(function(button){
            button.disabled = true;
        });
    } 
    else if (array.length == 9) {
        const div = document.querySelector('.textBox');
        div.textContent = "It's a Draw :("
    }
        
};   

  return {win} 
})();

const btns = document.querySelectorAll('div.container button');
btns.forEach(function(button){
    button.addEventListener('click',()=>{
       let square = button.id;
        if (first.position == 1) {
        array.push(first.symbol);
        document.getElementById(square).textContent = "X"
        let btn = document.getElementById(square);
        let num = btn.dataset.number;
        game.board.splice(num,1,first.symbol)
        first.position = 0;
        button.disabled = true;
        checkGame.win(); 
        }
        
        else {
        document.getElementById(square).textContent = "O"
        let btn = document.getElementById(square);
        let num = btn.dataset.number;
        array.push(second.symbol);
        game.board.splice(num,1,second.symbol)
        first.position = 1;
        button.disabled = true;
        checkGame.win();
        }

    });
});

