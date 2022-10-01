class IngredientCard {
    constructor(ingredient) {
      this.ingredient = ingredient;
    }
    static createRandomIngredientCards(number) {
      let ingredientCards = []
      let ingredientOptions = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
      for (let i = 1; i <= number; i++) {
        let randomIngredientIndex = Math.floor(Math.random() * 7);
        let currentIngredient =  new IngredientCard(ingredientOptions[randomIngredientIndex]);
        ingredientCards.push(currentIngredient);
      }
      return ingredientCards;
    }
  }

  module.exports = { IngredientCard }