class MonsterCard {
    constructor(attack, defense) {
        this.attack = attack;
        this.defense = defense;
    }

    static createMonsterCard() {
        let randomAttack = Math.floor(Math.random() * 6);
        let randomDefense = Math.floor(Math.random() * 6);
        return new MonsterCard(randomAttack, randomDefense);
    }
};

class IngredientCard {
    constructor(ingredient) {
        this.ingredient = ingredient;
    }
    static createIngredientCard() {
        const ingredients = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
        const randomIngredientIndex = Math.floor(Math.random() * 7);
        return new IngredientCard(ingredients[randomIngredientIndex]);
    }
}

function createMonsterCard(number) {
    monsters = [];
    for (let i = 1; i <= number; i++) {
        monsters.push(MonsterCard.createMonsterCard());
    }
    return monsters;
}

function createIngredientCard(number) {
    ingredients = [];
    for (let i = 1; i <= number; i++) {
        ingredients.push(IngredientCard.createIngredientCard());
    }
    return ingredients;
}

class DeckOfCards {
    constructor(monsterNum, ingredientNum) {
        this.monsterCards = createMonsterCard(monsterNum);
        this.ingredientCards = createIngredientCard(ingredientNum);
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

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    checkIf5DifferentIngredients() {
        const differentIngredients = []
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].ingredient) {
                if (!differentIngredients.includes(this.hand[i].ingredient)) {
                    differentIngredients.push(this.hand[i].ingredient)
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
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].ingredient) {            
          if (differentIngredients.includes(this.hand[i].ingredient)) {
            return i;
            break;
        } else {
            differentIngredients.push(this.hand[i].ingredient);
            }
          }
        } 
    return false;
    }

    findHighestAttackInMonster() {
        let attackScore = 0;
        for (let i = 0; i < this.hand.length; i++) {
          if (this.hand[i].attack > attackScore) {
            attackScore = this.hand[i].attack;
          }
        }
        return attackScore;
      }
    
      findHighestDefenseInMonster() {
        let defenseScore = 0;
        for (let i = 0; i < this.hand.length; i++) {
          if (this.hand[i].defense > defenseScore) {
            defenseScore = this.hand[i].defense;
          }
        }
        return defenseScore;
      }

      playRound(rival, deck, discards) {
        // Status check
        console.log(`This is ${this.name} hand:`)
        console.log(this.hand);
      
        // If player has more than 7 cards, discard one
        if (this.hand.length > 7) {
          // Repeated ingredient
          if (this.checkIfRepeatedIngredients()) {
            let repeatedIndex = this.checkIfRepeatedIngredients();
            discards.push(this.hand.splice(repeatedIndex, 1));
            console.log(`${this.name} has discarded a repeated ingredient.`)
          } 
          else {
            // Lowest attack monster
            let monsterIndex;
            for (let i = 0; i < this.hand.length; i++) {
              if (this.hand[i].attack) {
                if (!monsterIndex || this.hand[i].attack < this.hand[monsterIndex].attack) {
                  monsterIndex = i;
                }
              }
            }
            discards.push(this.hand.splice(monsterIndex, 1));
            console.log(`${this.name} has discarded a weak monster.`)
          }
        }
      
        // If player has less than 7 cards, pick one from main deck.
        if (this.hand.length < 7) {
          this.hand.push(deck.splice(0, 1));
          this.hand = this.hand.flat();
          console.log(`${this.name} has taken a card from the deck.`)
        }
      
        // If player has 2 repeated ingredients, discard one and pick one.
        else if (this.checkIfRepeatedIngredients()) {
          let repeatedIndex = this.checkIfRepeatedIngredients();
          discards.push(this.hand.splice(repeatedIndex, 1));
          this.hand.push(deck.splice(0, 1));
          this.hand = this.hand.flat();
          console.log(`${this.name} has discarded a repeated ingredient and taken a card from the deck.`)
        }
      
        // Else, attack with monster
        else {
          console.log("Time for a monster attack!")
          // Find monster with highest attack from player hand
          let opponentAttack = this.findHighestAttackInMonster();
          // Find monster with highest defense from opponent hand (if no monster, 0)
          let defenderDefense = rival.findHighestDefenseInMonster();
          // Compare both
          // If attacker wins, steal card from opponent. Else, do nothing.
          if (opponentAttack > defenderDefense) {
            let stolenCard = Math.floor(Math.random() * rival.hand.length);
            this.hand.push(rival.hand.splice(stolenCard, 1));
            this.hand = this.hand.flat();
            console.log(`${this.name} wins! They have stolen a card from their rival's deck.`)
          } else {
            console.log(`${this.name} loses. Their rival's cards are safe for now.`)
          }
        }
      }
}

module.exports = { MonsterCard, IngredientCard, DeckOfCards, Player }; 