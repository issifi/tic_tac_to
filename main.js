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

    // create the two player
    const player1 = player('player1', 'X');
    const player2 = player('player2', 'O');
    let playerTurn = player1;
    const getPlayerTurn = () => playerTurn;
    const switchPlayerTurn = () => {
        if(playerTurn.getName() === 'player1'){
            playerTurn = player2;
            _player2.classList.add('highlight');
            _player1.classList.remove('highlight');
        }else {
            playerTurn = player1;
            _player1.classList.add('highlight');
            _player2.classList.remove('highlight');
        }
    }
    return { player1, player2, getPlayerTurn, switchPlayerTurn}
})();


// the module for the game bord
const gameBord = (()=>{
    let gameBord = ['','','','','','','','',''];
    // cache DOM
    let gameBordGrid = document.querySelector('#grid-container');
    
    let gameBordBtn = document.querySelectorAll('#grid-container .btn');
    const newBtn = document.querySelector("#btn-new");

    const render = () => {
        if(gameBord.length !== 0){
            gameBord.forEach(draw)
        }
    }
    const addMark = (item, index)=>{
        item.addEventListener('click', ()=>{
            if(gameBord[index] === ''){
                gameBord[index] = game.getPlayerTurn().getMark();
                game.switchPlayerTurn()
            }
            render();
        })
    }

    const draw = (item, index) => {
        gameBordBtn[index].textContent = item
    }
    const clearGameBord = () => {
        gameBord = ['','','','','','','','',''];
        render();
    }

    render();
    // btn events 
    newBtn.addEventListener('click', clearGameBord);

    gameBordBtn.forEach(addMark);
})();
