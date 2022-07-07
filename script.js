//This Module Pattern Object handles all of our initial game creation.
const GameSetup = (() => {
  const players = [];
  const gameBoard = [];
  const gameBoardContainer = document.querySelector('.gameBoard');
  const _startButtons = document.querySelectorAll('.startButton');
  

 //Factory Functions that Return our Player or Computer Objects.
  const _Player = (playerName, playerNum) => {
    
    let _turnCount = 0;
      function addTurn(){
        return _turnCount++;
      }

    return {playerName, playerNum, addTurn };
  };


 //Inherit prototype of Player, create AI Methods.
  const _Computer = (playerName = "Computer", playerNum) => {

    const playerSettings = _Player(playerName, playerNum);

    const iAmAComputer = () => { console.log(playerName) };
   /*Object.assign to return a Computer Object with our Inherited properties
    and our Computer only Methods*/
    return Object.assign({}, playerSettings, {iAmAComputer});
  };
   

 //Create and Append 9 GameBoard Section Elements.
  function _startGame(){
    for (let x = 0; x < 9; x++){
        const element = document.createElement('div');
        element.classList.add('gbSection');
        gameBoardContainer.append(element);
        gameBoard.push(element);
      };

   //Hide Inputs and Resize Main.
    let inputContainer = document.querySelector('.inputs');
    let main = document.querySelector('main');
    inputContainer.style = "display: none";
    main.style = "flex-grow: 8";
  
   //Render Player Score Tracking
    const playersContainer = document.querySelector('.playersContainer');
    playersContainer.style = "display: flex";
    const playerNames = document.querySelectorAll('.playersContainer > div > :first-child');
    const playerScores = document.querySelectorAll('.playersContainer > div > :last-child');
    for (let x = 0; x < 2; x++){
      playerNames[x].textContent = `${players[x].playerName}` + '\'s Score:';
      playerScores[x].textContent = 0;
    };
  };

  
 //Assign Event Handling to our Start Buttons + Conditions for Deciding Game State.
  _startButtons.forEach(startButton => startButton.addEventListener('click', (e) => {
    e.preventDefault();
   /*First Select all Form Text Fields related to our Start Buttons*/
    const inputs = (() => {
        const positives = [];
          let textBoxes = document.querySelectorAll('input[type=text]');
            for (x = 0; x < textBoxes.length; x++){
              if (textBoxes[x].id == e.target.id){
                 positives.push(textBoxes[x].value);
               }; 
            };
          return positives;
    })();

   /*Create our Player Objects */
    const createPlayers = (() => {
      for (x = 0; x < inputs.length; x++){
        let newPlayer = _Player(inputs[x] || "Player " + (x+1), x+1);
        players.push(newPlayer);
      }
      if (players.length < 2){
        let newComputer = _Computer(undefined, 2) //Create our Computer Object
        players.push(newComputer);
      };
      //Immediately Increment the first players Turn Count.
      players[0].addTurn();
   })();

  
  //Finally Render Our GameBoard.
   _startGame();
  }));

return { players, gameBoard, gameBoardContainer };
})();


