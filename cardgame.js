const { MonsterCard, IngredientCard, DeckOfCards, Player} = require('./classes.js'); 

// Let's simulate a game!

// Create two players

let player1 = new Player("player1");
let player2 = new Player("player2");

// Create a new deck of cards and shuffle it.

let mainDeck = new DeckOfCards(20, 40).shuffle();

console.log("Cards are shuffled...")

// Create deck for discards
discardsPile = [];

// Assign cards to each player
player1.hand = mainDeck.splice(0, 7);

// If they already satisfy winning condition, return to deck, shuffle and assign again 
while (player1.checkIf5DifferentIngredients()) {
    mainDeck.push(player1.hand);
    mainDeck = mainDeck.flat().sort(function () {
      return Math.random() - 0.5;
    });
    player1.hand = mainDeck.splice(0, 7);
}

player2.hand = mainDeck.splice(0, 7);

while (player2.checkIf5DifferentIngredients()) {
  mainDeck.push(player2.hand);
  mainDeck = mainDeck.flat().sort(function () {
    return Math.random() - 0.5;
  });
  player2.hand = mainDeck.splice(0, 7);
}

console.log("Each player has 7 cards. We are ready to start playing!")

// Let's check if there are cards in deck. If not, shuffle discards and reassign.

if (mainDeck.length == 0) {
  discardsPile.sort(function () {
    return Math.random() - 0.5;
  })
  mainDeck = discards;
  discardsPile = [];
  console.log("There are no cards remaining in the deck, so we have shuffled the discard pile.")
}

// Playing rounds
let round = 1;
let maxRounds = 10;
while(true) {
  console.log(`ROUND #${round}.`)
  player1.playRound(player2, mainDeck, discardsPile);
if (player1.checkIf5DifferentIngredients()) {
  //console.log(player1.hand)
  console.log(`${player1.name} wins! The game is over.`);
  break;
}
player2.playRound(player1, mainDeck, discardsPile);
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
