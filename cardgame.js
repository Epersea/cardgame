const { MonsterCard, IngredientCard, DeckOfCards, Player} = require('./classes.js'); 

// Check if 5 different ingredients in hand (winning condition)
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

// Check if repeated ingredients in hand
function checkIfRepeatedIngredients(hand) {
  const differentIngredients = [];
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].ingredient) {
      if (differentIngredients.includes(hand[i].ingredient)) {
        return i;
        break;
      } else {
        differentIngredients.push(hand[i].ingredient);
      }
    }
  } 
  return false;
}

// Find highest score in monster
function findHighestAttackInMonster(hand) {
  let attackScore = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].attack > attackScore) {
      attackScore = hand[i].attack;
    }
  }
  return attackScore;
}

function findHighestDefenseInMonster(hand) {
  let defenseScore = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].defense > defenseScore) {
      defenseScore = hand[i].defense;
    }
  }
  return defenseScore;
}

// Let's simulate a game!

// Create two players

let player1 = new Player("player1");
let player2 = new Player("player2");

// Create a new deck of cards and shuffle it.

let mainDeck = new DeckOfCards(20, 20).shuffle();

console.log("Cards are shuffled...")

// Create deck for discards
discardsPile = [];

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

console.log("Each player has 7 cards. We are ready to start playing!")

// FIRST ROUND, PLAYER ONE

// Let's check if there are cards in deck. If not, shuffle discards and reassign.

if (mainDeck.length == 0) {
  discardsPile.sort(function () {
    return Math.random() - 0.5;
  })
  mainDeck = discards;
  discardsPile = [];
  console.log("There are no cards remaining in the deck, so we have shuffled the discard pile.")
}
console.log(`This is ${player1.name} hand:`)
console.log(player1.hand);

function playRound(player, rival, deck, discards) {
  // If player has less than 7 cards, pick one from main deck.
  if (player.hand.length < 7) {
    player.hand.push(deck.splice(0, 1));
    console.log(`${player.name} has taken a card from the deck.`)
  }

  // If player has 2 repeated ingredients, discard one and pick one.
  else if (checkIfRepeatedIngredients(player.hand)) {
    let repeatedIndex = checkIfRepeatedIngredients(player.hand);
    discards.push(player.hand.splice(repeatedIndex, 1));
    player.hand.push(deck.splice(0, 1));
    console.log(`${player.name} has discarded a repeated ingredient and taken a card from the deck.`)
  }

  // Else, attack with monster
  else {
    console.log("Time for a monster attack!")
    // Find monster with highest attack from player hand
    opponentAttack = findHighestAttackInMonster(player.hand);
    console.log(opponentAttack)
    // Find monster with highest defense from opponent hand (if no monster, 0)
    defenderDefense = findHighestDefenseInMonster(rival.hand)
    console.log(defenderDefense)
    // Compare both
    // If attacker wins, steal card from opponent. Else, do nothing.
    if (opponentAttack > defenderDefense) {
      stolenCard = Math.floor(Math.random() * rival.hand.length);
      player.hand.push(rival.hand.splice(stolenCard, 1));
      player.hand = player.hand.flat();
      console.log(`${player.name} wins! They have stolen a card from their rival's deck.`)
    } else {
      console.log(`${player.name} loses. Their rival's cards are safe for now.`)
    }
  }
}

playRound(player1, player2, mainDeck, discardsPile);