const Game = (() => {
  
  function cleanState(){
    let internalBoard = [];
      for (x = 0; x < 9; x++){
        internalBoard.push(undefined);
        };
    return internalBoard;
    }
    let _gameState = cleanState();

  
 //Create an array of 9 empty values for later referencing. Used for finding Win Conditions.
 

 //Ugly Comparison of all WinConditions.
  const _winCondition = function(gS) {
    const winners = [];
    //Horizontals
    if (gS[0] !== undefined && gS[0] == gS[1] && gS[1] == gS[2]){
      for (let x = 0; x < 3; x++){
          winners.push(GameSetup.gameBoard[x]);
      }}
      else if (gS[3] !== undefined && gS[3] == gS[4] && gS[4] == gS[5]){
          for (let x = 3; x < 6; x++){
            winners.push(GameSetup.gameBoard[x]);
          }}
      else if (gS[6] !== undefined && gS[6] == gS[7] && gS[7] == gS[8]){
          for (let x = 6; x < 9; x++){
            winners.push(GameSetup.gameBoard[x]);
          }}
    //Verticals
      else if (gS[0] !== undefined && gS[0] == gS[3] && gS[3] == gS[6]){
          for (let x = 0; x < 7; x = x+3){
            winners.push(GameSetup.gameBoard[x]);
          }}
      else if (gS[1] !== undefined && gS[1] == gS[4] && gS[4] == gS[7]){
          for (let x = 1; x < 8; x = x+3){
            winners.push(GameSetup.gameBoard[x]);
          }}
      else if (gS[2] !== undefined && gS[2] == gS[5] && gS[5] == gS[8]){
        for (let x = 2; x < 9; x = x+3){
            winners.push(GameSetup.gameBoard[x]);
          }}
    //Diagnonals
      else if (gS[0] !== undefined && gS[0] == gS[4] && gS[4] == gS[8]){
          for (let x = 0; x < 9; x = x+4){
            winners.push(GameSetup.gameBoard[x]);
          }}
      else if (gS[2] !== undefined && gS[2] == gS[4] && gS[4] == gS[6]){
            for (let x = 2; x < 7; x = x+2){
            winners.push(GameSetup.gameBoard[x]);
          }}
      else if (gS.includes(undefined) == false){
          for (let x = 0; x < 9; x++){
            winners.push(GameSetup.gameBoard[x]);
          }  
      }
    else {
      return undefined;
      }
    return winners;
  };

  function resetRound(win) {
    for (let x = 0; x < 9; x++){
      GameSetup.gameBoard[x].textContent = "";
    }
    //Stagger the change in ClassList by 250ms per Section.
    for (let y = 0; y < win.length; y++){
      setTimeout(() => {
        win[y].classList = ('gbSection');
      }, y * 250);
      
    }
    GameSetup.gameBoardContainer.classList.toggle('gameBoardNoClick');
  }

 //When we first Mouseover our GameBoard, apply EventHandler's to each of our nine sections.
  const bindEventApplication = document.querySelector('.gameBoard').addEventListener('mouseover', (e) => {
      GameSetup.gameBoard.forEach(gbSection => gbSection.addEventListener('click', (e) => {

        //Check if GameBoard Section is empty, then decide if we apply an X or O.
        if (e.target.textContent == ""){
          const turnPosition = GameSetup.gameBoard.indexOf(e.target);
          const playTurn = (() => {
            if (GameSetup.players[0].addTurn() > GameSetup.players[1].addTurn()){
              e.target.textContent = "O";
              _gameState[turnPosition] = 0;
              GameSetup.players[1].addTurn();
            } else {
              e.target.textContent = "X";
              _gameState[turnPosition] = 1;
              GameSetup.players[0].addTurn();
            };
        })();
      };

      //Execute when we find a winning combo.
      (function roundEnd() {
        let win;
         //First check if any WinConditions are found before executing the end of the round.
          if((win = _winCondition(_gameState)) !== undefined){
            GameSetup.gameBoardContainer.classList.toggle('gameBoardNoClick');
            if (win.length < 4){
              for (let x = 0; x < win.length; x++){
                setTimeout(() => {
                  win[x].classList.toggle('winners');
                }, x * 250);
              };
                if (e.target.textContent == "O"){
                    let winnerScore = document.querySelector('.p1Score');
                    winnerScore.textContent = parseInt(winnerScore.textContent) + 1;
                    document.querySelector('.title').textContent = (GameSetup.players[0].playerName + ' Wins!');
                  } else {
                    let winnerScore = document.querySelector('.p2Score');
                    winnerScore.textContent = parseInt(winnerScore.textContent) + 1;
                    document.querySelector('.title').textContent = (GameSetup.players[1].playerName + ' Wins!');
                  }
              } else if (win.length > 4){
                  for (let x = 0; x < win.length; x++){
                    document.querySelector('.title').textContent = 'Draw';
                    setTimeout(() => {
                      win[x].classList.toggle('draw');
                      GameSetup.gameBoard[x].textContent = "";
                    }, x * 250);
                  };
              }
        //Reset Round
        _gameState = cleanState();
        setTimeout(() => {
          resetRound(win);
        }, "3000");
        
      }})();

      
      
      
    }));
  }, {once: true});
})();
