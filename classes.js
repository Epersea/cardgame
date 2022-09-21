class MonsterCard {
  constructor(attack, defense) {
    this.attack = attack;
    this.defense = defense;
  }

  static createRandomMonsterCards(number) {
    let monsters = [];
    for (let i = 1; i <= number; i++) {
      let randomAttack = Math.floor(Math.random() * 6);
      let randomDefense = Math.floor(Math.random() * 6);
      let currentMonster = new MonsterCard(randomAttack, randomDefense);
      monsters.push(currentMonster)
    }
    return monsters;
  }
};

class IngredientCard {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }
  static createRandomIngredientCards(number) {
    let ingredients = []
    let ingredientOptions = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
    for (let i = 1; i <= number; i++) {
      let randomIngredientIndex = Math.floor(Math.random() * 7);
      let currentIngredient =  new IngredientCard(ingredientOptions[randomIngredientIndex]);
      ingredients.push(currentIngredient);
    }
    return ingredients;
  }
}

class DeckOfCards {
  constructor(monsterNum, ingredientNum) {
      this.monsterCards = MonsterCard.createRandomMonsterCards(monsterNum);
      this.ingredientCards = IngredientCard.createRandomIngredientCards(ingredientNum);
  }

  shuffle() {
    let fullDeck = [];
    fullDeck.push(this.monsterCards);
    fullDeck.push(this.ingredientCards);
    return fullDeck.flat().sort(function () {
        return Math.random() - 0.5;
      });
  }
}

class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  checkIf5DifferentIngredients() {
    const differentIngredients = []
    for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].ingredient) {
            if (!differentIngredients.includes(this.cards[i].ingredient)) {
                differentIngredients.push(this.cards[i].ingredient)
              }
        }
    }
    if (differentIngredients.length >= 5) {
      return true
    } else {
      return false
    }
  }

checkIfRepeatedIngredients() {
const differentIngredients = [];
for (let i = 0; i < this.cards.length; i++) {
  if (this.cards[i].ingredient) {            
      if (differentIngredients.includes(this.cards[i].ingredient)) {
        return i;
        break;
    } else {
        differentIngredients.push(this.cards[i].ingredient);
        }
      }
    } 
return false;
}

findHighestAttackInMonster() {
    let attackScore = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].attack > attackScore) {
        attackScore = this.cards[i].attack;
      }
    }
    return attackScore;
  }

  findHighestDefenseInMonster() {
    let defenseScore = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].defense > defenseScore) {
        defenseScore = this.cards[i].defense;
      }
    }
    return defenseScore;
  }
}

class Player extends Hand {
  constructor(name, cards) {
    super(cards);
    this.name = name;
  }

  playRound(rival, deck, discards) {
    // Status check
    console.log(`This is ${this.name} hand:`)
    console.log(this.cards);
  
    // If player has more than 7 cards, discard one
    if (this.cards.length > 7) {
      // Repeated ingredient
      if (this.checkIfRepeatedIngredients()) {
        let repeatedIndex = this.checkIfRepeatedIngredients();
        discards.push(this.cards.splice(repeatedIndex, 1));
        console.log(`${this.name} has discarded a repeated ingredient.`)
      } 
      else {
        // Lowest attack monster
        let monsterIndex;
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].attack) {
            if (!monsterIndex || this.cards[i].attack < this.cards[monsterIndex].attack) {
              monsterIndex = i;
            }
          }
        }
        discards.push(this.cards.splice(monsterIndex, 1));
        console.log(`${this.name} has discarded a weak monster.`)
      }
    }
  
    // If player has less than 7 cards, pick one from main deck.
    if (this.cards.length < 7) {
      this.cards.push(deck.splice(0, 1));
      this.cards = this.cards.flat();
      console.log(`${this.name} has taken a card from the deck.`)
    }
  
    // If player has 2 repeated ingredients, discard one and pick one.
    else if (this.checkIfRepeatedIngredients()) {
      let repeatedIndex = this.checkIfRepeatedIngredients();
      discards.push(this.cards.splice(repeatedIndex, 1));
      this.cards.push(deck.splice(0, 1));
      this.cards = this.cards.flat();
      console.log(`${this.name} has discarded a repeated ingredient and taken a card from the deck.`)
    }
  
    // Else, attack with monster
    else {
      console.log("Time for a monster attack!")
      // Find monster with highest attack from player cards
      let opponentAttack = this.findHighestAttackInMonster();
      // Find monster with highest defense from opponent cards (if no monster, 0)
      let defenderDefense = rival.findHighestDefenseInMonster();
      // Compare both
      // If attacker wins, steal card from opponent. Else, do nothing.
      if (opponentAttack > defenderDefense) {
        let stolenCard = Math.floor(Math.random() * rival.cards.length);
        this.cards.push(rival.cards.splice(stolenCard, 1));
        this.cards = this.cards.flat();
        console.log(`${this.name} wins! They have stolen a card from their rival's deck.`)
      } else {
        console.log(`${this.name} loses. Their rival's cards are safe for now.`)
      }
    }
  }
}

module.exports = { MonsterCard, IngredientCard, DeckOfCards, Hand, Player }; 