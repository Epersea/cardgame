const { MonsterCard, IngredientCard, DeckOfCards, Player} = require('./classes.js'); 

function checkIf5DifferentIngredients(hand) {
    const differentIngredients = []
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].ingredient) {
            if (!differentIngredients.includes(hand[i].ingredient)) {
                differentIngredients.push(hand[i].ingredient)
              }
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

let mainDeck = new DeckOfCards(0, 20).shuffle();

// Assign cards to each player
player1.hand = mainDeck.splice(0, 7);
// If they already satisfy winning condition, return to deck, shuffle and assign again 
while (checkIf5DifferentIngredients(player1.hand)) {
    mainDeck.push(player1.hand);
    mainDeck = mainDeck.flat().sort(function () {
      return Math.random() - 0.5;
    });
    player1.hand = mainDeck.splice(0, 7);
}

player2.hand = mainDeck.splice(0, 7);
while (checkIf5DifferentIngredients(player2.hand)) {
  mainDeck.push(player2.hand);
  mainDeck = mainDeck.flat().sort(function () {
    return Math.random() - 0.5;
  });
  player2.hand = mainDeck.splice(0, 7);
}

// Create deck for discards
discardsDeck = [];
