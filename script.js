const GameSetup = (() => {
  const players = [];
  let gameBoard;
  const _startButtons = document.querySelectorAll('.startButton');
  
//Factory Functions that Return our Player or Computer Objects.
  const _Player = (playerName, playerNum) => {
    
/*Need to add properties for incrementing a win counter*/
    return {playerName, playerNum};
  };
  const _Computer = () => {
    return {};
  };
   
//Create and Append 9 GameBoard Section Elements.
  function _startGame(){
    gameBoard = document.querySelector('.gameBoard');
    for (let x = 0; x < 9; x++){
        const element = document.createElement('div');
        element.classList.add('gbSection');
        gameBoard.append(element);
      }
    gameBoard = document.querySelectorAll('.gbSection');
    let inputContainer = document.querySelector('.inputs');
    let main = document.querySelector('main');
    inputContainer.style = "display: none";
    main.style = "flex-grow: 8";
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
        let newComputer = { computerName: 'Bot' }; //Later Instantiate Computer Object from Function here.
        players.push(newComputer);
      };
   })();
   
   _startGame();

  }));

return { players, gameBoard };
})();

const GameBoard = (() => {

})();
