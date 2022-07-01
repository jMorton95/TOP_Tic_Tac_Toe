const SelectorMenu = (() => {
  const players = [];
  const _buttons = document.querySelectorAll('.check');

  const _Player = (playerName, e) => { function _findPlayerNum(e) { 
        if (e == "c-1") {
          return 1;
        } else if (e == "c-2"){
          return 2;
    };};

      const playerNum = _findPlayerNum(e);
      return {playerName, playerNum};
  };
   
  function _startGame(){
      //Create Gameboard, set names to players OR set player 1 and use BOT Object as Player 2
  }

  _buttons.forEach(check => check.addEventListener('click', (e) => {
      const newPlayer = _Player('New'/*Ammend to Text Input*/, e.target.id);

        if (newPlayer.playerNum === 1){
          players[0] = newPlayer;
        } else if (newPlayer.playerNum === 2){
          players[1] = newPlayer;
        } 
        
        if (players.includes(undefined) || players.length < 2){
          console.log("fill in players");
        } else {
          console.log("both players found");
        }
        /*Include function to check if our array has 2 players inside, and if it does, begin the game.*/

  }));

  

   
return { players };


})();

const GameBoard = (() => {

})();

