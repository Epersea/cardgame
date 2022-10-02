const { IngredientCard } = require("./ingredientcard");
const { MonsterCard } = require("./monstercard");

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
      for (let card of this.cards) {
        if (card instanceof IngredientCard) {
          ingredientCount++;
        }
      }
      return ingredientCount;
    }
  
    getDifferentIngredients() {
      const differentIngredients = []
      for (let card of this.cards) {
        if (this.isDifferentIngredient(card, differentIngredients)) {
            differentIngredients.push(card.ingredient)
        }
      }
      return differentIngredients;
    }

    isDifferentIngredient(card, differentIngredients) {
        return card instanceof IngredientCard && 
        !differentIngredients.includes(card.ingredient);
    }
  
    findRepeatedIngredients() {
        const previousIngredients = [];
        for (let card of this.cards) {
            if (this.isRepeated(card, previousIngredients)) {            
                return this.cards.indexOf(card);
            } else {
                previousIngredients.push(card.ingredient);
            }
        }
        return false;
    }

    isRepeated(card, previousIngredients) {
        return card instanceof IngredientCard && 
        previousIngredients.includes(card.ingredient)
    }
  
    findMonsterWithHighestAttack() {
      const highestAttackMonster = {
        score: 0,
        index: 0
      }
      for (let card of this.cards) {
        if (card.attack > highestAttackMonster.score) {
          highestAttackMonster.score = card.attack;
          highestAttackMonster.index = this.cards.indexOf(card);
        }
      }
      return highestAttackMonster;
    }
  
    findMonsterWithWeakestAttack() {
        let weakestIndex;
        for (let card of this.cards) {
          if (card instanceof MonsterCard) {
            if (this.isWeakest(card, weakestIndex)) {
              weakestIndex = this.cards.indexOf(card);
            }
          }
        }
        return weakestIndex;
    }

    isWeakest (card, weakestIndex) {
        !weakestIndex || card.attack < this.cards[weakestIndex].attack;
    }
  
    getHighestMonsterDefense() {
      let monsterDefenses = [0];
      for (let card of this.cards) {
        if (card.defense) {
            monsterDefenses.push(card.defense);
        }
      }
      return Math.max(...monsterDefenses);
    }
  }

module.exports = { Hand }