// factory player
const player = (playerName, boardMark) => {
    let name = playerName;
    const getMark = () => boardMark;
    const getName = () => name;
    const setName = (newName) => name = newName;
    return { getMark, getName, setName }
};


// the module for controle

const game = (() => {
    // cache DOM
    let _player1 = document.querySelector('#player-1');
    let _player2 = document.querySelector('#player-2');
    let playerHighlight = document.querySelector('.highlight');

    let winCondition = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // create the two player
    const player1 = player('player1', 'X');
    const player2 = player('player2', 'O');

    let playerTurn = player1;
    const getPlayerTurn = () => playerTurn;
    const switchPlayerTurn = () => {
        if(playerTurn.getName() === 'player1'){
            playerTurn = player2;
            _player2.classList.add('highlight');
            _player2.lastElementChild.textContent = 'Your turn';
            _player1.classList.remove('highlight');
            _player1.lastElementChild.textContent = '';
        }else {
            playerTurn = player1;
            _player1.classList.add('highlight');
            _player1.lastElementChild.textContent = 'Your turn';
            _player2.classList.remove('highlight');
            _player2.lastElementChild.textContent = '';
        }
    }
    const checkWinner = () => {
        let winner = false;
        winCondition.forEach((item, index)=>{
            if(gameBord.getGameBord()[item[0]] !== '' && gameBord.getGameBord()[item[0]] === gameBord.getGameBord()[item[1]] && gameBord.getGameBord()[item[0]] === gameBord.getGameBord()[item[2]]){
                console.log("winner is: ",getPlayerTurn().getName());
                endGame(getPlayerTurn().getName());
                winner = getPlayerTurn().getName();
                return winner;
            }
            if(!winner){
                if(Array.from(gameBord.getGameBord()).every((item)=>{return item != '';})){
                    endGame('tie');
                    winner = "tie";
                }
            }
            
        })
        
        return winner;
    }
    const endGame = (status) => {
        if(status === 'player1'){
            _player1.lastElementChild.textContent = 'YOU WIN';
            _player2.lastElementChild.textContent = 'YOU Lost';
        }else if(status === 'player2'){
            _player2.lastElementChild.textContent = 'YOU WIN';
            _player1.lastElementChild.textContent = 'YOU Lost';
        }else {
            _player2.lastElementChild.textContent = 'tie';
            _player1.lastElementChild.textContent = 'tie';
            _player1.classList.remove('highlight')||_player2.classList.remove('highlight');
            // document.querySelector('.highlight').classList.remove('highlight');
        };

    }
    const resetDOM = ()=>{
        playerTurn = player1;
        _player1.classList.add('highlight');
        _player1.lastElementChild.textContent = 'Your turn';
        _player2.classList.remove('highlight');
        _player2.lastElementChild.textContent = '';
        document.querySelector('.highlight').lastElementChild.textContent = 'Your turn';
        /* _player1.lastElementChild.textContent = '';
        _player2.lastElementChild.textContent = ''; */
    }
    return { player1, player2, getPlayerTurn, switchPlayerTurn, checkWinner, resetDOM}
})();


// the module for the game bord
const gameBord = (()=>{
    let gameBord = ['','','','','','','','',''];
    // cache DOM
    let gameBordGrid = document.querySelector('#grid-container');
    let gameBordBtn = document.querySelectorAll('#grid-container .btn');
    const newBtn = document.querySelector("#btn-new");

    const getGameBord = () => gameBord;
    const render = () => {
            gameBord.forEach(draw)
    }
    const addMark = (item, index)=>{
        item.addEventListener('click', ()=>{
            if(gameBord[index] === ''){
                gameBord[index] = game.getPlayerTurn().getMark();
                render();
                if(game.checkWinner()) return;
                game.switchPlayerTurn();
            }
        })
    }

    const draw = (item, index) => {
        gameBordBtn[index].textContent = item
    }
    const clearGameBord = () => {
        gameBord = ['','','','','','','','',''];
        render();
        game.resetDOM();
    }

    render();
    // btn events 
    newBtn.addEventListener('click', clearGameBord);

    gameBordBtn.forEach(addMark);
    return { getGameBord }
})();
