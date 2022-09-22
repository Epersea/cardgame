# Card game

This is a practical exercise to start using classes and objects in my projects. It involves creating a simulation of a very simple card game. When executing it, two virtual players play against each other and their actions are logged in the console.
This project is inspired by the katayuno meetings at [Devscola](https://devscola.org/), a programming community based in Valencia. The original kata (in Spanish) can be found [here](http://katayuno-app.herokuapp.com/katas/17). 
As per Devscola's best practices, I have tried to avoid comments and instead named my functions and variables as clearly as possible.

## Classes and objects

## Rules of the game
In this game, our goal is to get 5 different ingredients to make the Ultimate Superpotion (and presumably, control the Universe). There are two different kinds of cards:
1. Monster cards: each monster card has an attack value and a defense value, which can be used in battles. Both values range from 0 to 5.
2. Ingredient cards: each ingredient card represents a different ingredient. There are 7 possible ingredients in total, but we only need 5 to make the Ultimate Superpotion.
At the start of the game, each player is given 7 cards. In each turn, they can:
- Pick a card from the deck (if they have less than 7 cards in this hand, they have to do this until reaching 7).
- Discard a card from their hand and pick a new one from the deck.
- Start a battle between one of their monsters and a one of their rival's. If the attacker's attack value is higher than the defender's defense, the attacker wins. In this case, they can pick a card from the opponent's hand. If the defending player doesn't have any monsters in their hand, the defense is supposed to be 0. The attacking monster card is discarded after the battle.
- The first player to get 5 different ingredients wins. If they play 10 rounds without a winner, the game is considered a tie.

## Player behaviour

## Project files

## Challenges and future improvements