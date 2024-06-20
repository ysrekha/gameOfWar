/*

REQUIREMENTS:-
**************
1.) In this version there are only 2 players.
2.) Do not need to accept any user input.
3.) Deal 26 Cards to each Player from a Deck of 52 cards.
4.) Iterate through the turns where each Player plays a Card.
5.) The Player who played the higher card is awarded a point.
6.) Ties result in zero points for both Players.
7.) After all cards have been played, display the score and declare the winner.
*/


/*
    The Card class represents a single playing card with a value and suit. 
*/
export class Card {
    constructor(value, suit) {
        this.value = value; // Initialize card value
        this.suit = suit;   // Initialize card suit
    }
}

/*
    The Deck class handles the creation, shuffling, and dealing of cards:
*/
export class Deck {
    constructor() {
        this.cards = []; // Initialize an empty array for cards
        this.initializeDeck(); // Initialize the deck with all 52 cards
    }

    // Initializes with a full deck of 52 cards (13 values x 4 suits).
    initializeDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']; // Array of suits
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']; // Array of values

        // Generate all 52 cards by iterating through suits and values
        for (const suit of suits) {
            for (const value of values) {
                this.cards.push(new Card(value, suit)); // Create a new Card object and add to the deck
            }
        }
    }
   
    // Method to shuffle the deck using Fisher-Yates algorithm.
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            // Swap cards at index i and j
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    // Method to deal a specified number of cards from the deck.
    deal(numCards) {
        const hand = []; // Initialize an empty array for the dealt cards
        for (let i = 0; i < numCards; i++) {
            hand.push(this.cards.pop()); // Remove the last card from the deck and add to the hand
        }
        return hand; // Return the hand of cards
    }
}

/*
    The Player class manages each player with a name, hand and score. 
    Methods include playCard() to play a card from the hand, incrementScore() to increase the player's score, addToHand(cards) 
    to add cards to the player's hand, and showHand() to display the player's current hand.
*/
export class Player {
    constructor(name) {
        this.name = name; // Initialize player name
        this.hand = [];   // Initialize an empty array for the player's hand
        this.score = 0;   // Initialize player score
    }

    // Method to pop and return one card from the player's hand.
    playCard() {
        let playerCard = this.hand.pop();// Remove the last card from the player's hand
        return playerCard; // Return the last card from the player's hand
    }

    // Method to increment the player's score.
    incrementScore() {
        this.score++; // Increment player's score by 1
    }

    // Method to add cards to the player's hand.
    addToHand(cards) {
        this.hand.push(...cards); // Add multiple cards to the player's hand
    }
}

/*
    Initializes a deck and shuffles it.
    Creates players and deals cards to them.
    Includes methods to compare cards (compareCards(card1, card2)) and play rounds (playRound()).
    The playGame() method runs through a fixed number of rounds (26 in this case) and determines the winner based on scores.
*/
export class Game {
    constructor() {
        this.deck = new Deck(); // Create a new Deck object
        this.deck.shuffle();    // Shuffle the deck

        this.players = [new Player('Player 1'), new Player('Player 2')]; // Create two players

        // Deal cards to each player
        const numPlayers = this.players.length;  // current value is 2 since there are only 2 players.
        const numCards = 26; // Number of cards to deal to each player
        for (let i = 0; i < numPlayers; i++) {
            this.players[i].addToHand(this.deck.deal(numCards)); // Deal cards to each player
        }
    }

    // Method to compare two cards based on their values.
    compareCards(card1, card2) {
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']; // Card values in order
        const value1 = values.indexOf(card1.value); // Index of card1's value in the values array
        const value2 = values.indexOf(card2.value); // Index of card2's value in the values array

        // Compare the values and return 1, 2, or 0 based on the comparison
        if (value1 > value2) {
            return 1; // card1 is higher
        } else if (value1 < value2) {
            return 2; // card2 is higher
        } else {
            return 0; // values are equal
        }
    }

    // Method to play one round of the game.
    playRound() {
        
        const card1 = this.players[0].playCard(); // Player 1 plays a card 
        const card2 = this.players[1].playCard(); // Player 2 plays a card
        const result = this.compareCards(card1, card2); // Compare the cards
        if (result === 1) {
            this.players[0].incrementScore(); // Player 1 wins the round  
        } else if (result === 2) {
            this.players[1].incrementScore(); // Player 2 wins the round   
        }
    }

    // Method to play the entire game.
    playGame() {
        const numRounds = 26; // Total number of rounds to play
        for (let i = 0; i < numRounds; i++) {
            this.playRound(); // Play each round
        }
        this.displayWinner(); // Display the winner after all rounds
    }

    // Method to display the final scores and determine the winner.
    displayWinner() {
        console.log(`Player 1 score: ${this.players[0].score}`); // Display Player 1's score
        console.log(`Player 2 score: ${this.players[1].score}`); // Display Player 2's score
        if (this.players[0].score > this.players[1].score) {
            console.log("Player 1 wins!"); // Player 1 has the higher score
        } else if (this.players[0].score < this.players[1].score) {
            console.log("Player 2 wins!"); // Player 2 has the higher score
        } else {
            console.log("It's a tie!"); // Scores are equal
        }
    }
}

// Start the game
const game = new Game(); // Create a new Game object
game.playGame(); // Start playing the game
