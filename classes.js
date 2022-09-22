class MonsterCard {
  constructor(attack, defense) {
    this.attack = attack;
    this.defense = defense;
  }

  static createRandomMonsterCards(number) {
    let monsterCards = [];
    for (let i = 1; i <= number; i++) {
      let randomAttack = Math.floor(Math.random() * 6);
      let randomDefense = Math.floor(Math.random() * 6);
      let currentMonster = new MonsterCard(randomAttack, randomDefense);
      monsterCards.push(currentMonster)
    }
    return monsterCards;
  }
};

class IngredientCard {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }
  static createRandomIngredientCards(number) {
    let ingredientCards = []
    let ingredientOptions = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
    for (let i = 1; i <= number; i++) {
      let randomIngredientIndex = Math.floor(Math.random() * 7);
      let currentIngredient =  new IngredientCard(ingredientOptions[randomIngredientIndex]);
      ingredientCards.push(currentIngredient);
    }
    return ingredientCards;
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

  redistribute(deck) {
    deck.push(this.cards);
    deck = deck.flat().sort(function () {
    return Math.random() - 0.5;
    });
    this.cards = deck.splice(0, 7);
  }

  getTotalIngredients() {
    let ingredientCount = 0;
    for (card of this.cards) {
      if (card.ingredient) {
        ingredientCount++;
      }
    }
    return ingredientCount;
  }

  getDifferentIngredients() {
    let differentIngredients = []
    for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].ingredient) {
            if (!differentIngredients.includes(this.cards[i].ingredient)) {
                differentIngredients.push(this.cards[i].ingredient)
              }
        }
    }
    return differentIngredients;
  }

  checkIfRepeatedIngredients() {
  let previousIngredients = [];
  for (let i = 0; i < this.cards.length; i++) {
    if (this.cards[i].ingredient) {            
        if (previousIngredients.includes(this.cards[i].ingredient)) {
          return i;
      } else {
        previousIngredients.push(this.cards[i].ingredient);
          }
        }
      } 
  return false;
  }

  findMonsterWithHighestAttack() {
      let highestAttackMonster = {
        score: 0,
        index: 0
      }
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].attack > highestAttackMonster.score) {
          highestAttackMonster.score = this.cards[i].attack;
          highestAttackMonster.index = i;
        }
      }
      return highestAttackMonster;
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

  pickCard(deck) {
    this.cards.push(deck.splice(0, 1));
        this.cards = this.cards.flat();
        console.log(`${this.name} has taken a card from the deck.`)
  }

  swapRepeatedIngredient(discards, deck) {
    let repeatedIndex = this.checkIfRepeatedIngredients();
    discards.push(this.cards.splice(repeatedIndex, 1));
    this.cards.push(deck.splice(0, 1));
    this.cards = this.cards.flat();
    console.log(`${this.name} has discarded a repeated ingredient and taken a card from the deck.`)
  }

  attackWithMonster(rival, discards) {
    console.log("Time for a monster attack!")
      let opponentAttack = this.findMonsterWithHighestAttack().score;
      let defenderDefense = rival.findHighestDefenseInMonster();
      
      let attackerIndex = this.findMonsterWithHighestAttack().index;
      discards.push(this.cards.splice(attackerIndex, 1));
      
      if (opponentAttack > defenderDefense) {
        this.stealCard(rival)
        console.log(`${this.name}'s monster wins! They have an attack of ${opponentAttack}, while the enemy's defense is only ${defenderDefense}. They have stolen a card from their rival's deck.`)
      } else {
        console.log(`${this.name}'s monster loses! Their attack of ${opponentAttack} couldn't beat the enemy's defense of ${defenderDefense}. Their rival's cards are safe for now.`)
      }
  }

  stealCard(rival) {
    let stolenCardIndex = Math.floor(Math.random() * rival.cards.length);
    this.cards.push(rival.cards.splice(stolenCardIndex, 1));
    this.cards = this.cards.flat();
  }

  playRound(rival, deck, discards) {
    console.log(`This is ${this.name}'s hand:`)
    console.log(this.cards);

    if (this.cards.length < 7) {
      while (this.cards. length < 7) {
        this.pickCard(deck);
      }
    }
  
    else if (this.checkIfRepeatedIngredients()) {
      this.swapRepeatedIngredient(discards, deck);
    }
  
    else {
      this.attackWithMonster(rival, discards);
    }
  }
}

module.exports = { MonsterCard, IngredientCard, DeckOfCards, Hand, Player }; 