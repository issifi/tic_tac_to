// factory player
const player = (boardMark) => {
    const getMark = () => boardMark;
};
// the module 
const gameBord = (()=>{
    let gameBord = ['','x','','o','','x','','o','x'];
    // cache DOM
    let gameBordGrid = document.querySelector('#grid-container');
    let player1 = document.querySelector('#player-1');
    let player2 = document.querySelector('#player-2');
    let gameBordBtn = document.querySelectorAll('#grid-container .btn');
    const newBtn = document.querySelector("#btn-new");

    const render = () => {
        if(gameBord.length !== 0){
            gameBord.forEach(draw)
        }
    }
    const addMark = () => {

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

    gameBordBtn.forEach((item, index)=>{
        item.addEventListener('click', ()=>{
            if(gameBord[index] === ''){
                gameBord[index] = 'x';
            }
            render();
        })
    })
})();