const { MonsterCard, IngredientCard, DeckOfCards, Player} = require('./classes.js'); 

function checkIf5DifferentIngredients(hand) {
    const differentIngredients = []
    for (let i = 0; i < hand.length; i++) {
      if (!differentIngredients.includes(hand[i])) {
        differentIngredients.push(hand[i])
      }
    }
    if (differentIngredients.length >= 5) {
      return true
    } else {
      return false
    }
  }

// Let's simulate a game!

// Create two players

let player1 = new Player("player1");
let player2 = new Player("player2");

// Create a new deck of cards and shuffle it.

const mainDeck = new DeckOfCards(20, 20).shuffle();

// Assign cards to each player
player1.hand = mainDeck.splice(0, 7);
// Check if they already satisfy winning condition
/*while (checkIf5DifferentIngredients(player1.hand)) {
    mainDeck.shuffle();
    player1.hand = mainDeck.splice(0, 7);
}*/

player2.hand = mainDeck.splice(0, 7);
/*while (checkIf5DifferentIngredients(player2.hand)) {
    mainDeck.shuffle();
    player2.hand = mainDeck.splice(0, 7);
}*/

// Create deck for discards
discardsDeck = [];
