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
      const ingredientCards = this.cards.filter(card => card instanceof IngredientCard);
      const ingredients = ingredientCards.map(card => card.ingredient);
      return [...new Set(ingredients)];
    }
  
    getIndexOf1stRepeatedIngredient() {
        const previousIngredients = [];
        for (let card of this.cards) {
            if (this.isRepeated(card, previousIngredients)) {            
                return this.cards.indexOf(card);
            } else {
                previousIngredients.push(card.ingredient);
            }
        }
        return undefined;
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
  
    findWeakestMonster() {
        let lowestAttackMonsterIndexes = [];
        for (let card of this.cards) {
          if (card instanceof MonsterCard) {
            if (this.isWeakest(card, lowestAttackMonsterIndexes)) {
              lowestAttackMonsterIndexes.push(this.cards.indexOf(card));
            }
          }
        }
        if (lowestAttackMonsterIndexes.length === 1) {
          return lowestAttackMonsterIndexes[0];
        } 
        let weakestMonsterIndex;
        for (let index of lowestAttackMonsterIndexes) {
          if (!weakestMonsterIndex || this.cards[index].defense < this.cards[weakestMonsterIndex].defense) {
            weakestMonsterIndex = index;
          }
        }
        return weakestMonsterIndex;
      
    }

    isWeakest (card, lowestAttackMonsterIndexes) {
        return lowestAttackMonsterIndexes.length < 1 || card.attack < this.cards[lowestAttackMonsterIndexes[lowestAttackMonsterIndexes.length - 1]].attack;
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