const SelectorMenu = (() => {
  const players = [];
  const gameBoard = [];
  const _buttons = document.querySelectorAll('.check');

  const _Player = (playerName, e) => {
    //Factory Function that Returns a Player Object and stores it in our Players Array.
    function _findPlayerNum(e) {
        if (e == "c-1") {
          return 1;
        } else if (e == "c-2"){
          return 2;
    };};
      const playerNum = _findPlayerNum(e);
      return {playerName, playerNum};
  }
   
  function _startGame(){
    //Create and Append 9 GameBoard Section Elements.
    for (let x = 9; x > 0; x--){
        const element = document.createElement('div');
        element.classList.add('gbSection');
        gameBoard.push(element);
      }

    let main = document.querySelector('mainCenter');
    main.append(gameBoard);
  }

  /* Func That appends player names or BOT to Taga*/
  
  //Assign Event Handling to our Selection Menu + conditions for Functionality.
  _buttons.forEach(check => check.addEventListener('click', (e) => {
      const newPlayer = _Player('New'/*Ammend to Text Input*/, e.target.id);
        //Position newPlayer into our array depending on the Player Number.
        if (newPlayer.playerNum === 1){
          players[0] = newPlayer;
        } else if (newPlayer.playerNum === 2){
          players[1] = newPlayer;
        } 
        
        //Check our Array contains both players before creating GameBoard.
        if (players.includes(undefined) || players.length < 2){
          console.log("fill in players");
        } else {
          console.log("both players found");
        }
        /*Include function to check if our array has 2 players inside, and if it does, begin the game.*/

  }));
return { players, gameBoard };


})();

const GameBoard = (() => {

})();

