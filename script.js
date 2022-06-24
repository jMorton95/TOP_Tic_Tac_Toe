const SelectorMenu = (() => {
    const players = document.querySelectorAll('.player');
    const menus = document.querySelectorAll('.sub-half');
    //Consider adding event listener here

    const hover = function (eventParam) {
        let playerSiblings = document.querySelectorAll(`#${eventParam.target.id} ~ div`);
        for (let elem of playerSiblings){
          elem.classList.add('inputActive'); 
          elem.classList.remove('inputInactive') } 
      }

    const reset = function (eventParam) {
      const children = document.querySelectorAll('.sub-half > :not(:first-child)');
        for (let elem of children){
           elem.classList.remove('inputActive');
        }
    };

    return { players, menus, hover };
})();




SelectorMenu.players.forEach(player => player.addEventListener('mouseover', (e) => {
            SelectorMenu.hover(e);
       }));

SelectorMenu.menus.forEach(subHalf => subHalf.addEventListener('mouseout', (e) => {
              SelectorMenu.reset();
      }));

