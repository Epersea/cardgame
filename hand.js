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
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].ingredient) {
          ingredientCount++;
        }
      }
      return ingredientCount;
    }
  
    getDifferentIngredients() {
      const differentIngredients = []
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
    const previousIngredients = [];
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
  
    getMonsterWithHighestAttack() {
      const highestAttackMonster = {
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
  
    findMonsterWithWeakestAttack() {
      let weakestIndex;
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].attack) {
            if (!weakestIndex || this.cards[i].attack < this.cards[weakestIndex].attack) {
              weakestIndex = i;
            }
          }
        }
        return weakestIndex;
      }
  
    getHighestMonsterDefense() {
      let defenseScore = 0;
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].defense > defenseScore) {
          defenseScore = this.cards[i].defense;
        }
      }
      return defenseScore;
    }
  }

module.exports = { Hand }