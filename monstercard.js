class MonsterCard {
    constructor(attack, defense) {
      this.attack = attack;
      this.defense = defense;
    }
  
    static createRandom(number) {
      const monsterCards = [];
      for (let i = 1; i <= number; i++) {
        const randomAttack = Math.floor(Math.random() * 6);
        const randomDefense = Math.floor(Math.random() * 6);
        const currentMonster = new MonsterCard(randomAttack, randomDefense);
        monsterCards.push(currentMonster)
      }
      return monsterCards;
    }
  };

module.exports = { MonsterCard }