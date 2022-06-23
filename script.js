const SelectorMenu = (() => {
    const players = document.querySelectorAll('.player');
    //Consider adding event listener here

    const hover = function (eventParam) {
        let playerSiblings = document.querySelectorAll(`#${eventParam.target.id} ~ div`);
        for (let elem of playerSiblings){
          elem.classList.add('red'); } 
      }

    return { players, hover };
})();



SelectorMenu.players.forEach(player => player.addEventListener('mouseover', (e) => { SelectorMenu.hover(e);

   }
));
