const SelectorMenu = (() => {
  "use strict";
    const players = document.querySelectorAll('.player');
    const menus = document.querySelectorAll('.sub-half');

    const setPlayerOne = function (input) {
        return input.textContent;
    };

    const setPlayerTwo = function (input){
        //Consider Factory Function to set Bot Difficulties.
        //Decide return value as either a user form input, or Bot Object
    };

    return { players, menus};

// CSS SOLUTION FOUND INSTEAD
    /*const hover = function (e) {
        let playerSiblings = document.querySelectorAll(`#${e.target.id} ~ div`);
        for (let elem of playerSiblings){
          elem.classList.add('inputActive'); 
          elem.classList.remove('inputInactive');
    }};

    const reset = function (e) {
      const children = document.querySelectorAll(`#${e.target.id} > :not(:first-child)`);
        for (let elem of children){
           elem.classList.remove('inputActive');
           elem.classList.add('inputInactive');
    }};*/



})();

//Consider BOT Template object, used as a prototype for BOT Difficulties.
