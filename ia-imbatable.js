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


// fonction appelé pour jouer un tour
function onTurn(squareId, player) {
    // on met a jour la grille  avec le symbole
  TableDeJeu[squareId] = player;
  document.getElementById(squareId).innerText = player;
  // on vérifie si le tour est gagnant 
  let isGameWon = onCheckWin(TableDeJeu, player);
  if (isGameWon) {
    // termine la partie si une combinaison gagnante a été trouvé
    onGameOver(isGameWon);
  }
}

// fonction pour vérifier si une combinaison gagnante a  été trouvé
function onCheckWin(board, player) {
     // Réduire la grille de jeu en une liste de tours joués par le joueur actuel
  let plays = board.reduce((a, e, i) => {
    return (e === player) ? a.concat(i) : a;
  }, []);
  // Initialiser la variable pour indiquer si la partie a été gagnée
  let gameWon = false;
    // Vérifier si toutes les cases d'une combinaison gagnante ont été jouées par le joueur 
  for (let [index, win] of winCombo.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
         // Mettre à jour la variable pour indiquer que la partie a été gagnée
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}


// fonction pour terminer le jeu
function onGameOver({ index, player }) {
    // pour chaque index de la combinaison gagnante determiné
  for (let i of winCombo[index]) {
    // déterminer la couleur en fonction du joueur qui a gagné, soit vert pour l'humain, soit rouge pour l'IA
    const color = (player === humain) ? 'green' : 'red';
    // définir la couleur de fond pour chacun des carrés de la combinaison gagnante
    document.getElementById(i).style.backgroundColor = color;
  }
  // désactiver les clics sur les carrés
  for (let i = 0; i < carres.length; i++) {
    carres[i].removeEventListener('click', onTurnClick, false)
  }
 // déterminer le résultat du jeu en fonction de qui a gagné
  const result = (player === humain) ? 'Victoire de l\'humain' : 'Victoire de l\'ia';
  // appel la fonction pour déclarer le gagnant
  onDeclareWinner(result);
}

// fonction pour déclarer le gagnant
function onDeclareWinner(who) {
    // afficher le bloc du résultat
  document.querySelector('.resultat-ttt').style.display = 'block';
  // définir le résultat du jeu à afficher
  document.querySelector('.resultat-ttt .text-ttt').innerText = ` ${who}`;
}



 
// fonction pour vérifier si y a match nul
function onCheckGameTie() {
    // si toutes les carrés sont remlpi
  if (emptySquares().length === 0) {
    // boucle pour changer la couleur de tout les carrés en bleu
    for (let i = 0; i < carres.length; i++) {
      carres[i].style.backgroundColor = 'blue';
      // on enlève le click
      carres[i].removeEventListener('click', onTurnClick, false)
    }
    // on affiche un message match nul
    onDeclareWinner('Match nul');
    return true;
  } else {
    return false;
  }
}

//IA

// Cette fonction retourne un tableau avec les cases vides
function emptySquares() {
     // Utilise la fonction filter pour retourner un tableau avec les cases qui sont du type "number"
  return TableDeJeu.filter(item => typeof item === 'number');
}

// Cette fonction permet à l'IA de choisir un emplacement
function botPicksSpot() {
    // Utilise la fonction minimax pour déterminer le meilleur choix de l'IA et retourne l'index
  return minimax(TableDeJeu, ai).index;
}

// Cette fonction implémente l'algorithme minimax pour déterminer le meilleur coup à jouer
function minimax(newBoard, player) {
  // Obtient un tableau avec les emplacements disponibles
  let availableSpots = emptySquares();

  // Si le joueur humain gagne
  if (onCheckWin(newBoard, humain)) {
    // Retourne un score de -10 pour dire que l'IA a perdu
    return { score: -10 }
  } 
  // Si l'IA gagne
  else if (onCheckWin(newBoard, ai)) {
    // Retourne un score de 10 pour dire que l'IA a gagné
    return { score: 10 }
  } 
  // Si tous les emplacements sont remplis et qu'il n'y a pas de gagnant
  else if (availableSpots.length === 0) {
    // Retourne un score de 0 pour dire que c'est un match nul
    return { score: 0 }
  }

  // Tableau pour enregistrer tous les coups
  let moves = [];

  // Boucle à travers tous les emplacements disponibles
  for (let i=0; i<availableSpots.length; i++) {
    let move = {};
    // Enregistre l'index de l'emplacement
    move.index = newBoard[availableSpots[i]];
    // Place le joueur sur cet emplacement
    newBoard[availableSpots[i]] = player;

    // Si c'est à l'IA de jouer
    if (player === ai) {
      // Calcule le score pour ce coup en appelant récursivement minimax pour l'autre joueur
      let result = minimax(newBoard, humain);
      // Enregistre le score pour ce coup
      move.score = result.score;
    } 
    // Si c'est à l'autre joueur de jouer
    else {
      // Calcule le score pour ce coup en appelant récursivement minimax pour l'IA
      let result = minimax(newBoard, ai);
      // Enregistre le score pour ce coup
      move.score = result.score;
    } 

    // Réinitialise l'emplacement pour permettre d'autres calculs
    newBoard[availableSpots[i]] = move.index;
    // Ajoute ce coup au tableau de coups
    moves.push(move);
  } 

  let bestMove;

// Vérifier si le joueur est l'IA
if (player === ai) {
  // Initialiser le meilleur score à une valeur faible
  let bestScore = -10000;

  // Boucler à travers tous les coups possibles
  for (let i=0; i<moves.length; i++) {
    // Si le coup actuel a un score plus élevé que le meilleur score
    if (moves[i].score > bestScore) {
      // Mettre à jour le meilleur score
      bestScore = moves[i].score;
      // Mettre à jour le meilleur coup
      bestMove = i;
    }
  } 
} 
else {
  // Initialiser le meilleur score à une valeur élevée
  let bestScore = 10000;

  // Boucler à travers tous les coups possibles
  for (let i=0; i<moves.length; i++) {
    // Si le coup actuel a un score plus bas que le meilleur score
    if (moves[i].score < bestScore) {
      // Mettre à jour le meilleur score
      bestScore = moves[i].score;
      // Mettre à jour le meilleur coup
      bestMove = i;
    }
  }
}

// Retourner le meilleur coup
return moves[bestMove];
 }