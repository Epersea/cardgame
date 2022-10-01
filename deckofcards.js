const { MonsterCard } = require('./monstercard.js')
const { IngredientCard } = require('./ingredientcard.js')

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

  module.exports = { DeckOfCards }