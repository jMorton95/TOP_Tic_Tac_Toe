const playerSelectors = (() => {
    let players = document.querySelectorAll('.player');
    return players;
})();


playerSelectors.forEach(player => player.addEventListener('mouseover', (e) => {
  e.target.classList.add('red');

   }
));
