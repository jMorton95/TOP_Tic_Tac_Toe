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


})();

//Consider BOT Template object, used as a prototype for BOT Difficulties.
