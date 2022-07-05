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
  const _Computer = (playerName, playerNum) => {

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
      playerScores[x].textContent = `${players[x].winCount}`;
    };
  };

  
 //Assign Event Handling to our Start Buttons + Conditions for Deciding Game State.
  _startButtons.forEach(startButton => startButton.addEventListener('click', (e) => {
    e.preventDefault();

   /*First Select all Form Text Fields related to our Start Buttons*/
    let inputs = (() => {
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
        let newPlayer = _Player(inputs[x], x+1);
        players.push(newPlayer);
      }
      if (players.length < 2){
        let newComputer = _Computer('Computer', 2) //Create our Computer Object
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
 //When we first Mouseover our GameBoard, apply EventHandler's to each of our nine sections.
  const bindEventApplication = document.querySelector('.gameBoard').addEventListener('mouseover', (e) => {
      GameSetup.gameBoard.forEach(gbSection => gbSection.addEventListener('click', (e) => {

         if (GameSetup.players[0].addTurn() > GameSetup.players[1].addTurn()){
           e.target.textContent = "O";
           GameSetup.players[1].addTurn();
            
         } else {
           e.target.textContent = "X";
           GameSetup.players[0].addTurn();
         }
    }));
  }, {once: true});
 
  return {};

})();
