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
      const weakMonsterIndexes = this.findMonstersWithLowestAttack();
      return this.findMonsterWithLowestDefense(weakMonsterIndexes);
    }

    findMonstersWithLowestAttack() {
      const monsterCards = this.cards.filter(card => card instanceof MonsterCard);
      const monsterAttacks = monsterCards.map(card => card.attack);
      const minAttack = Math.min(...monsterAttacks)
      let lowestAttackMonsterIndexes = [];
      for (let card of monsterCards) {
        if (card.attack === minAttack) {
          lowestAttackMonsterIndexes.push(this.cards.indexOf(card))
        }
      }
      return lowestAttackMonsterIndexes;
    }

    findMonsterWithLowestDefense(weakMonsterIndexes) {
      if (weakMonsterIndexes.length === 1) {
        return weakMonsterIndexes[0];
      } 

      let weakestMonsterIndex;
      for (let index of weakMonsterIndexes) {
        if (this.hasLowestDefense(index, weakestMonsterIndex)) {
          weakestMonsterIndex = index;
        }
      }
      return weakestMonsterIndex;
    }

    hasLowestDefense(index, weakestMonsterIndex) {
      return !weakestMonsterIndex || this.cards[index].defense < this.cards[weakestMonsterIndex].defense;
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