class MonsterCard {
    constructor(attack, defense) {
        this.attack = attack;
        this.defense = defense;
    }

    static createMonsterCard() {
        let randomAttack = Math.floor(Math.random() * 6);
        let randomDefense = Math.floor(Math.random() * 6);
        return new MonsterCard(randomAttack, randomDefense);
    }
};

class IngredientCard {
    constructor(ingredient) {
        this.ingredient = ingredient;
    }
    static createIngredientCard() {
        const ingredients = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
        const randomIngredientIndex = Math.floor(Math.random() * 7);
        return new IngredientCard(ingredients[randomIngredientIndex]);
    }
}

function createMonsterCard(number) {
    monsters = [];
    for (let i = 1; i <= number; i++) {
        monsters.push(MonsterCard.createMonsterCard());
    }
    return monsters;
}

function createIngredientCard(number) {
    ingredients = [];
    for (let i = 1; i <= number; i++) {
        ingredients.push(IngredientCard.createIngredientCard());
    }
    return ingredients;
}

class DeckOfCards {
    constructor(monsterNum, ingredientNum) {
        this.monsterCards = createMonsterCard(monsterNum);
        this.ingredientCards = createIngredientCard(ingredientNum);
    }
    
    shuffle() {
        let fullDeck = [];
        fullDeck.push(this.monsterCards);
        fullDeck.push(this.ingredientCards);
        return fullDeck.flat().sort(function () {
            return Math.random() - 0.5;
          });
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
}

module.exports = { MonsterCard, IngredientCard, DeckOfCards, Player }; 