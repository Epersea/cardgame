const { Hand } = require('./hand.js')

class Player extends Hand {
  constructor(name, cards) {
    super(cards);
    this.name = name;
  }

  pickCard(deck) {
    this.cards.push(deck.shift());
    console.log(`${this.name} has taken a card from the deck.`)
  }

  swapWeakMonster(discards, deck) {
    const weakIndex = this.findMonsterWithWeakestAttack();
    this.swapCard(discards, weakIndex, deck, 'weak monster');
  }

  swapRepeatedIngredient(discards, deck) {
    const repeatedIndex = this.findRepeatedIngredients();
    this.swapCard(discards, repeatedIndex, deck, 'repeated ingredient');
  }

  swapCard(discards, index, deck, cardType) {
    discards.push(this.cards.splice(index, 1));
    this.cards.push(deck.shift());
    console.log(`${this.name} has discarded a ${cardType} and taken a card from the deck.`)
  }

  attackWithMonster(rival, discards) {
    console.log("Time for a monster attack!")
    const strongestMonster = this.findMonsterWithHighestAttack()
    const opponentAttack = strongestMonster.score;
    const defenderDefense = rival.getHighestMonsterDefense();
    const attackerIndex = strongestMonster.index;
    discards.push(this.cards.splice(attackerIndex, 1));

    const winMessage =  `${this.name}'s monster wins! They have an attack of ${opponentAttack}, while the enemy's defense is only ${defenderDefense}. They have stolen a card from their rival's deck.`;
    const loseMessage = `${this.name}'s monster loses! Their attack of ${opponentAttack} couldn't beat the enemy's defense of ${defenderDefense}. Their rival's cards are safe for now.`
      
    if (opponentAttack > defenderDefense) {
      this.stealCard(rival)
      console.log(winMessage)
    } else {
      console.log(loseMessage)
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
  
    else if (this.findRepeatedIngredients()) {
      this.swapRepeatedIngredient(discards, deck);
    }
  
    else {
      this.attackWithMonster(rival, discards);
    }
  }
}

module.exports = { Player }; 