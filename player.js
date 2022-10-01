const { Hand } = require('./hand.js')

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

  swapWeakMonster(discards, deck) {
    const weakIndex = this.findMonsterWithWeakestAttack();
    discards.push(this.cards.splice(weakIndex, 1));
    this.cards.push(deck.splice(0, 1));
    this.cards = this.cards.flat();
    console.log(`${this.name} has discarded a weak monster and taken a card from the deck.`)
  }

  swapRepeatedIngredient(discards, deck) {
    const repeatedIndex = this.checkIfRepeatedIngredients();
    discards.push(this.cards.splice(repeatedIndex, 1));
    this.cards.push(deck.splice(0, 1));
    this.cards = this.cards.flat();
    console.log(`${this.name} has discarded a repeated ingredient and taken a card from the deck.`)
  }

  attackWithMonster(rival, discards) {
    console.log("Time for a monster attack!")
    const opponentAttack = this.getMonsterWithHighestAttack().score;
    const defenderDefense = rival.getHighestMonsterDefense();
    const attackerIndex = this.getMonsterWithHighestAttack().index;
    discards.push(this.cards.splice(attackerIndex, 1));
      
    if (opponentAttack > defenderDefense) {
      this.stealCard(rival)
      console.log(`${this.name}'s monster wins! They have an attack of ${opponentAttack}, while the enemy's defense is only ${defenderDefense}. They have stolen a card from their rival's deck.`)
    } else {
      console.log(`${this.name}'s monster loses! Their attack of ${opponentAttack} couldn't beat the enemy's defense of ${defenderDefense}. Their rival's cards are safe for now.`)
    }
  }

  stealCard(rival) {
    const stolenCardIndex = Math.floor(Math.random() * rival.cards.length);
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

    else if (this.getTotalIngredients() < 4) {
      this.swapWeakMonster(discards, deck);
    }
  
    else if (this.checkIfRepeatedIngredients()) {
      this.swapRepeatedIngredient(discards, deck);
    }
  
    else {
      this.attackWithMonster(rival, discards);
    }
  }
}

module.exports = { Player }; 