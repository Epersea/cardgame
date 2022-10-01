class IngredientCard {
    constructor(ingredient) {
      this.ingredient = ingredient;
    }
    static createRandom(number) {
      const ingredientCards = []
      const ingredientOptions = ["cat whisker", "unicorn horn", "chicken lip", "dragon's breath", "dandruff", "rue", "antimony"];
      for (let i = 1; i <= number; i++) {
        const randomIngredientIndex = Math.floor(Math.random() * 7);
        const currentIngredient =  new IngredientCard(ingredientOptions[randomIngredientIndex]);
        ingredientCards.push(currentIngredient);
      }
      return ingredientCards;
    }
  }

  module.exports = { IngredientCard }