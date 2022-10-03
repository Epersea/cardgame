const { DeckOfCards} = require('./deckofcards.js'); 
const { Hand } = require('./hand.js')
const { Player } = require('./player.js')

const monsterNum = 25;
const ingredientNum = 40;

const deck = new DeckOfCards(monsterNum, ingredientNum).shuffle();

const discards = [];

console.log("Cards are shuffled...")

const hand1 = new Hand(deck.splice(0, 7));

while (hand1.getDifferentIngredients().length > 4) {
  hand1.redistribute(deck);
}

const hand2 = new Hand(deck.splice(0, 7))

while (hand2.getDifferentIngredients().length > 4) {
  hand2.redistribute(deck);
}

const player1 = new Player('Player One', hand1);
const player2 = new Player ('Player Two', hand2);

console.log('Each player has their cards. We are ready to begin! Our players will try to get 5 different ingredients to make the Ultimate Superpotion and control the Universe.')

let round = 1;
const maxRounds = 10;

while(true) {
  console.log(`ROUND #${round}.`)

  player1.playRound(player2, deck, discards);

  if (player1.hand.getDifferentIngredients().length > 4) {
    console.log(`${player1.name} wins! Their Ultimate Superpotion ingredients are: ${player1.hand.getDifferentIngredients().join(', ')}. The game is over.`);
    break;
  }

  player2.playRound(player1, deck, discards);

  if (player2.hand.getDifferentIngredients().length > 4) {
    console.log(`${player2.name} wins! Their Ultimate Superpotion ingredients are: ${player2.hand.getDifferentIngredients().join(', ')}. The game is over.`);
    break;
  }

  round++;
  if (round == (maxRounds + 1)) {
    console.log("Looks like none of our players can prevail. We shall declare this a tie.");
    break;
  }
}