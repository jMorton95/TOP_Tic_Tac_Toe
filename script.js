const SelectorMenu = (() => {

    
  const players = [];
  const _checks = document.querySelectorAll('.check');

  const _Player = (playerName, e) => {

      function _findPlayerNum(e){ 
        if (e == "c-1") {
          return 1;
        } else if (e == "c-2"){
          return 2;
        };
      };

      const playerNum = _findPlayerNum(e);

      return {playerName, playerNum};
  };
    
  _checks.forEach(check => check.addEventListener('click', (e) => {
        const newPlayer = _Player('New', e.target.id);
        players.push(newPlayer);
        
  }));

   
return { players };


})();

