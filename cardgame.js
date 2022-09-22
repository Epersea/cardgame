const {Hand, DeckOfCards, Player} = require('./classes.js'); 

let deck = new DeckOfCards(20, 40).shuffle();

let discards = [];

console.log("Cards are shuffled...")

let hand1 = new Hand(deck.splice(0, 7));

while (hand1.getDifferentIngredients().length > 4) {
  hand1.redistribute(deck);
}

let hand2 = new Hand(deck.splice(0, 7))

while (hand2.getDifferentIngredients().length > 4) {
  hand2.redistribute(deck);
}

let player1 = new Player('Player One', hand1.cards);
let player2 = new Player ('Player Two', hand2.cards);

console.log('Each player has their cards. We are ready to begin! Our players will try to get 5 different ingredients to make the Ultimate Superpotion and control the Universe.')

let round = 1;
let maxRounds = 10;

while(true) {
  console.log(`ROUND #${round}.`)

  player1.playRound(player2, deck, discards);

  if (player1.getDifferentIngredients().length > 4) {
    console.log(`${player1.name} wins! Their Ultimate Superpotion ingredients are: ${player1.getDifferentIngredients().join(', ')}. The game is over.`);
    break;
  }

  player2.playRound(player1, deck, discards);

  if (player2.getDifferentIngredients().length > 4) {
    console.log(`${player2.name} wins! Their Ultimate Superpotion ingredients are: ${player2.getDifferentIngredients().join(', ')}. The game is over.`);
    break;
  }

  round++;
  if (round == (maxRounds + 1)) {
    console.log("Looks like none of our players can prevail. We shall declare this a tie.");
    break;
  }
}