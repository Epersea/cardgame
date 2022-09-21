const {Hand, DeckOfCards, Player} = require('./classes.js'); 

// Let's simulate a game!

let deck = new DeckOfCards(10, 30).shuffle();
let discards = [];

console.log("Cards are shuffled...")
let hand = new Hand(deck.splice(0, 7));

while (hand.checkIf5DifferentIngredients()) {
  deck.push(hand.cards);
  deck = deck.flat().sort(function () {
    return Math.random() - 0.5;
  });
  hand.cards = deck.splice(0, 7);
}

let hand2 = new Hand(deck.splice(0, 7));

while (hand2.checkIf5DifferentIngredients()) {
  deck.push(hand2.cards);
  deck = deck.flat().sort(function () {
    return Math.random() - 0.5;
  });
  hand2.cards = deck.splice(0, 7);
}

let player1 = new Player('player1', hand.cards);
let player2 = new Player ('player2', hand2.cards);

console.log('Each player has their cards. We are ready to begin!')


// Let's check if there are cards in deck. If not, shuffle discards and reassign.

if (deck.length == 0) {
  discards.sort(function () {
    return Math.random() - 0.5;
  })
  deck = discards;
  discards = [];
  console.log("There are no cards remaining in the deck, so we have shuffled the discard pile.")
}

// Playing rounds
let round = 1;
let maxRounds = 10;
while(true) {
  console.log(`ROUND #${round}.`)
  player1.playRound(player2, deck, discards);
if (player1.checkIf5DifferentIngredients()) {
  //console.log(player1.hand)
  console.log(`${player1.name} wins! The game is over.`);
  break;
}
player2.playRound(player1, deck, discards);
if (player2.checkIf5DifferentIngredients()) {
  console.log(`${player2.name} wins! The game is over.`);
  break;
}
round++;
if (round == maxRounds) {
  console.log("Looks like none of our players can prevail. We shall declare this a tie.");
  break;
}
}