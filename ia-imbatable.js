let TableDeJeu;

// joueurs
const humain = '0';
const ai = 'x';

// Combinaison gagnante
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];


// on récupère les carrés
const carres = document.getElementsByClassName('carre');
// On démare le TTT
StartTtt();
// Fonction de démarrage du TTT
function StartTtt() {
    // On cache l'endoit du message de victoire ou défaite
  document.querySelector('.resultat-ttt').style.display = 'none';
  // on met en place le jeu
  TableDeJeu = Array.from(Array(9).keys());
  for (let i = 0; i < carres.length; i++) {
    carres[i].innerText = '';
    carres[i].style.removeProperty('background-color');
    carres[i].addEventListener('click', onTurnClick, false)
  }
};


// fonction appelé lors de chaque tour 
function onTurnClick(e) {
    // on récupère l'id de la case 
  const { id: squareId } = e.target;
  // on vérifie si la case choisi n'est pas déja joué
  if (typeof TableDeJeu[squareId] === 'number') {
    // Tour du joueur humain
    onTurn(squareId, humain);
    // on vérifie si il n'y a pas match nul
    if (!onCheckGameTie()) {
        // et a l'ia de jouer
      onTurn(botPicksSpot(), ai)
    }
  } else {
    // affichage d'un message d'alerte si la case est joué
    const message = 'Case déja prise';
    alert(message);
  }
}


