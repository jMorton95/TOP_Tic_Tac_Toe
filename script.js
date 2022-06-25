const SelectorMenu = (() => {
    const players = document.querySelectorAll('.player');
    const menus = document.querySelectorAll('.sub-half');

    const hover = function (e) {
        let playerSiblings = document.querySelectorAll(`#${e.target.id} ~ div`);
        for (let elem of playerSiblings){
          elem.classList.add('inputActive'); 
          elem.classList.remove('inputInactive');
        } 
      };

    const reset = function (e) {
      const children = document.querySelectorAll(`#${e.target.id} > :not(:first-child)`);
        for (let elem of children){
           elem.classList.remove('inputActive');
           elem.classList.add('inputInactive');
        }
    };

    return { players, menus, hover, reset };
})();




SelectorMenu.players.forEach(player => player.addEventListener('mouseover', (e) => {
            SelectorMenu.hover(e);
       }));

SelectorMenu.menus.forEach(subHalf => subHalf.addEventListener('mouseout', (e) => {
              if (e.target.classList == 'sub-half') SelectorMenu.reset(e) || console.log(e.target.classList);
      }));

