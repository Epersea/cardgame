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
        if (card instanceof IngredientCard && !differentIngredients.includes(card.ingredient)) {
            differentIngredients.push(card.ingredient)
        }
      }
      return differentIngredients;
    }
  
    checkIfRepeatedIngredients() {
    const previousIngredients = [];
    for (let card of this.cards) {
      if (card instanceof IngredientCard && previousIngredients.includes(card.ingredient)) {            
            return this.cards.indexOf(card);
        } else {
            previousIngredients.push(card.ingredient);
          }
        }
    return false;
    }
  
    getMonsterWithHighestAttack() {
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
            if (!weakestIndex || card.attack < this.cards[weakestIndex].attack) {
              weakestIndex = this.cards.indexOf(card);
            }
          }
        }
        return weakestIndex;
      }
  
    getHighestMonsterDefense() {
      let defenseScore = 0;
      for (let card of this.cards) {
        if (card.defense > defenseScore) {
          defenseScore = card.defense;
        }
      }
      return defenseScore;
    }
  }

module.exports = { Hand }