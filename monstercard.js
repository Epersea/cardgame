class MonsterCard {
    constructor(attack, defense) {
      this.attack = attack;
      this.defense = defense;
    }
  
    static createRandomMonsterCards(number) {
      let monsterCards = [];
      for (let i = 1; i <= number; i++) {
        let randomAttack = Math.floor(Math.random() * 6);
        let randomDefense = Math.floor(Math.random() * 6);
        let currentMonster = new MonsterCard(randomAttack, randomDefense);
        monsterCards.push(currentMonster)
      }
      return monsterCards;
    }
  };

module.exports = { MonsterCard }