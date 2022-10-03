class Player {
  constructor(name, hand) {
    this.hand = hand;
    this.name = name;
  }

  pickCard(deck) {
    this.hand.cards.push(deck.shift());
    console.log(`${this.name} has taken a card from the deck.`)
  }

  swapWeakMonster(discards, deck) {
    const weakIndex = this.hand.findWeakestMonster();
    this.swapCard(discards, weakIndex, deck, 'weak monster');
  }

  swapRepeatedIngredient(discards, deck) {
    const repeatedIndex = this.hand.getIndexOf1stRepeatedIngredient();
    this.swapCard(discards, repeatedIndex, deck, 'repeated ingredient');
  }

  swapCard(discards, index, deck, cardType) {
    discards.push(this.hand.cards.splice(index, 1));
    this.hand.cards.push(deck.shift());
    console.log(`${this.name} has discarded a ${cardType} and taken a card from the deck.`)
  }

  attackWithMonster(rival, discards) {
    console.log("Time for a monster attack!")
    const strongestMonster = this.hand.findMonsterWithHighestAttack()
    const opponentAttack = strongestMonster.score;
    const defenderDefense = rival.hand.getHighestMonsterDefense();
    const attackerIndex = strongestMonster.index;
    discards.push(this.hand.cards.splice(attackerIndex, 1));

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
    const stolenCardIndex = Math.floor(Math.random() * rival.hand.cards.length);
    this.hand.cards.push(rival.hand.cards.splice(stolenCardIndex, 1));
    this.hand.cards = this.hand.cards.flat();
  }

  playRound(rival, deck, discards) {
    console.log(`This is ${this.name}'s hand:`)
    console.log(this.hand.cards);

    if (this.hand.cards.length < 7) {
      while (this.hand.cards.length < 7) {
        this.pickCard(deck);
      }
    }

    else if (this.hand.getTotalIngredients() < 4) {
      this.swapWeakMonster(discards, deck);
    }
  
    else if (this.hand.getIndexOf1stRepeatedIngredient()) {
      this.swapRepeatedIngredient(discards, deck);
    }
  
    else {
      this.attackWithMonster(rival, discards);
    }
  }
}

module.exports = { Player }; 