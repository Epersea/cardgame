# Card game

This is a practical exercise to start using classes and objects in my projects. It involves creating a simulation of a very simple card game. When executing it, two virtual players play against each other and their actions are logged in the console.

The project contains two Javascript files:

`classes.js` Main classes and instances are described below.

`cardgame.js` This file contains the logic for playing a virtual game between two players. When executing this file in Node.js, a series of statements describing the game's actions are logged to the console.

This project is inspired by the katayuno meetings at [Devscola](https://devscola.org/), a programming community based in Valencia. The original kata (in Spanish) can be found [here](http://katayuno-app.herokuapp.com/katas/17). 

As per Devscola's best practices, I have tried to avoid comments and instead named my functions and variables as clearly as possible.

## Rules of the game
In this game, our goal is to get 5 different ingredients to make the Ultimate Superpotion (and presumably, control the Universe). There are two different kinds of cards:
1. Monster cards: each monster card has an attack value and a defense value, which can be used in battles. Both values range from 0 to 5.
2. Ingredient cards: each ingredient card represents a different ingredient. There are 7 possible ingredients in total, but we only need 5 to make the Ultimate Superpotion.

At the start of the game, each player is given 7 cards. In each turn, they can:
- Pick a card from the deck (if they have less than 7 cards in this hand, they have to do this until reaching 7).
- Discard a card from their hand and pick a new one from the deck.
- Start a battle between one of their monsters and a one of their rival's. If the attacker's attack value is higher than the defender's defense, the attacker wins. In this case, they can pick a card from the opponent's hand. If the defending player doesn't have any monsters in their hand, the defense is supposed to be 0. The attacking monster card is discarded after the battle.

The first player to get 5 different ingredients wins. If they play 10 rounds without a winner, the game is considered a tie.

## Classes and objects
The main goal of this project was to start programming with classes and objects. In order to simulate the card game, I have created the following classes and instances:
- Class MonsterCard, including a method for creating a certain number of monster cards with random values.
- Class IngredientCard, with a similar method.
- Class Deck: to create a Deck object, we need to specify the number of each type of card, which are created and added to our new object. The `shuffle()` method combines both types of cards in a single array, sorted at random.
- Class Hand: each instance of this object includes a certain number of cards. When instanciating it, the cards are already shuffled. It has a series of methods that allow us to execute different features of the gameplay: redistribute cards (to ensure the initial hand doesn't satisfy the winning condition), get total number of ingredient cards, get an array of different ingredients, check if any ingredient is repeated, get the monsters with the highest and lowest attack score and get the highest defense score.
- Class Player: this is a child class from Hand. Each player has a name and a hand of cards that inherit Hand's methods. It also has a number of methods of its own, that come together to allow us to play a full round: pick a card from the deck, swap a weak monster, swap a repeated ingredient, attack with a monster and steal an opponent's card.

## Player behaviour
Alas, our players aren't very intelligent yet and can't learn on their own. In each round, they follow the same logic:
- If they have less than 7 cards in their deck, they pick cards from the deck until they reach 7.
- If they have 3 ingredients or less, they discard their weakest monster and get a card from the deck.
- If they have repeated ingredients, they discard one of the repeats and get a card from the deck.
- If none of the conditions above are true, they pick their strongest monster and go to battle.

## Challenges and future improvements
This is just a first draft of what a card game program could be –the next obvious step is adding an user interface that lets users play with a virtual opponent.

Another obvious area of development is the rules of the game itself, for instance, adding new card types and properties.

Finally, this could benefit from some probability analysis to ensure is as playable as possible. As it stands now, it seems to produce a mix of short games, longer games and ties.