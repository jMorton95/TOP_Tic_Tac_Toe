//This Module Pattern Object handles all of our initial game creation.
const GameSetup = (() => {
  const players = [];
  const gameBoard = [];
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
    const gameBoardContainer = document.querySelector('.gameBoard');
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

return { players, gameBoard };
})();


const Game = (() => {
 //Create an array of 9 empty values for later referencing. Used for finding Win Conditions.
  const _gameState = (() => {
    let internalBoard = [];
      for (x = 0; x < 9; x++){
        internalBoard.push(undefined);
        };
    return internalBoard;
  })();

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
            }
        })();
      }
      
      const winCondition = ((gS) => {
    //Ugly Comparison of all WinConditions.
      //Horizontals
        if (gS[0] !== undefined && gS[0] == gS[1] && gS[1] == gS[2]){
          for (let x = 0; x < 3; x++){
            GameSetup.gameBoard[x].style = "background-color: red";
            }}
        else if (gS[3] !== undefined && gS[3] == gS[4] && gS[4] == gS[5]){
            for (let x = 3; x < 6; x++){
              GameSetup.gameBoard[x].style = "background-color: red";
            }}
      //Verticals
        else if (gS[6] !== undefined && gS[6] == gS[7] && gS[7] == gS[8]){
            for (let x = 6; x < 9; x++){
              GameSetup.gameBoard[x].style = "background-color: red";
            }}
        else if (gS[0] !== undefined && gS[0] == gS[3] && gS[3] == gS[6]){
            for (let x = 0; x < 7; x = x+3){
              GameSetup.gameBoard[x].style = "background-color: red";
            }}
        else if (gS[1] !== undefined && gS[1] == gS[4] && gS[4] == gS[7]){
          for (let x = 1; x < 8; x = x+3){
            GameSetup.gameBoard[x].style = "background-color: red";
          }}
      //Diagnonals
        else if (gS[0] !== undefined && gS[0] == gS[4] && gS[4] == gS[8]){
            for (let x = 0; x < 9; x = x+4){
              GameSetup.gameBoard[x].style = "background-color: red";
            }}
        else if (gS[2] !== undefined && gS[2] == gS[4] && gS[4] == gS[6]){
             for (let x = 2; x < 7; x = x+2){
              GameSetup.gameBoard[x].style = "background-color: red";
            }}
      })(_gameState);
    }));
  }, {once: true});
})();
